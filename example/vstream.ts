import { createVitessClient } from "../src";
import { TabletType } from "../src/gen/topodata_pb";
import { VStream } from "../src/VStream";

async function main() {
  const client = createVitessClient({
    baseUrl: 'http://localhost:15991'
  });

  const vs = new VStream(client.vStream({
    tabletType: TabletType.REPLICA,
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
  }));

  vs.on('change', (change) => {
    console.log('change event', JSON.stringify(change, null, 2));
  });

  vs.start();

  // Stop the vstream after 15 seconds
  setTimeout(() => {
    vs.stop();
  }, 15_000);
}

main();
