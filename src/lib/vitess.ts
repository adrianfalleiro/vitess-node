import { type CallOptions } from "@connectrpc/connect";
import { type GrpcTransportOptions } from "@connectrpc/connect-node";
import {
  type CloseSessionRequestJson,
  type ExecuteBatchRequestJson,
  type ExecuteRequestJson,
  type ExecuteResponseJson,
  type PrepareRequestJson,
  type SessionJson,
  type StreamExecuteRequestJson,
  type VStreamRequestJson,
} from "../gen/vtgate_pb";
import type { RPCErrorJson } from "../gen/vtrpc_pb";
import { Decoder } from "./decoder";
import type { FieldJson } from "../gen/query_pb";
import type { VGtidJson } from "../gen/binlogdata_pb";
import { VitessClient } from "../gen/vtgateservice_client";

type TransactionChange = {
  tableName: string;
  before: Record<string, any> | null;
  after: Record<string, any> | null;
};

type ExecuteResponse = {
  rows: Record<string, any>[];
  rowsAffected: number;
  insertId: number;
  session?: SessionJson;
  error?: RPCErrorJson;
}

function decodeExecuteResponse(response: ExecuteResponseJson): ExecuteResponse {
  if (response.error) {
    return {
      rows: [],
      rowsAffected: 0,
      insertId: 0,
      session: response.session,
      error: response.error
    };
  }

  const result = response.result!;
  const fields = result.fields ?? [];
  const resultRows = result.rows ?? [];

  const rows = resultRows.map(row => Decoder.decodeRow(row, fields));

  return {
    rows,
    rowsAffected: parseInt(result.rowsAffected ?? "0", 10),
    insertId: parseInt(result.insertId ?? "0", 10),
    session: response.session,
    error: undefined
  };
}

export class Vitess {
  #client: VitessClient;

  constructor(options: GrpcTransportOptions) {
    this.#client = new VitessClient(options);
  }

  get raw() {
    return this.#client;
  }

  async execute(params: ExecuteRequestJson, opts?: CallOptions) {
    const result = await this.#client.execute(params, opts);
    return decodeExecuteResponse(result);
  }

  async executeBatch(params: ExecuteBatchRequestJson, opts?: CallOptions) {
    const result = await this.#client.executeBatch(params, opts);
    return result.results?.map(result => decodeExecuteResponse(result));
  }

  async *streamExecute(params: StreamExecuteRequestJson, opts?: CallOptions) {
    const result = this.#client.streamExecute(params, opts);

    let fieldDefs: FieldJson[] = [];
    let session: SessionJson | undefined;

    for await (const chunk of result) {
      if (chunk.result?.fields) {
        fieldDefs = chunk.result.fields;
      }

      if (chunk.session) {
        session = chunk.session;
      }

      if (chunk.result?.rows) {
        const rows = chunk.result.rows;
        for (const row of rows) {
          const decodedRow = Decoder.decodeRow(row, fieldDefs);
          yield { row: decodedRow, session };
        }
      }
    }
  }

  async *vStream(params: VStreamRequestJson, opts?: CallOptions) {
    const result = this.#client.vStream(params, opts);

    let lastVGtid: VGtidJson | null = null;
    const tableFields = new Map<string, FieldJson[]>()
    let currentTransaction: TransactionChange[] = [];

    for await (const row of result) {
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
          case "VGTID":
            if (!event.vgtid) {
              break;
            }

            lastVGtid = event.vgtid;
            break;

          case "FIELD":
            if (!event.fieldEvent?.fields) {
              break;
            }

            if (!event.fieldEvent.tableName) {
              break;
            }

            const currentFields = event.fieldEvent.fields;
            tableFields.set(event.fieldEvent.tableName, currentFields)
            break;

          case "BEGIN":
            currentTransaction = [];
            break;

          case "ROW":
            if (!event.rowEvent?.rowChanges) {
              break;
            }

            if (!event.rowEvent.tableName) {
              break;
            }

            const tableName = event.rowEvent.tableName;

            for (const change of event.rowEvent.rowChanges) {
              const fields = tableFields.get(tableName);
              if (!fields) {
                break;
              }
              const before = (change.before?.lengths?.length && change.before?.values?.length)
                ? Decoder.decodeRow(change.before, fields)
                : null;

              const after = (change.after?.lengths?.length && change.after?.values?.length)
                ? Decoder.decodeRow(change.after, fields)
                : null;

              currentTransaction.push({ tableName, before, after });
            }
            break;

          case "COMMIT":
            const changes = currentTransaction;

            if (event.vgtid) {
              lastVGtid = event.vgtid;
            }

            yield { changes, lastVGtid };

            currentTransaction = [];

            break;

          case "ROLLBACK":
            currentTransaction = [];
            yield { changes: [], lastVGtid };
            break;

          case "DDL":
          case "VERSION":
          case "HEARTBEAT":
          case "OTHER":
            // Ignore these events
            break;

          default:
            console.warn('Unknown event type:', event);
        }
      }
    }
  }

  async prepare(params: PrepareRequestJson, opts?: CallOptions) {
    const result = await this.#client.prepare(params, opts);
    return result;
  }

  async closeSession(params: CloseSessionRequestJson, opts?: CallOptions) {
    const result = await this.#client.closeSession(params, opts);
    return result;
  }
}


