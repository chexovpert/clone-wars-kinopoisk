//import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Actor from "./actors/actor";
import Films from "./films/films";
import CastPage from "./castPage/castPage";
import Moviebot from "./moviebot/moviebot";
//import Pagestory from "./pagestory/pagestory";
import ScrollTop from "./scrollbutton/scrollbutton";
import Header from "./header/header";
import Popup from "./header/popup";
import SearchPage from "./search/searchPage";
import Top from "./top/top";
import { Route, Redirect, Switch, HashRouter } from "react-router-dom";
import Main from "./mainPage/main";
import FilterSearchPage from "./search/filterSearchPage";
import FilterSearchResult from "./search/filterSearchResult";
import Footer from "./footer/footer";
import Page404 from "./page404/404";

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
      <HashRouter basename="/">
        <div style={divStyle} className="bigWrap">
          <Popup kName={this.state.fId} kFilm={this.state.isFilm} />
          <Header />
          <Moviebot></Moviebot>
          <ScrollTop></ScrollTop>

          <div className="wrap">
            <Switch>
              <Route path="/" exact render={(props) => <Main {...props} />} />
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

              <Route path="/search/:keyword/:page" exact render={(props) => <SearchPage {...props}></SearchPage>} />
              <Route path="/top/:type/:page" exact component={Top} />
              <Route path="/filtersearch" exact component={FilterSearchPage} exact />
              <Route path="/filterSearchResult" exact render={(props) => <FilterSearchResult {...props}></FilterSearchResult>} />
              <Route render={() => <Page404 />} />
              <Redirect to={"/404"} />
            </Switch>
          </div>

          <Footer></Footer>
        </div>
      </HashRouter>
    );
  }
}

export default App;
