import test from "node:test";
import assert from "node:assert/strict";
import { decodeRow } from "../../src/utils/decodeRow";
import { Type } from "../../src/gen/query_pb";
import { Message } from "@bufbuild/protobuf";

// Helper function to create Field objects compatible with the decodeRow function
function createField(name: string, type: Type, columnLength: number): any {
  return {
    name,
    type,
    columnLength,
    $typeName: "query.Field",
    table: "",
    orgTable: "",
    database: "",
    orgName: "",
    charset: 0,
    decimals: 0,
    flags: 0,
    columnType: ""
  };
}

test("decodeRow handles null values", (t) => {
  const fields = [
    createField("id", Type.INT32, 11),
    createField("name", Type.VARCHAR, 255)
  ];
  const lengths = [BigInt(1), BigInt(-1)];
  const values = new Uint8Array([49]); // "1" in ASCII

  const result = decodeRow(fields, lengths, values);

  assert.deepEqual(result, {
    id: 1,
    name: null
  });
});

test("decodeRow handles numeric types correctly", (t) => {
  const fields = [
    createField("tinyint", Type.INT8, 4),
    createField("smallint", Type.INT16, 6),
    createField("int", Type.INT32, 11),
    createField("bigint", Type.INT64, 20),
    createField("float", Type.FLOAT32, 12),
    createField("double", Type.FLOAT64, 22),
    createField("decimal", Type.DECIMAL, 10)
  ];

  // ASCII values: "1", "12345", "123456789", "9007199254740991", "3.14", "3.141592653589793", "123.45"
  const strValues = [
    "1",
    "12345",
    "123456789",
    "9007199254740991",
    "3.14",
    "3.141592653589793",
    "123.45",
  ];
  const encoder = new TextEncoder();
  const values = encoder.encode(strValues.join(""));

  const lengths = strValues.map((s) => BigInt(s.length));

  const result = decodeRow(fields, lengths, values);

  assert.equal(result.tinyint, 1);
  assert.equal(result.smallint, 12345);
  assert.equal(result.int, 123456789);
  assert.equal(result.bigint, 9007199254740991);
  assert.equal(result.float, 3.14);
  assert.equal(result.double, 3.141592653589793);
  assert.equal(result.decimal, 123.45);
});

test("decodeRow handles boolean values", (t) => {
  const fields = [
    createField("bool1", Type.INT8, 1),
    createField("bool2", Type.INT8, 1),
    createField("bit1", Type.BIT, 1),
    createField("bit2", Type.BIT, 1)
  ];

  // ASCII values: "1", "0", "1", "0"
  const values = new Uint8Array([49, 48, 49, 48]);
  const lengths = [BigInt(1), BigInt(1), BigInt(1), BigInt(1)];

  const result = decodeRow(fields, lengths, values);

  assert.equal(result.bool1, true);
  assert.equal(result.bool2, false);
  assert.equal(result.bit1, true);
  assert.equal(result.bit2, false);
});

test("decodeRow handles date and time values", (t) => {
  const fields = [
    createField("timestamp", Type.TIMESTAMP, 19),
    createField("date", Type.DATE, 10),
    createField("datetime", Type.DATETIME, 19),
    createField("time", Type.TIME, 8)
  ];

  // ASCII values: "2023-04-01 12:34:56", "2023-04-01", "2023-04-01 12:34:56", "12:34:56"
  const strValues = [
    "2023-04-01 12:34:56",
    "2023-04-01",
    "2023-04-01 12:34:56",
    "12:34:56",
  ];
  const encoder = new TextEncoder();
  const values = encoder.encode(strValues.join(""));

  const lengths = strValues.map((s) => BigInt(s.length));

  const result = decodeRow(fields, lengths, values);

  assert.ok(result.timestamp instanceof Date);
  assert.ok(result.date instanceof Date);
  assert.ok(result.datetime instanceof Date);
  assert.equal(result.time, "12:34:56");

  assert.equal(result.timestamp.toISOString().slice(0, 10), "2023-04-01");
  assert.equal(result.date.toISOString().slice(0, 10), "2023-04-01");
  assert.equal(result.datetime.toISOString().slice(0, 10), "2023-04-01");
});

