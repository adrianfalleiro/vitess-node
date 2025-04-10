import { VtGate } from "../src";

async function main() {
  const vtgate = new VtGate({
    baseUrl: 'http://localhost:15991'
  });

  const controller = new AbortController();

  const vs = vtgate.vStream({
    tabletType: "REPLICA",
    vgtid: {
      shardGtids: [
        {
          keyspace: "commerce",
          shard: "",
          // gtid: "current",
          tablePKs: [],
        },
      ],
    },
    // filter: {
    //   rules: [
    //     {
    //       match: "customer",
    //       filter: "select * from customer"
    //     }
    //   ]
    // }
  }, { controller });

  // Stop the vstream after 15 seconds
  setTimeout(() => {
    controller.abort();
  }, 15_000);

  for await (const { changes, lastVGtid } of vs) {
    console.log('changes', changes);
    console.log('lastVGtid', lastVGtid);
  }
}


main();
