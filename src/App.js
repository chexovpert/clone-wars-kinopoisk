//import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import Car from "./car/car";
import Actor from "./actors/actor";

class App extends Component {
  state = {
    cars: [
      { name: "mazda", year: 1997 },
      { name: "audi", year: 1997 },
      { name: "ferrari", year: 1997 },
    ],
    pageTitle: "Title",
    showCars: false,
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
  toggleCars() {
    this.setState({
      showCars: !this.state.showCars,
    });
  }
  idHandler(id) {
    this.setState({
      id: id,
    });
  }
  render() {
    const divStyle = {
      textAlign: "center",
    };
    let cars = null;
    const { error, isLoaded, items } = this.state;
    return (
      <div style={divStyle}>
        <Route
          path={"/name/:id"}
          exact
          render={(props) => (
            <Actor
              // id={this.state.id}
              // handler={this.idHandler.bind(this)}
              {...props}
            ></Actor>
          )}
        />
      </div>
    );
  }
}

export default App;
