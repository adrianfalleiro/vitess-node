# Vitess Node.js Client

An expermintal Node.js client library for [Vitess](https://vitess.io/), a database clustering system for horizontal scaling of MySQL. This client uses Protocol Buffers and connect-rpc to communicate with Vitess gRPC services.

## Features

- Connect to Vitess services using gRPC
- Execute queries against Vitess databases with proper type handling
- VStream support for change data capture
- Type-safe interfaces using TypeScript

## Installation

```bash
npm install vitess-node
```

## Usage

### Basic Query Execution

```typescript
// TODO
```

### Streaming Query Results

```typescript
// TODO
```

### Using VStream for Change Data Capture

```typescript
// TODO
```

## Development

### Project Structure

```
vitess-node/
├── src/             # Source code
│   ├── gen/         # Generated Protocol Buffer code
│   ├── utils/       # Utility functions like decodeRow
│   ├── VStream.ts   # VStream implementation
│   └── index.ts     # Main exports
├── proto/           # Protocol Buffer definitions
├── test/            # Tests
│   └── utils/       # Utility tests
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
