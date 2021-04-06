import React, { Component } from "react";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

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

  render() {
    const { stakeKey, stakeValues, classes } = this.props;

    let containerClass = this.state.visible
      ? classes.stakeCardVisible
      : classes.stakeCardHidden;

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
              <p>sell</p>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(SellLogCard);
