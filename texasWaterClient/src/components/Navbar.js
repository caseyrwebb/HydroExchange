import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "react-router-dom/Link";
import { useDispatch } from "react-redux";
// import { loginUser } from "../redux/actions";

import ButtonBase from "@material-ui/core/ButtonBase";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { GiWaterDrop } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#000",
      main: "#000",
      dark: "#000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#b6ffff",
      main: "#81d4fa",
      dark: "#4ba3c7",
      contrastText: "#fff",
    },
  },
});

function Navbar() {
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <ButtonBase component={Link} to="/" disableTouchRipple>
                <h1 style={{ fontWeight: 200, color: "lightblue" }}>Hydro</h1>
                <h1 style={{ fontWeight: 200, fontStyle: "italic" }}>
                  Exchange
                </h1>
              </ButtonBase>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "70px",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GiWaterDrop style={{ fontSize: "20px" }} />
                <p style={{ lineHeight: "0%" }}>20,340,397 AF</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaCoins style={{ fontSize: "20px" }} />
                <p style={{ lineHeight: "0%" }}>45,569,027 Aqua</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ButtonBase
                onClick={() => console.log("dispatch(loginUser())")}
                disableTouchRipple
              >
                <VscAccount style={{ fontSize: "30px" }} />
              </ButtonBase>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
