import React, { Component } from "react";
import { useSelector } from "react-redux";

function Account() {
  const user = useSelector((state) => state.user.user.email);
  return <p>{user}</p>;
}

export default Account;
