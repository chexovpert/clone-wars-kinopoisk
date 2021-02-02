import React from "react";
import { Link, NavLink, withRouter, Redirect } from "react-router-dom";
import "./search.css";
import Searchresult from "./searchresult";

class Search extends React.Component {
  state = {
    searchState: "random",
    films: [],
    showResult: false,
  };

  apiHandler(searchState) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchState}&page=1`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let filmsArray = result.films;
          filmsArray.length = 5;
          this.setState({
            films: filmsArray,
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

  searchHandler = (event) => {
    if (event.target.value.length > 1) {
      this.setState({
        searchState: event.target.value,
      });
      this.searchResultHandler();
    } else {
      this.searchResultHandler("a");
    }
  };

  componentDidMount() {
    if (this.state.searchState != "") this.apiHandler(this.state.searchState);
  }

  componentDidUpdate(prevId, prevState) {
    if (this.state.searchState !== prevState.searchState) {
      this.apiHandler(this.state.searchState);
    }
  }

  searchResultHandler = (a) => {
    const srscreen = document.querySelector(".search-result"),
      body = document.querySelector(".wrap");
    srscreen.style.display = "block";
    body.addEventListener("click", () => {
      if (srscreen.style.display == "block") {
        srscreen.style.display = "none";
      }
    });
    if (a == "a") {
      srscreen.style.display = "none";
    }
  };

  render() {
    if (this.state.error) {
      this.setState({
        error: null,
      });
      return <Redirect to="/404" />;
    }
    return (
      <div className="search-field">
        <form className={"search-form"}>
          <input type="text" placeholder="  Введите запрос" className="search-input" onChange={this.searchHandler}></input>
          <Link to={"/filtersearch"} onClick={this.searchResultHandler.bind(this, "a")}>
            <button className="search-button" id="filter" title="Расширенный поиск">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                viewBox="0 0 24 24"
                fill="black"
                width="24px"
                height="24px"
              >
                <g>
                  <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                  <path d="M7,9H2V7h5V9z M7,12H2v2h5V12z M20.59,19l-3.83-3.83C15.96,15.69,15.02,16,14,16c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 c0,1.02-0.31,1.96-0.83,2.75L22,17.59L20.59,19z M17,11c0-1.65-1.35-3-3-3s-3,1.35-3,3s1.35,3,3,3S17,12.65,17,11z M2,19h10v-2H2 V19z" />
                </g>
              </svg>
            </button>
          </Link>
          <Link to={`/search/${this.state.searchState}/1`} onClick={this.searchResultHandler.bind(this, "a")}>
            <button className="search-button">Поиск </button>
          </Link>
        </form>
        <div className="search-result">
          <p>{`Результаты поиска по запросу ${this.state.searchState}`}</p>
          {this.state.films.map((film) => {
            return (
              <NavLink className={"NavLink"} to={"/film/" + film.filmId}>
                <Searchresult
                  key={film.filmId}
                  nameRu={film.nameRu}
                  nameEn={film.nameEn}
                  rating={film.rating}
                  posterUrl={film.posterUrl}
                  year={film.year}
                  genre={film.genres}
                />
              </NavLink>
            );
          })}

          <NavLink
            className={"NavLink"}
            to={`/search/${this.state.searchState}/1`}
            onClick={this.searchResultHandler.bind(this, "a")}
          >{`Посмотреть все совпадения`}</NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
