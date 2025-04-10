import { VtGate } from "../src";
import util from "node:util";
import { createBindVariable } from "../src/lib/encoder";

async function main() {
  // Create the Vitess client
  const client = new VtGate({
    baseUrl: 'http://localhost:15991'
  });

  // Example 1: Basic query
  console.group("Example 1: Basic query");
  const result1 = await client.execute({
    query: {
      sql: "SELECT * FROM customer",
    },
  });
  console.log(result1);
  console.groupEnd();

  // // Example 2: Query with bind variables
  console.group("Example 2: Query with bind variables");
  const result2 = await client.executeBatch({
    queries: [{
      sql: "SELECT * FROM customer WHERE email = :email",
      bindVariables: {
        email: createBindVariable("alice@domain.com")
      }
    }]
  });
  console.log(util.inspect(result2, { depth: null, colors: true }));
  console.groupEnd();

  // Example 3: Stream Execute
  console.group("Example 3: Stream Execute");
  const stream = client.streamExecute({
    query: {
      sql: "SELECT * FROM customer LIMIT 100",
    },
  });

  console.log("Stream execute results:");
  let rowCount = 0;

  for await (const response of stream) {
    if (response.row) {
      console.log("row", response.row);
    }

    if (response.session) {
      console.log("session", response.session);
    }

    // Subsequent responses contain rows
    if (response.row) {
      rowCount += 1;
    }
  }

  console.log(`Total rows received: ${rowCount}`);
  console.groupEnd();
}

main().catch(console.error);