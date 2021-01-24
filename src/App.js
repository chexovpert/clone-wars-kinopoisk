//import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import React, { Component } from "react";
//import Car from "./car/car";
import Actor from "./actors/actor";
import Films from "./films/films";
import CastPage from "./castPage/castPage";

class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    items: {},
    //id: 37859,
  };
  clickHandler(prop) {
    this.setState({
      pageTitle: prop,
    });
  }

  render() {
    const divStyle = {
      textAlign: "center",
    };
    return (
      <div style={divStyle}>
        <Route
          path={"/name/:id"}
          exact
          render={(props) => <Actor {...props}></Actor>}
        />
        <Route
          path={"/film/:id"}
          exact
          render={(props) => <Films {...props}></Films>}
        />
        <Route
          path={"/film/:id/staff"}
          exact
          render={(props) => <CastPage {...props}></CastPage>}
        />
      </div>
    );
  }
}

export default App;
