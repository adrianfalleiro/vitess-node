import { createClient, type Client } from "@connectrpc/connect";
import { createGrpcTransport, type GrpcTransportOptions } from "@connectrpc/connect-node";
import { Vitess } from "../gen/vtgateservice_pb";
import { fromJson, toJson } from "@bufbuild/protobuf";
import {
  type CloseSessionRequestJson,
  CloseSessionRequestSchema,
  CloseSessionResponseSchema,
  type ExecuteBatchRequestJson,
  ExecuteBatchRequestSchema,
  ExecuteBatchResponseSchema,
  type ExecuteRequestJson,
  ExecuteRequestSchema,
  type ExecuteResponseJson,
  ExecuteResponseSchema,
  type PrepareRequestJson,
  PrepareRequestSchema,
  PrepareResponseSchema,
  type SessionJson,
  type StreamExecuteRequestJson,
  StreamExecuteRequestSchema,
  StreamExecuteResponseSchema,
  type VStreamRequestJson,
  VStreamRequestSchema,
  VStreamResponseSchema
} from "../gen/vtgate_pb";
import type { RPCErrorJson } from "../gen/vtrpc_pb";
import { decodeRow } from "./decoder";
import type { FieldJson } from "../gen/query_pb";
import type { VGtidJson } from "../gen/binlogdata_pb";

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

  const rows = resultRows.map(row => decodeRow(row, fields));

  return {
    rows,
    rowsAffected: parseInt(result.rowsAffected ?? "0", 10),
    insertId: parseInt(result.insertId ?? "0", 10),
    session: response.session,
    error: undefined
  };
}

type StreamOptions = {
  controller?: AbortController;
}

export class VtGate {
  #client: Client<typeof Vitess>;

  constructor(options: GrpcTransportOptions) {
    const transport = createGrpcTransport(options);
    this.#client = createClient(Vitess, transport);
  }

  get raw() {
    return this.#client;
  }

  async execute(params: ExecuteRequestJson) {
    const result = await this.#client.execute(fromJson(ExecuteRequestSchema, params));

    const resultJson = toJson(ExecuteResponseSchema, result);
    return decodeExecuteResponse(resultJson);
  }

  async executeBatch(params: ExecuteBatchRequestJson) {
    // Call the original method with converted params
    const result = await this.#client.executeBatch(fromJson(ExecuteBatchRequestSchema, params));
    const resultJson = toJson(ExecuteBatchResponseSchema, result);
    return resultJson.results?.map(result => decodeExecuteResponse(result));
  }

  async *streamExecute(params: StreamExecuteRequestJson, { controller }: StreamOptions = {}) {
    const result = this.#client.streamExecute(fromJson(StreamExecuteRequestSchema, params));

    let fieldDefs: FieldJson[] = [];
    let session: SessionJson | undefined;

    for await (const chunk of result) {
      if (controller?.signal.aborted) {
        return;
      }

      const chunkJson = toJson(StreamExecuteResponseSchema, chunk);

      if (chunkJson.result?.fields) {
        fieldDefs = chunkJson.result.fields;
      }

      if (chunkJson.session) {
        session = chunkJson.session;
      }

      if (chunkJson.result?.rows) {
        const rows = chunkJson.result.rows;
        for (const row of rows) {
          const decodedRow = decodeRow(row, fieldDefs);
          yield { row: decodedRow, session };
        }
      }
    }
  }

  async *vStream(params: VStreamRequestJson, { controller }: StreamOptions = {}) {
    const result = this.#client.vStream(fromJson(VStreamRequestSchema, params));

    let lastVGtid: VGtidJson | null = null;
    const tableFields = new Map<string, FieldJson[]>()
    let currentTransaction: TransactionChange[] = [];

    for await (const row of result) {
      if (controller?.signal.aborted) {
        return;
      }

      const rowJson = toJson(VStreamResponseSchema, row);

      if (!rowJson.events) {
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
      for (const event of rowJson.events) {
        switch (event.type) {
          case "VERSION":
            console.log(`Vitess version: ${event}`);
            break;

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
                ? decodeRow(change.before, fields)
                : null;

              const after = (change.after?.lengths?.length && change.after?.values?.length)
                ? decodeRow(change.after, fields)
                : null;

              currentTransaction.push({ tableName, before, after });
            }
            break;

          case "COMMIT":
            const changes = currentTransaction;
            currentTransaction = [];

            if (event.vgtid) {
              lastVGtid = event.vgtid;
            }

            yield { changes, lastVGtid };

            break;

          case "ROLLBACK":
            console.warn('ROLLBACK received, discarding buffered transaction');
            currentTransaction = [];
            yield { changes: [], lastVGtid };
            break;

          case "DDL":
            console.warn(`DDL Change: ${event.statement}`);
            break;

          case "HEARTBEAT":
            console.debug('Heartbeat');
            break;

          case "OTHER":
            break;

          default:
            console.warn('Unknown event type:', event);
        }
      }
    }
  }

  async prepare(params: PrepareRequestJson) {
    const result = await this.#client.prepare(fromJson(PrepareRequestSchema, params));
    const resultJson = toJson(PrepareResponseSchema, result);
    return resultJson;
  }

  async closeSession(params: CloseSessionRequestJson) {
    const result = await this.#client.closeSession(fromJson(CloseSessionRequestSchema, params));
    const resultJson = toJson(CloseSessionResponseSchema, result);
    return resultJson;
  }
}


