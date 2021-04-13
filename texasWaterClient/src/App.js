import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import BidModal from "./components/BidModal";
import { useSelector } from "react-redux";

export default function App() {
  const [token, setToken] = useState(false);
  const user = useSelector((state) => state.user.loading);
  const bidVisible = useSelector((state) => state.bidModal);

  // let auth = localStorage.Token;
  //
  // let token = auth ? jwtDecode(auth) : null;

  let containerStyle = bidVisible
    ? "container-visible"
    : "container-not-visible";

  useEffect(() => {
    if (localStorage.Token) {
      setToken(true);
    } else setToken(false);
  });

  if (token)
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
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}
