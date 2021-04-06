require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const fetch = require("node-fetch");

async function run() {
  try {
    await client.connect();
    const database = client.db("wells");
    const wellDetails = database.collection("wellDetails");

    const url =
      "https://www.waterdatafortexas.org/reservoirs/statewide/recent-conditions.geojson";
    let settings = { method: "Get" };

    const response = await fetch(url, settings);
    let json = await response.json();

    let wellList = json.features;

    for await (let well of wellList) {
      await wellDetails.updateOne(
        {
          geometry: well.geometry,
        },
        {
          $set: {
            properties: well.properties,
          },
        }
      );
    }

    console.log("documents updated");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
