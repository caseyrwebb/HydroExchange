import React, { Component, useState } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SellLogCard from "./SellLogCard";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
  },
});

function BidForm({ well, toggle }) {
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user.email);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const handleBid = () => {
    const stakeData = quantity
      ? {
          email: user,
          wellName: well.properties.full_name,
          quantity: quantity,
          price: price,
        }
      : null;

    axios
      .post("http://localhost:9000/stake", stakeData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SellMarkup = well.stakes
    ? Object.entries(well.stakes).map(([key, value]) => {
        return (
          <SellLogCard
            stakeKey={key}
            stakeValues={value}
            seller={user}
            wellName={well.properties.full_name}
          />
        );
      })
    : null;

  if (toggle === "bid")
    return (
      <div className={classes.container}>
        <h2>{well.properties.full_name}</h2>
        <p>{well.properties.conservation_storage.toLocaleString()} AF</p>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "40px" }}
        >
          <p style={{ lineHeight: "10px", marginLeft: "10px" }}>Bid on: </p>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            min="1"
            max={well.properties.conservation_storage}
            style={{
              width: "200px",
              marginLeft: "10px",
              borderRadius: "16px",
              outline: "none",
            }}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "40px" }}
        >
          <p style={{ lineHeight: "10px", marginLeft: "10px" }}>$/AF: </p>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            min="1"
            style={{
              width: "200px",
              marginLeft: "17px",
              borderRadius: "16px",
              outline: "none",
            }}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <h2 style={{ marginTop: "40px" }}>
          {formatter.format(price * quantity)}
        </h2>
        <button style={{ marginTop: "40px" }} onClick={handleBid()}>
          Submit
        </button>
      </div>
    );

  return <div className={classes.container}>{SellMarkup}</div>;
}

export default BidForm;
