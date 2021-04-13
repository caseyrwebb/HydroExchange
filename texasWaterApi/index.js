require("dotenv").config();
const express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(9000, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      wells = client.db("wells");
      wellDetails = wells.collection("wellDetails");
      texas_water = client.db("texas_water");
      users = texas_water.collection("users");
      NQH20 = wells.collection("NQH20");
      console.log("Connected to mongodb!");
    }
  );
});

app.get("/wells", (request, response) => {
  wellDetails.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/currentPrice", (request, response) => {
  NQH20.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.post("/stake", async (req, res) => {
  if (req.body.email === "czar@email.com") {
    let user = await users.find({ email: req.body.email }).toArray();

    if ("stakes" in user[0]) {
      let stakes = user[0].stakes;

      stakes[req.body.wellName] = [req.body.quantity, req.body.price, true];

      let newStake = await users.findOneAndUpdate(
        { email: req.body.email },
        { $set: { stakes: stakes } }
      );
    } else {
      let newStake = await users.findOneAndUpdate(
        { email: req.body.email },
        {
          $set: {
            stakes: {
              [req.body.wellName]: [req.body.quantity, req.body.price, true],
            },
          },
        }
      );
    }

    let well = await wellDetails
      .find({
        "properties.full_name": req.body.wellName,
      })
      .toArray();

    if ("stakes" in well[0]) {
      let wellStake = well[0].stakes;

      wellStake[req.body.email] = [req.body.quantity, req.body.price, true];

      let newWellStake = await wellDetails.findOneAndUpdate(
        { "properties.full_name": req.body.wellName },
        {
          $set: {
            stakes: wellStake,
          },
        }
      );
    } else {
      let wellStake = well[0];

      let newWellStake = await wellDetails.findOneAndUpdate(
        { "properties.full_name": req.body.wellName },
        {
          $set: {
            stakes: {
              [req.body.email]: [req.body.quantity, req.body.price, true],
            },
          },
        }
      );
    }
  } else {
    let user = await users.find({ email: req.body.email }).toArray();

    if ("stakes" in user[0]) {
      let stakes = user[0].stakes;

      stakes[req.body.wellName] = [req.body.quantity, req.body.price, false];

      let newStake = await users.findOneAndUpdate(
        { email: req.body.email },
        { $set: { stakes: stakes } }
      );
    } else {
      let newStake = await users.findOneAndUpdate(
        { email: req.body.email },
        {
          $set: {
            stakes: {
              [req.body.wellName]: [req.body.quantity, req.body.price, false],
            },
          },
        }
      );
    }

    let well = await wellDetails
      .find({
        "properties.full_name": req.body.wellName,
      })
      .toArray();

    if ("stakes" in well[0]) {
      let wellStake = well[0].stakes;

      wellStake[req.body.email] = [req.body.quantity, req.body.price, false];

      let newWellStake = await wellDetails.findOneAndUpdate(
        { "properties.full_name": req.body.wellName },
        {
          $set: {
            stakes: wellStake,
          },
        }
      );
    } else {
      let wellStake = well[0];

      let newWellStake = await wellDetails.findOneAndUpdate(
        { "properties.full_name": req.body.wellName },
        {
          $set: {
            stakes: {
              [req.body.email]: [req.body.quantity, req.body.price, false],
            },
          },
        }
      );
    }
  }

  res.status(200).send("Fuck Yea!");
});

app.post("/sell", async (req, res) => {
  let userSeller = await users.find({ email: req.body.sellerEmail }).toArray();

  let userBuyer = await users.find({ email: req.body.buyerEmail }).toArray();

  let sellerStake = userSeller[0].stakes[req.body.wellName];

  let buyerStake = userBuyer[0].stakes[req.body.wellName];

  let diff = sellerStake[0] - buyerStake[0];

  if (sellerStake[2] === false) {
    res.status(200).send("You can not sell stake that you do not own.");
  } else if (diff < 0) {
    res.status(200).send("You can not sell more than your share.");
  } else {
    let buyerStakes = userBuyer[0].stakes;

    buyerStakes[req.body.wellName][2] = true;

    let newBuyerStake = await users.findOneAndUpdate(
      { email: req.body.buyerEmail },
      { $set: { stakes: buyerStakes } }
    );

    let sellerStakes = userSeller[0].stakes;

    sellerStakes[req.body.wellName][0] = diff;

    if (diff === 0) delete sellerStakes[req.body.wellName];

    let newSellerStake = await users.findOneAndUpdate(
      { email: req.body.sellerEmail },
      { $set: { stakes: sellerStakes } }
    );

    let well = await wellDetails
      .find({
        "properties.full_name": req.body.wellName,
      })
      .toArray();

    let wellStake = well[0].stakes;

    wellStake[req.body.buyerEmail][2] = true;
    wellStake[req.body.sellerEmail][0] = diff;

    if (diff === 0) delete wellStake[req.body.sellerEmail];

    let newWellStake = await wellDetails.findOneAndUpdate(
      { "properties.full_name": req.body.wellName },
      {
        $set: {
          stakes: wellStake,
        },
      }
    );

    res.status(200).send("Hell Yea!");
  }
});
