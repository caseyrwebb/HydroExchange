import React, { Component } from "react";
import axios from "axios";
import AuthButton from "../components/AuthButton";
import Link from "react-router-dom/Link";

//MUI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions";

const styles = {
  form: {
    textAlign: "center",
    // backgroundColor: 'white'
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    const newUserData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:4000/api/users/", newUserData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    event.target.reset();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />

            <Button
              className={classes.button}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
            <br />
            <small>
              Already have an account? <Link to="/">Login</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

export default withStyles(styles)(Signup);