test("decodeRow handles text types", (t) => {
  const fields = [
    createField("varchar", Type.VARCHAR, 255),
    createField("char", Type.CHAR, 10),
    createField("text", Type.TEXT, 65535),
    createField("enum", Type.ENUM, 0),
    createField("set", Type.SET, 0)
  ];

  // ASCII values for all strings
  const strValues = [
    "Hello World",
    "Fixed",
    "Lorem ipsum dolor sit amet",
    "option1",
    "value1,value2",
  ];
  const encoder = new TextEncoder();
  const values = encoder.encode(strValues.join(""));

  const lengths = strValues.map((s) => BigInt(s.length));

  const result = decodeRow(fields, lengths, values);

  assert.equal(result.varchar, "Hello World");
  assert.equal(result.char, "Fixed");
  assert.equal(result.text, "Lorem ipsum dolor sit amet");
  assert.equal(result.enum, "option1");
  assert.equal(result.set, "value1,value2");
});

test("decodeRow handles binary types", (t) => {
  const fields = [
    createField("binary", Type.BINARY, 5),
    createField("binaryUUID", Type.BINARY, 16),
    createField("varbinary", Type.VARBINARY, 255),
    createField("blob", Type.BLOB, 65535)
  ];

  // Binary data
  const binData = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05]);
  const uuidData = Buffer.from("0123456789abcdef0123456789abcdef", "hex");
  const varBinData = Buffer.from([0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
  const blobData = Buffer.from("blob-data-test");

  // Combine all binary data
  const combinedData = Buffer.concat([binData, uuidData, varBinData, blobData]);

  const lengths = [
    BigInt(binData.length),
    BigInt(uuidData.length),
    BigInt(varBinData.length),
    BigInt(blobData.length),
  ];

  const result = decodeRow(fields, lengths, combinedData);

  assert.ok(Buffer.isBuffer(result.binary));
  // Don't test exact UUID string, just check it's a string of expected length
  assert.ok(typeof result.binaryUUID === 'string');
  assert.equal(result.binaryUUID.length, 24);
  assert.ok(Buffer.isBuffer(result.varbinary));
  assert.ok(Buffer.isBuffer(result.blob));

  assert.equal(Buffer.compare(result.binary, binData), 0);
  assert.equal(Buffer.compare(result.varbinary, varBinData), 0);
  assert.equal(Buffer.compare(result.blob, blobData), 0);
});

test("decodeRow handles JSON type", (t) => {
  const fields = [
    createField("validJson", Type.JSON, 0),
    createField("invalidJson", Type.JSON, 0)
  ];

  const strValues = [
    '{"name":"John","age":30,"city":"New York"}',
    "{invalid-json}",
  ];
  const encoder = new TextEncoder();
  const values = encoder.encode(strValues.join(""));

  const lengths = strValues.map((s) => BigInt(s.length));

  const result = decodeRow(fields, lengths, values);

  assert.deepEqual(result.validJson, {
    name: "John",
    age: 30,
    city: "New York",
  });

  // Invalid JSON should be returned as string
  assert.equal(result.invalidJson, "{invalid-json}");
});

test("decodeRow handles vector type", (t) => {
  const fields = [
    createField("validVector", Type.VECTOR, 0),
    createField("invalidVector", Type.VECTOR, 0)
  ];

  const strValues = ["[1.0, 2.0, 3.0, 4.0]", "[invalid-vector"];
  const encoder = new TextEncoder();
  const values = encoder.encode(strValues.join(""));

  const lengths = strValues.map((s) => BigInt(s.length));

  const result = decodeRow(fields, lengths, values);

  assert.deepEqual(result.validVector, [1.0, 2.0, 3.0, 4.0]);

  // Invalid vector should be returned as string
  assert.equal(result.invalidVector, "[invalid-vector");
});

test("decodeRow handles other types", (t) => {
  const fields = [
    createField("hexnum", Type.HEXNUM, 0),
    createField("hexval", Type.HEXVAL, 0),
    createField("bitnum", Type.BITNUM, 0),
    createField("raw", Type.RAW, 0)
  ];

  const strValues = ["DEADBEEF", "0x1A2B3C", "101010", "raw-data"];
  const encoder = new TextEncoder();
  const values = encoder.encode(strValues.join(""));

  const lengths = strValues.map((s) => BigInt(s.length));

  const result = decodeRow(fields, lengths, values);

  assert.equal(result.hexnum, "DEADBEEF");
  assert.equal(result.hexval, "0x1A2B3C");
  assert.equal(result.bitnum, "101010");
  assert.equal(result.raw, "raw-data");
});

test("toSafeNumber throws error for large BigInts", (t) => {
  const fields = [createField("id", Type.INT32, 11)];
  const lengths = [BigInt(1)];
  const values = new Uint8Array([49]); // "1" in ASCII

  // Create a BigInt larger than MAX_SAFE_INTEGER
  const largeBigInt = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);

  assert.throws(
    () => {
      decodeRow(fields, [largeBigInt], values);
    },
    {
      name: "Error",
      message: "BigInt too large to safely convert to number",
    }
  );
});
