import { VEventType, VGtidSchema, type VGtidJson } from "./gen/binlogdata_pb";
import type { Field } from "./gen/query_pb";
import { decodeRow } from "./utils/decodeRow";
import { type VStreamResponse } from "./gen/vtgate_pb";
import EventEmitter from "events";
import { toJson } from "@bufbuild/protobuf";

type TransactionChange = {
  tableName: string;
  before: Record<string, any> | null;
  after: Record<string, any> | null;
};

export class VStream extends EventEmitter {
  lastVGtid: VGtidJson | null = null;
  #tableFields = new Map<string, Field[]>()
  #currentTransaction: TransactionChange[] = [];

  #iterator: AsyncIterable<VStreamResponse>;
  #stopped = false;

  constructor(iterator: AsyncIterable<VStreamResponse>) {
    super();
    this.#iterator = iterator;
  }

  start() {
    this.#consumeStreamIterator()
      .catch(err => {
        console.error('Error while consuming iterator:', err)
      });
  }

  stop() {
    this.#stopped = true
    this.emit('stop')
  }

  async #consumeStreamIterator() {
    for await (const row of this.#iterator) {
      if (this.#stopped) {
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
          case VEventType.VERSION:
            console.log(`Vitess version: ${event}`);
            break;

          case VEventType.VGTID:
            if (!event.vgtid) {
              break;
            }

            this.lastVGtid = toJson(VGtidSchema, event.vgtid);
            break;

          case VEventType.FIELD:
            if (!event.fieldEvent?.fields) {
              break;
            }

            if (!event.fieldEvent.tableName) {
              break;
            }

            const currentFields = event.fieldEvent.fields;
            this.#tableFields.set(event.fieldEvent.tableName, currentFields)
            break;

          case VEventType.BEGIN:
            this.#currentTransaction = [];
            break;

          case VEventType.ROW:
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
              const before = (change.before?.lengths?.length && change.before?.values?.length)
                ? decodeRow(fields, change.before.lengths, change.before.values)
                : null;

              const after = (change.after?.lengths?.length && change.after?.values?.length)
                ? decodeRow(fields, change.after.lengths, change.after.values)
                : null;

              console.log('before', before);
              this.#currentTransaction.push({ tableName, before, after });
            }
            break;

          case VEventType.COMMIT:
            const changes = this.#currentTransaction;
            this.#currentTransaction = [];

            if (event.vgtid) {
              this.lastVGtid = toJson(VGtidSchema, event.vgtid);
            }

            this.emit('change', changes);

            break;

          case VEventType.ROLLBACK:
            console.warn('ROLLBACK received, discarding buffered transaction');
            this.#currentTransaction = [];
            break;

          case VEventType.DDL:
            console.warn(`DDL Change: ${event.statement}`);
            break;

          case VEventType.HEARTBEAT:
            console.debug('💓 heartbeat');
            break;

          case VEventType.OTHER:
            break;

          default:
            console.warn('Unknown event type:', event);
        }
      }
    }
  }
}
