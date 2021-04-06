import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import BidModal from "./components/BidModal";
import { useSelector } from "react-redux";

export default function App() {
  const user = useSelector((state) => state.user.loading);
  const bidVisible = useSelector((state) => state.bidModal);

  let containerStyle = bidVisible
    ? "container-visible"
    : "container-not-visible";

  if (user === false)
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="container-not-visible">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/account" component={Account} />
            </Switch>
          </div>
        </Router>
      </div>
    );

  return (
    <div className="container">
      <Welcome />
    </div>
  );
}
