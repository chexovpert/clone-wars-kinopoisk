import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import "./search.css";
import Searchresult from "./searchresult";

class Search extends React.Component {
  state = {
    searchState: "",
    films: [],
  };

  apiHandler(searchState) {
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchState}&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8",
        },
      }
    )
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

  searchResultHandler(a) {
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
  }

  render() {
    return (
      <div className="search-field">
        <form className={"search-form"}>
          <input
            type="text"
            placeholder="Введите запрос"
            className="search-input"
            onChange={this.searchHandler}
            onFocus={this.searchResultHandler}
          ></input>
          <Link to={`/search/${this.state.searchState}/1`}>
            <button className="search-button">search</button>
          </Link>
        </form>
        <div className="search-result">
          <p>{`Результаты поиска по запросу ${this.state.searchState}`}</p>
          {this.state.films.map((film) => {
            return (
              <Searchresult
                key={film.filmID}
                nameRu={film.nameRu}
                nameEn={film.nameEn}
                rating={film.rating}
                posterUrl={film.posterUrl}
              />
            );
          })}

          <NavLink
            to={{
              pathname: `/search/${this.state.searchState}/1`,
              // search: "?test=1",
            }}
            onClick={this.searchResultHandler.bind(this, "a")}
          >{`Посмотреть все совпадения`}</NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
