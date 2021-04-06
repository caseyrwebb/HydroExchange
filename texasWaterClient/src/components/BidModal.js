import React, { Component, useState } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BidForm from "./BidForm";

const useStyles = makeStyles({
  toggleButton: {
    height: "20px",
    marginBottom: "40px",
    marginTop: "20px",
  },
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
});

function BidModal({ visible, well }) {
  const [toggle, setToggle] = useState("bid");
  const classes = useStyles();

  const handleToggle = (event, newToggle) => {
    setToggle(newToggle);
  };

  if (visible === true)
    return (
      <>
        <div className={classes.container}>
          <ToggleButtonGroup
            value={toggle}
            exclusive
            onChange={handleToggle}
            className={classes.toggleButton}
          >
            <ToggleButton value="bid">
              <p>Bid</p>
            </ToggleButton>
            <ToggleButton value="sell">
              <p>Sell</p>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <BidForm toggle={toggle} well={well} />
      </>
    );
  return null;
}

export default BidModal;
