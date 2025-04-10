import test from "node:test";
import assert from "node:assert/strict";
import { decodeRow } from "../../src/lib/decoder";
import { RowSchema, Type, type FieldJson, type RowJson, type TypeJson } from "../../src/gen/query_pb";
import { create, fromJson } from "@bufbuild/protobuf";

// Helper function to create FieldJson and RowJson objects compatible with the decodeRow function
function createFieldAndRow(defs: Array<{ name: string, type: TypeJson, value: any }>) {
  const fields: FieldJson[] = [];
  const rowLengths: string[] = [];
  const rowValues: string[] = [];

  for (const def of defs) {
    fields.push({
      name: def.name,
      type: def.type,
    });
  }

  for (const def of defs) {
    const length = def.value !== null ? def.value.toString().length : -1;
    rowLengths.push(length);
    rowValues.push(def.value);
  }

  const row: RowJson = {
    lengths: rowLengths,
    values: Buffer.from(rowValues.join("")).toString('base64')
  }

  return {
    fields,
    row
  }
}

test("decodeRow handles null values", (t) => {
  const { fields, row } = createFieldAndRow([
    { name: "id", type: "INT32", value: 11 },
    { name: "name", type: "VARCHAR", value: null }
  ]);


  const result = decodeRow(row, fields);

  assert.deepEqual(result, {
    id: 11,
    name: null
  });
});

test("decodeRow handles numeric types correctly", (t) => {

  const { fields, row } = createFieldAndRow([
    { name: "tinyint", type: "INT8", value: 1 },
    { name: "smallint", type: "INT16", value: 12345 },
    { name: "int", type: "INT32", value: 123456789 },
    { name: "bigint", type: "INT64", value: BigInt(9007199254740991) },
    { name: "float", type: "FLOAT32", value: 3.14 },
    { name: "double", type: "FLOAT64", value: 3.141592653589793 },
    { name: "decimal", type: "DECIMAL", value: 123.45 }
  ]);


  const result = decodeRow(row, fields);

  assert.equal(result.tinyint, 1);
  assert.equal(result.smallint, 12345);
  assert.equal(result.int, 123456789);
  assert.equal(result.bigint, BigInt(9007199254740991));
  assert.equal(result.float, 3.14);
  assert.equal(result.double, 3.141592653589793);
  assert.equal(result.decimal, 123.45);
});

test.skip("decodeRow handles boolean values", (t) => {
  const { fields, row } = createFieldAndRow([
    { name: "bool1", type: "INT8", value: 1 },
    { name: "bool2", type: "INT8", value: 0 },
    { name: "bit1", type: "BIT", value: 1 },
    { name: "bit2", type: "BIT", value: 0 }
  ]);

  const result = decodeRow(row, fields);

  assert.equal(result.bool1, true);
  assert.equal(result.bool2, false);
  assert.equal(result.bit1, true);
  assert.equal(result.bit2, false);
});

test("decodeRow handles date and time values", (t) => {
  const { fields, row } = createFieldAndRow([
    { name: "timestamp", type: "TIMESTAMP", value: "2023-04-01 12:34:56" },
    { name: "date", type: "DATE", value: "2023-04-01" },
    { name: "datetime", type: "DATETIME", value: "2023-04-01 12:34:56" },
    { name: "time", type: "TIME", value: "12:34:56" }
  ]);

  const result = decodeRow(row, fields);

  assert.ok(result.timestamp instanceof Date);
  assert.ok(result.date instanceof Date);
  assert.ok(result.datetime instanceof Date);
  assert.equal(result.time, "12:34:56");

  assert.equal(result.timestamp.toISOString().slice(0, 10), "2023-04-01");
  assert.equal(result.date.toISOString().slice(0, 10), "2023-04-01");
  assert.equal(result.datetime.toISOString().slice(0, 10), "2023-04-01");
});

