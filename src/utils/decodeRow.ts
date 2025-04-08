import { type Field, Type } from "../gen/query_pb";

export function decodeRow(fields: Field[], lengths: bigint[], values: Uint8Array): Record<string, string | boolean | Date | Buffer | number | null> {
  const row: Record<string, any> = {};
  let offset = 0;

  for (let i = 0; i < lengths.length; i++) {
    const field = fields[i];
    const len = toSafeNumber(lengths[i])

    if (len === -1) {
      row[field.name] = null;
      continue;
    }

    const slice = values.slice(offset, offset + len);
    offset += len;

    const strValue = new TextDecoder().decode(slice);
    row[field.name] = decodeColumnValue(strValue, field.type, field.columnLength);
  }

  return row;
}

function decodeColumnValue(value: string, type: Type, length: number): string | boolean | Date | Buffer | number | null {
  switch (type) {
    case Type.INT8:
      if (length === 1) {
        return value === '1';
      }
      return parseInt(value, 10);
    case Type.UINT8:
    case Type.INT16:
    case Type.UINT16:
    case Type.INT24:
    case Type.UINT24:
    case Type.INT32:
    case Type.UINT32:
    case Type.INT64:
    case Type.UINT64:
      return parseInt(value, 10);
    case Type.YEAR:
      return parseInt(value, 10);
    case Type.FLOAT32:
    case Type.FLOAT64:
    case Type.DECIMAL:
      return parseFloat(value);
    case Type.TIMESTAMP:
    case Type.DATE:
    case Type.DATETIME:
      return new Date(value);
    case Type.TIME:
      return value;
    case Type.BIT:
      return value === '1';
    case Type.TEXT:
    case Type.VARCHAR:
    case Type.CHAR:
      return value;
    case Type.BINARY:
      if (length === 16) {
        const buf = Buffer.from(value);
        return buf.toString("hex").slice(0, 24);
      }
      return Buffer.from(value);
    case Type.VARBINARY:
    case Type.BLOB:
      return Buffer.from(value);
    case Type.ENUM:
    case Type.SET:
      return value;
    case Type.JSON:
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    case Type.GEOMETRY:
      return value;
    case Type.VECTOR:
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    case Type.NULL_TYPE:
      return null;
    case Type.HEXNUM:
    case Type.HEXVAL:
    case Type.BITNUM:
    case Type.EXPRESSION:
    case Type.RAW:
    case Type.TUPLE:
      return value; // Preserve as is
    default:
      assertUnreachable(type);
  }
}

function toSafeNumber(b: bigint): number {
  if (b > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("BigInt too large to safely convert to number");
  }
  return Number(b);
}

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}