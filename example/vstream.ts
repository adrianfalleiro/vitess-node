import { VStream } from "../src";

async function main() {
  const vStreamClient = new VStream({
    baseUrl: "http://localhost:15991",
  });

  vStreamClient.start({
    tabletType: "PRIMARY",
    vgtid: {
      shardGtids: [
        {
          keyspace: "commerce",
          shard: "",
          gtid: "current",
          tablePKs: [],
        },
      ],
    },
    filter: {
      rules: [
        {
          match: "customer",
          filter: "select * from customer"
        }
      ]
    }
  });

  vStreamClient.on("change", (data) => {
    console.log("change", data);
  });

  vStreamClient.on("error", (err) => {
    console.error("error", err);
  });

  void setTimeout(async () => {
    const lastVtgid = await vStreamClient.stop();
    console.log("lastVtgid", lastVtgid);
  }, 5_000);
}


main();
