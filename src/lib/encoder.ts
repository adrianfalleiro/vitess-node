import { BindVariableJson } from "../gen/query_pb";

// Helper function to create bind variables from common TypeScript types
export function createBindVariable(value: string | number | bigint | boolean | Date | null): BindVariableJson {
  if (value === null) {
    return { type: "NULL_TYPE", value: "" };
  }

  if (typeof value === 'string') {
    return {
      type: "VARCHAR",
      value: Buffer.from(value).toString('base64')
    };
  }

  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return {
        type: "INT32",
        value: Buffer.from(value.toString()).toString('base64')
      };
    } else {
      return {
        type: "FLOAT64",
        value: Buffer.from(value.toString()).toString('base64')
      };
    }
  }

  if (typeof value === 'bigint') {
    return {
      type: "INT64",
      value: Buffer.from(value.toString()).toString('base64')
    };
  }

  if (typeof value === 'boolean') {
    return {
      type: "INT8", // Using INT8 for boolean (0/1)
      value: Buffer.from(value ? '1' : '0').toString('base64')
    };
  }

  if (value instanceof Date) {
    return {
      type: "DATETIME",
      value: Buffer.from(value.toISOString().slice(0, 19).replace('T', ' ')).toString('base64')
    };
  }

  throw new Error(`Unsupported bind variable type: ${typeof value}`);
}