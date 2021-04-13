import React, { Component } from "react";
import axios from "axios";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";

const styles = {
  button: {
    width: "100%",
  },
  stakeCardHidden: {
    display: "none",
  },
  stakeCardVisible: {
    display: "flex",
    width: "100%",
  },
  card: {
    border: "thin solid #fff",
    display: "flex",
    width: "100%",
    "&:hover": {
      border: "thin solid #81d4fa",
    },
    // marginLeft: -100
    backgroundColor: "black",
  },
  content: {
    padding: 10,
    display: "flex",
    color: "white",

    // objectFit: 'cover'
  },
  stakeContent: {
    display: "flex",
    width: "100%",
  },
  stakeInfo: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  sellButton: {
    backgroundColor: "lightblue",
  },
};

class SellLogCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stakeKey: null,
      stakeValues: null,
      visible: false,
    };
  }

  handleClick = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
    console.log(this.state);
  };

  handleSell = () => {
    const sellData = {
      wellName: this.props.wellName,
      sellerEmail: this.props.seller,
      buyerEmail: this.props.stakeKey,
    };

    axios
      .post("http://localhost:9000/sell", sellData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { stakeKey, stakeValues, classes, seller, wellName } = this.props;

    let containerClass = this.state.visible
      ? classes.stakeCardVisible
      : classes.stakeCardHidden;

    if (this.props.stakeValues[2] === false) {
      return (
        <>
          <ButtonBase
            className={classes.button}
            disableTouchRipple
            onClick={this.handleClick}
          >
            <div className={classes.card}>
              <div className={classes.content}>
                <Typography variant="body2" style={{ marginRight: "0.25em" }}>
                  {stakeKey}
                </Typography>
                <Typography variant="body2" style={{ marginRight: "0.25em" }}>
                  {stakeValues[0]}
                </Typography>
                <Typography variant="body2" style={{ marginRight: "0.25em" }}>
                  {stakeValues[1]}
                </Typography>
              </div>
            </div>
          </ButtonBase>
          <Card className={containerClass}>
            <CardContent className={classes.stakeContent}>
              <div className={classes.stakeInfo}>
                <Button variant="contained" onClick={this.handleSell}>
                  sell
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(SellLogCard);
