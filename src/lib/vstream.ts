import {
  type VStreamRequestJson,
} from "../gen/vtgate_pb";
import { Decoder } from "./decoder";
import type { FieldJson } from "../gen/query_pb";
import type { VGtidJson, VStreamResponseJson } from "../gen/binlogdata_pb";
import EventEmitter from "events";
import { RawClient } from "..";
import { Http2SessionManager } from "@connectrpc/connect-node";

export type TransactionChange = {
  tableName: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
};

export class VStream extends EventEmitter {
  #client: RawClient.VitessClient;
  #vstream: AsyncGenerator<VStreamResponseJson> | null = null;

  #lastVGtid: VGtidJson | null = null;
  #tableFields = new Map<string, FieldJson[]>();
  #currentTransaction: TransactionChange[] = [];
  #lastHeartbeat = 0;
  #heartbeatInterval: NodeJS.Timeout | null = null;

  #sessionManager: Http2SessionManager;

  #stopping = false;
  streamCompletionPromise: Promise<void> | undefined = undefined;

  constructor(options: { baseUrl: string }) {
    super();
    this.#sessionManager = new Http2SessionManager(options.baseUrl, {
      pingIdleConnection: true,
      pingIntervalMs: 1000,
      pingTimeoutMs: 2000,
    }, {
      protocol: "http:"
    });
    this.#client = new RawClient.VitessClient({
      baseUrl: options.baseUrl,
      sessionManager: this.#sessionManager
    });
  }

  async #consumeStream() {
    if (!this.#vstream) {
      throw new Error("Stream not started");
    }

    for await (const row of this.#vstream) {
      if (this.#stopping) {
        return;
      }

      if (!row.events) {
        return;
      }

      // Event      Description
      // ==============================
      // VERSION	  Vitess version info
      // VGTID	    Current GTID checkpoint (used to resume streams)
      // FIELD	    Describes column names/types for upcoming ROW events
      // ROW	      The actual data change (insert, update, delete)
      // BEGIN	    Start of a transaction
      // COMMIT  	  End of a transaction, safe to checkpoint GTID
      // DDL	      Schema change (e.g. alter table)
      // HEARTBEAT	Keepalive signal
      // OTHER	    Anything else (e.g., SET statements in binlog — can usually ignore)
      for (const event of row.events) {
        switch (event.type) {
          case "VGTID": {
            if (!event.vgtid) {
              break;
            }

            this.#lastVGtid = event.vgtid;
            break;
          }

          case "FIELD": {
            if (!event.fieldEvent?.fields) {
              break;
            }

            if (!event.fieldEvent.tableName) {
              break;
            }

            const currentFields = event.fieldEvent.fields;
            this.#tableFields.set(event.fieldEvent.tableName, currentFields);
            break;
          }

          case "BEGIN": {
            this.#currentTransaction = [];
            break;
          }

          case "ROW": {
            if (!event.rowEvent?.rowChanges) {
              break;
            }

            if (!event.rowEvent.tableName) {
              break;
            }

            const tableName = event.rowEvent.tableName;

            for (const change of event.rowEvent.rowChanges) {
              const fields = this.#tableFields.get(tableName);
              if (!fields) {
                break;
              }
              const before =
                change.before?.lengths?.length && change.before?.values?.length
                  ? Decoder.decodeRow(change.before, fields)
                  : null;

              const after =
                change.after?.lengths?.length && change.after?.values?.length
                  ? Decoder.decodeRow(change.after, fields)
                  : null;

              this.#currentTransaction.push({ tableName, before, after });
            }
            break;
          }

          case "COMMIT": {
            const changes = this.#currentTransaction;

            if (event.vgtid) {
              this.#lastVGtid = event.vgtid;
            }

            this.emit("change", { changes, lastVGtid: this.#lastVGtid });

            this.#currentTransaction = [];

            break;
          }

          case "ROLLBACK": {
            this.#currentTransaction = [];
            this.emit("change", { changes: [], lastVGtid: this.#lastVGtid });
            break;
          }

          case "HEARTBEAT": {
            this.#lastHeartbeat = Date.now();
            break;
          }

          case "DDL":
          case "VERSION":
          case "OTHER":
            // Ignore these events
            break;

          default:
            this.emit("unknown_event", event);
        }
      }
    }
  }

  get lastVGtid(): VGtidJson | null {
    return this.#lastVGtid;
  }

  start(params: VStreamRequestJson): void {
    if (this.streamCompletionPromise) {
      throw new Error("Stream already started");
    }

    this.#vstream = this.#client.vStream(params);
    this.streamCompletionPromise = this.#consumeStream().catch((err) => {
      this.emit("error", err);
      this.stop();
    });

    this.#heartbeatInterval = setInterval(() => {
      if (this.#lastHeartbeat) {
        if (Date.now() - this.#lastHeartbeat > 2000) {
          void this.stop(new Error("Heartbeat timeout"))
            .catch((err) => this.emit("error", err));
        }
      }
    }, 2000);
  }

  async stop(reason?: Error): Promise<VGtidJson | null> {
    if (this.#heartbeatInterval) {
      clearInterval(this.#heartbeatInterval);
    }

    if (this.#stopping) {
      throw new Error("Stream not started or already stopped");
    }

    if (!this.streamCompletionPromise) {
      throw new Error("Stream not started");
    }

    this.#stopping = true;
    await this.streamCompletionPromise;
    this.#sessionManager.abort(reason);

    return this.lastVGtid
  }
}

