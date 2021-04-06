import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/actions";

function AuthButton({ className, email, password }) {
  const dispatch = useDispatch();

  // let handleSubmit = () => {
  //   const userData = {
  //     email: email,
  //     password: password,
  //   };
  //   axios
  //     .post("http://localhost:4000/api/auth/", userData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   dispatch(loginUser());
  // };

  let handleSubmit = () => {
    const userData = {
      email: email,
      password: password,
    };

    dispatch(getUser(userData));
  };

  return (
    <Button
      onClick={() => handleSubmit()}
      variant="contained"
      className={className}
    >
      submit
    </Button>
  );
}

export default AuthButton;
