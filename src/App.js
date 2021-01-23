//import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import Car from "./car/car";
import Actor from "./actors/actor";
import Films from "./films/films";

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
      </div>
    );
  }
}

export default App;
