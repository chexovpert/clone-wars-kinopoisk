//import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Actor from "./actors/actor";
import Films from "./films/films";
import CastPage from "./castPage/castPage";
import Moviebot from "./moviebot/moviebot";
import Pagestory from "./pagestory/pagestory";
import ScrollTop from "./scrollbutton/scrollbutton";
import Header from "./header/header";
import Popup from "./header/popup";
import SearchPage from "./search/searchPage";
import Top from "./top/top";
import { Route, Redirect, Switch } from "react-router-dom";
import Main from "./mainPage/main";
import FilterSearchPage from "./search/filterSearchPage";
import FilterSearchResult from "./search/filterSearchResult";
import Footer from "./footer/footer";

class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    items: {},
  };

  clickHandler(prop) {
    this.setState({
      pageTitle: prop,
    });
  }

  updateInfo = (id, isFilm) => {
    this.setState({
      fId: id,
      isFilm: isFilm,
    });
  };

  showPopup(event) {
    let memState;
    const popup = document.getElementById("popup-wrap");
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
      <div style={divStyle} className="bigWrap">
        <Popup kName={this.state.fId} kFilm={this.state.isFilm} />
        <Header />
        <div className="wrap">
          <Route
            path={"/name/:id"}
            exact
            render={(props) => <Actor showPopup={this.showPopup} chang={this.updateInfo} {...props}></Actor>}
          />
          <Route
            path={"/film/:id"}
            exact
            render={(props) => <Films showPopup={this.showPopup} chang={this.updateInfo} {...props}></Films>}
          />
          <Route
            path={"/film/:id/staff"}
            exact
            render={(props) => <CastPage showPopup={this.showPopup} chang={this.updateInfo} {...props}></CastPage>}
          />
          <Moviebot></Moviebot>
          <ScrollTop></ScrollTop>
          <Route path="/" exact render={(props) => <Main {...props} />} />
          <Route path="/search/:keyword/:page" exact render={(props) => <SearchPage {...props}></SearchPage>} />
          <Route path="/top/:type/:page" component={Top} />
          <Route path="/filtersearch" component={FilterSearchPage} exact />
          <Route path="/filterSearchResult" render={(props) => <FilterSearchResult {...props}></FilterSearchResult>} />
          {/* <Redirect from={"/search//1"} to={"/filtersearch"} /> */}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
