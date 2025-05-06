# Vitess Node.js Client

An expermintal Node.js client library for [Vitess](https://vitess.io/). This client uses Protocol Buffers and connect-rpc to communicate with Vitess gRPC services.

## Features

- Connect to Vitess services using gRPC
- Execute queries against Vitess databases with proper type handling
- VStream support for change data capture
- Type-safe interfaces using TypeScript

## Supported services

- [x] vtgate
- [x] binlog
- [x] vtctl
- [x] vtcld
- [x] tablemanager
- [x] query

## Installation

```bash
npm install vitess-node
```

## Usage

### Basic Query Execution

```typescript
import { VtGate, createBindVariable } from "@adrianfalleiro/vitess";

// Create the Vitess client
const client = new VtGate({
  baseUrl: "http://localhost:15991",
});

// Execute a simple query
const result = await client.execute({
  query: {
    sql: "SELECT * FROM customer",
  },
});
console.log(result);

// Query with bind variables
const result = await client.executeBatch({
  queries: [
    {
      sql: "SELECT * FROM customer WHERE email = :email",
      bindVariables: {
        email: createBindVariable("alice@domain.com"),
      },
    },
  ],
});
```

### Streaming Query Results

```typescript
import { VtGate } from "@adrianfalleiro/vitess";

// Create the Vitess client
const client = new VtGate({
  baseUrl: "http://localhost:15991",
});

// Create an abort controller to stop the stream when needed
const controller = new AbortController();

// Stream query results
const stream = client.streamExecute(
  {
    query: {
      sql: "SELECT * FROM customer LIMIT 100",
    },
  },
  { controller }
);

// Process the stream
for await (const response of stream) {
  if (response.row) {
    console.log("Row:", response.row);
  }
}

// To kill/close the connection at any time:
controller.abort();
```

### Transactions

```typescript
import { VtGate, createBindVariable } from "@adrianfalleiro/vitess";

// Create the Vitess client
const client = new VtGate({
  baseUrl: "http://localhost:15991",
});

// Start a transaction
const beginResult = await client.execute({
  query: {
    sql: "BEGIN",
  },
});

// Get the session from the result (contains transaction state)
const session = beginResult.session;

try {
  // Execute statement in transaction
  const result1 = await client.execute({
    session, // Pass the session to continue the transaction
    query: {
      sql: "INSERT INTO customer (name, email) VALUES (:name, :email)",
      bindVariables: {
        name: createBindVariable("John Doe"),
        email: createBindVariable("john.doe@example.com"),
      },
    },
  });

  // Execute another statement in the same transaction
  const result2 = await client.execute({
    session: result1.session, // Use the updated session from previous query
    query: {
      sql: "SELECT * FROM customer WHERE email = :email",
      bindVariables: {
        email: createBindVariable("john.doe@example.com"),
      },
    },
  });

  // Commit the transaction
  await client.execute({
    session: result2.session,
    query: {
      sql: "COMMIT",
    },
  });
} catch (error) {
  // Rollback on error
  await client.execute({
    session,
    query: {
      sql: "ROLLBACK",
    },
  });
}
```

### Using VStream for Change Data Capture

```typescript
import { VtGate } from "@adrianfalleiro/vitess";

const vtgate = new VtGate({
  baseUrl: "http://localhost:15991",
});

// Create an abort controller to stop the stream when needed
const controller = new AbortController();

// Start the VStream
const vs = vtgate.vStream(
  {
    tabletType: "REPLICA",
    vgtid: {
      shardGtids: [
        {
          keyspace: "commerce",
          shard: "",
          tablePKs: [],
        },
      ],
    },
  },
  { controller }
);

// Stop the listener after 15 seconds
setTimeout(() => controller.abort(), 15_000);

// Process the stream events
for await (const { changes, lastVGtid } of vs) {
  console.log("changes", changes);
  console.log("lastVGtid", lastVGtid);
}
```

## Development

### Project Structure

```
vitess-node/
├── src/             # Source code
│   ├── gen/         # Generated Protocol Buffer code
│   ├── lib/         # Core library
│   └── index.ts     # Main exports
├── proto/           # Protocol Buffer definitions
├── test/            # Tests
└── example/         # Example applications
```

### Running Tests

```bash
# Run all tests
npm run test
```

### Building the Project

```bash
# Generate Protocol Buffer code
npm run generate

# Format protobuf files
npm run format

# Lint protobuf files
npm run lint
```

## Requirements

- Node.js 20 or higher
- Vitess server running and accessible

## License

MIT - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
