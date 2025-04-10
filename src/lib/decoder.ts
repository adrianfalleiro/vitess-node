import type { TypeJson, RowJson, FieldJson } from "../gen/query_pb";

function assertUnreachable(x: never): never {
  throw new Error("Unreachable code");
}

function decodeValueFromBuffer(buf: Buffer, type: TypeJson): string | boolean | Date | Buffer | number | bigint | null | object {
  switch (type) {
    // Integer types
    case "INT64":
    case "UINT64":
      // Use BigInt for 64-bit integers to avoid precision loss
      return BigInt(buf.toString("utf8"));

    case "INT32":
    case "UINT32":
    case "INT24":
    case "UINT24":
    case "INT16":
    case "UINT16":
    case "INT8":
    case "UINT8":
    case "YEAR":
      return parseInt(buf.toString("utf8"), 10);

    // Floating point types
    case "FLOAT32":
    case "FLOAT64":
    case "DECIMAL":
      return parseFloat(buf.toString("utf8"));

    // String types
    case "VARCHAR":
    case "CHAR":
    case "TEXT":
    case "ENUM":
    case "SET":
    case "HEXNUM":
    case "HEXVAL":
    case "BITNUM":
      return buf.toString("utf8");

    // Binary types
    case "VARBINARY":
    case "BINARY":
    case "BLOB":
      return buf;

    // JSON data
    case "JSON":
      try {
        return JSON.parse(buf.toString("utf8"));
      } catch (e) {
        return buf.toString("utf8");
      }

    // Date and time types
    case "DATE":
      const dateStr = buf.toString("utf8");
      // Format: YYYY-MM-DD
      return new Date(dateStr + "T00:00:00Z");

    case "DATETIME":
      // Format: YYYY-MM-DD HH:MM:SS or YYYY-MM-DD HH:MM:SS.fraction
      return new Date(buf.toString("utf8").replace(" ", "T") + "Z");

    case "TIMESTAMP":
      // MySQL stores TIMESTAMP in UTC
      return new Date(buf.toString("utf8").replace(" ", "T") + "Z");

    case "TIME":
      // Time format HH:MM:SS
      return buf.toString("utf8");

    // Boolean types
    case "BIT":
      const bit = buf.toString('utf8');
      // For BIT(1), interpret as boolean
      if (bit.length === 1) {
        return Boolean(bit !== '0');
      }
      return buf; // For larger BIT fields, return the buffer

    // Geometry types
    case "GEOMETRY":
      return buf; // Return raw buffer for geometry data

    // Vector type (newer MySQL feature)
    case "VECTOR":
      return buf;

    // Raw 
    case "RAW":
      return buf;

    // Expression 
    case "EXPRESSION":
      return buf.toString("utf8");

    // Tuple type
    case "TUPLE":
      // This would require more complex parsing based on your specific implementation
      return buf;

    case "NULL_TYPE":
      return null;

    default:
      assertUnreachable(type);
  }
}

export function decodeRow(row: RowJson, fields: FieldJson[]): Record<string, any> {
  const lengths = (row.lengths ?? []).map(Number);
  const buf = Buffer.from(row.values ?? "", "base64");

  let offset = 0;
  const obj: Record<string, any> = {};

  for (let i = 0; i < fields.length; i++) {
    const len = lengths[i];
    const field = fields[i];

    if (!field.name) {
      continue;
    }

    if (!field.type) {
      continue;
    }

    if (len === -1) {
      obj[field.name] = null;
      continue;
    }

    const slice = buf.subarray(offset, offset + len);
    obj[field.name] = decodeValueFromBuffer(slice, field.type);
    offset += len;
  }

  return obj;
}