test.skip("decodeRow handles text types", (t) => {
  const { fields, row } = createFieldAndRow([
    { name: "varchar", type: "VARCHAR", value: "Hello World" },
    { name: "char", type: "CHAR", value: "Fixed" },
    { name: "text", type: "TEXT", value: "Lorem ipsum dolor sit amet" },
    { name: "enum", type: "ENUM", value: "option1" },
    { name: "set", type: "SET", value: "value1,value2" }
  ]);

  const result = decodeRow(row, fields);

  // ASCII values for all strings
  assert.equal(result.varchar, "Hello World");
  assert.equal(result.char, "Fixed");
  assert.equal(result.text, "Lorem ipsum dolor sit amet");
  assert.equal(result.enum, "option1");
  assert.equal(result.set, "value1,value2");
});

test.skip("decodeRow handles binary types", (t) => {
  const { fields, row } = createFieldAndRow([
    { name: "binary", type: "BINARY", value: Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05]) },
    { name: "binaryUUID", type: "BINARY", value: Buffer.from("0123456789abcdef0123456789abcdef", "hex") },
    { name: "varbinary", type: "VARBINARY", value: Buffer.from([0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]) },
    { name: "blob", type: "BLOB", value: Buffer.from("blob-data-test") }
  ]);

  const result = decodeRow(row, fields);

  assert.ok(Buffer.isBuffer(result.binary));
  assert.ok(Buffer.isBuffer(result.binaryUUID));
  assert.ok(Buffer.isBuffer(result.varbinary));
  assert.ok(Buffer.isBuffer(result.blob));

  assert.equal(result.binary.toString('hex'), "0102030405");
  assert.equal(result.binaryUUID.toString('hex'), "0123456789abcdef0123456789abcdef");
  assert.equal(result.varbinary.toString('hex'), "0a0b0c0d0e0f");
  assert.equal(result.blob.toString('hex'), "626c6f622d646174612d74657374");
});

test.skip("decodeRow handles JSON type", (t) => {
  const { fields, row } = createFieldAndRow([
    { name: "validJson", type: "JSON", value: '{"name":"John","age":30,"city":"New York"}' },
    { name: "invalidJson", type: "JSON", value: "{invalid-json}" }
  ]);

  const result = decodeRow(row, fields);

  assert.equal(result.validJson, {
    name: "John",
    age: 30,
    city: "New York"
  });

  assert.equal(result.invalidJson, "{invalid-json}");
});

test.skip("decodeRow handles vector type", (t) => {
  const { fields, row } = createFieldAndRow([
    { name: "validVector", type: "VECTOR", value: [1.0, 2.0, 3.0, 4.0] },
    { name: "invalidVector", type: "VECTOR", value: [1.0, 2.0, 3.0, 4.0] }
  ]);

  const result = decodeRow(row, fields);

  assert.deepEqual(result.validVector, [1.0, 2.0, 3.0, 4.0]);

  // Invalid vector should be returned as string
  assert.equal(result.invalidVector, "[1.0, 2.0, 3.0, 4.0]");
});

test.skip("decodeRow handles other types", (t) => {
  const { fields, row } = createFieldAndRow([
    { name: "hexnum", type: "HEXNUM", value: "DEADBEEF" },
    { name: "hexval", type: "HEXVAL", value: "0x1A2B3C" },
    { name: "bitnum", type: "BITNUM", value: "101010" },
    { name: "raw", type: "RAW", value: "raw-data" }
  ]);

  const result = decodeRow(row, fields);

  assert.equal(result.hexnum, "DEADBEEF");
  assert.equal(result.hexval, "0x1A2B3C");
  assert.equal(result.bitnum, "101010");
  assert.equal(result.raw, "raw-data");
});

test.skip("toSafeNumber throws error for large BigInts", (t) => {
  const largeBigInt = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
  const { fields, row } = createFieldAndRow([
    { name: "id", type: "INT32", value: largeBigInt }
  ]);

  // Create a BigInt larger than MAX_SAFE_INTEGER

  assert.throws(
    () => {
      decodeRow(row, fields);
    },
    {
      name: "Error",
      message: "BigInt too large to safely convert to number",
    }
  );
});
