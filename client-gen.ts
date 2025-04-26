import {
  createEcmaScriptPlugin,
  runNodeJs,
  type Schema,
  safeIdentifier,
} from "@bufbuild/protoplugin";
import { version } from "../package.json";

const protocGenTwirpEs = createEcmaScriptPlugin({
  name: "protoc-gen-json-service-es",
  version: `v${String(version)}`,
  generateTs,
});

function generateTs(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_client.ts");
    f.preamble(file);

    for (const service of file.services) {
      const serviceImport = f.importSchema(service);
      const svcName = safeIdentifier(service.name + "Client");
      f.print(f.jsDoc(service));
      f.print(f.export("class", svcName), " {");
      f.print("  #client: ", f.import('Client', '@connectrpc/connect', true), "<typeof ", serviceImport, ">;")
      f.print();
      f.print("  constructor(options: ", f.import("GrpcTransportOptions", "@connectrpc/connect-node", true), ") {");
      f.print("    const transport = ", f.import('createGrpcTransport', '@connectrpc/connect-node'), "(options);");
      f.print("    this.#client = ", f.import('createClient', '@connectrpc/connect'), "(", serviceImport, ", transport);");
      f.print("  }");
      f.print();

      for (const method of service.methods) {
        switch (method.methodKind) {
          case "unary":
            f.print(`  async ${method.localName}(params: `, f.importJson(method.input), ", opts?: ", f.import('CallOptions', '@connectrpc/connect', true),
              "): ", "Promise<", f.importJson(method.output), "> {"
            );
            f.print("    const response = await this.#client.", method.localName, "(", f.runtime.fromJson, "(", f.importSchema(method.input), ", ", "params), opts);");
            f.print("    return ", f.runtime.toJson, "(", f.importSchema(method.output), ", response);");
            f.print("  }");
            f.print();
            break;
          case "server_streaming":
            f.print(`  async *${method.localName}(params: `, f.importJson(method.input), ", opts?: ", f.import('CallOptions', '@connectrpc/connect', true),
              "): AsyncGenerator<", f.importJson(method.output), "> {"
            );
            f.print("    const stream = this.#client.", method.localName, "(", f.runtime.fromJson, "(", f.importSchema(method.input), ", params), opts);");
            f.print("    for await (const response of stream) {");
            f.print("      yield ", f.runtime.toJson, "(", f.importSchema(method.output), ", response);");
            f.print("    }");
            f.print("  }");
            f.print();
            break;
          case "client_streaming":
            f.print(`  async ${method.localName}(input: AsyncIterable<`, f.importJson(method.input), ">, opts?: ", f.import('CallOptions', '@connectrpc/connect', true),
              "): Promise<", f.importJson(method.output), "> {"
            );
            f.print("    const response = await this.#client.", method.localName, "((async function*() { for await (const params of input) yield ", f.runtime.fromJson, "(", f.importSchema(method.input), ", params); })(), opts);");
            f.print("    return ", f.runtime.toJson, "(", f.importSchema(method.output), ", response);");
            f.print("  }");
            f.print();
            break;
          case "bidi_streaming":
            f.print(`  async *${method.localName}(input: AsyncIterable<`, f.importJson(method.input), ">, opts?: ", f.import('CallOptions', '@connectrpc/connect', true),
              "): AsyncGenerator<", f.importJson(method.output), "> {"
            );
            f.print("    const stream = this.#client.", method.localName, "((async function*() { for await (const params of input) yield ", f.runtime.fromJson, "(", f.importSchema(method.input), ", params); })(), opts);");
            f.print("    for await (const response of stream) {");
            f.print("      yield ", f.runtime.toJson, "(", f.importSchema(method.output), ", response);");
            f.print("    }");
            f.print("  }");
            f.print();
            break;
        }
      }
      f.print("}");
    }
  }
}

runNodeJs(protocGenTwirpEs);
