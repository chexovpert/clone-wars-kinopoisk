import React from "react";
import "./search.css";
import Searchresult from "./searchresult";

class Search extends React.Component {
  state = {
    searchState: " ",
    films: [],
  };

  searchHandler = (event) => {
    console.log(event.target.value);
    if (event.target.value.length > 1) {
      this.setState({
        searchState: event.target.value,
      });
      setTimeout(1000);
      fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${this.state.searchState}&page=1`,
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
            console.log(this.state.films);
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            console.log("error");
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
  };

  searchResultHandler() {
    const srscreen = document.querySelector(".search-result"),
      body = document.querySelector(".actorWrap"); //поменять на другой див
    srscreen.style.display = "block";
    body.addEventListener("click", () => {
      if (srscreen.style.display == "block") {
        srscreen.style.display = "none";
      }
    });
  }

  render() {
    return (
      <div className="search-field">
        <input
          type="text"
          placeholder="Введите запрос"
          className="search-input"
          onChange={this.searchHandler}
          onFocus={this.searchResultHandler}
        ></input>
        {/* <button className="search-button">search</button> */}
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
          <p>{`Посмотреть все совпадения`}</p>
        </div>
      </div>
    );
  }
}

export default Search;
