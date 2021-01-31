// import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Actor from "./actors/actor";
import Header from "./header/header";
import Popup from "./header/popup";
import SearchPage from "./search/searchPage";
import Top from "./top/top";
import { Route, Redirect, Switch } from "react-router-dom";
import Main from "./mainPage/main";
import FilterSearchPage from "./search/filterSearchPage";
import FilterSearchResult from "./search/filterSearchResult";

class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    items: {},
    fId: 326,
    isFilm: true,
  };
  clickHandler(prop) {
    this.setState({
      pageTitle: prop,
    });
  }

  componentDidMount() {
    fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff/66539`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // const actors = this.state.items.actors;
          this.setState({
            isLoaded: true,
            actors: result,
          });
        },

        (error) => {
          console.log("error");
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  updateInfo = (id, isFilm) => {
    this.setState({
      fId: id,
      isFilm: isFilm,
    });
  };

  showPopup(event) {
    let memState;
    const popup = document.querySelector(".popup-wrap");
    if (popup.style.display !== "flex" || event.target !== memState) {
      memState = event.target;
      popup.style.top = `${event.pageY + 5}px`;
      popup.style.left = `${event.pageX + 5}px`;
      popup.style.display = "flex";
    }
  }

  render() {
    const divStyle = {
      textAlign: "center",
    };

    return (
      <div style={divStyle}>
        <Popup kName={this.state.fId} kFilm={this.state.isFilm} />
        <Header showPopup={this.showPopup} />
        <div className="wrap">
          <Switch>
            <Route path="/" exact component={Main} />
            <Route
              path="/search/:keyword/:page"
              exact
              render={(props) => <SearchPage showPopup={this.showPopup} chang={this.updateInfo} {...props}></SearchPage>}
            />
            <Route path="/top/:type/:page" component={Top} />
            <Route path="/filtersearch" component={FilterSearchPage} exact />
            <Route path="/filterSearchResult" render={(props) => <FilterSearchResult {...props}></FilterSearchResult>} />
            <Route path="/actor" render={(props) => <Actor showPopup={this.showPopup} chang={this.updateInfo} {...props} />} />
            <Redirect from={"/search//1"} to={"/filtersearch"} />
          </Switch>

          {/* <Actor></Actor> */}
        </div>
      </div>
    );
  }
}

export default App;
