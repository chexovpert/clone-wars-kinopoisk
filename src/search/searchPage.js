import React from "react";
import "./searchPage.css";
import SearchPageResult from "./searchPageResult";
import { Link, NavLink } from "react-router-dom";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.showPopup = props.showPopup;
    this.chang = props.chang;
  }

  state = {
    films: [],
    isLoaded: false,
    error: null,
    searchPageState: "",
    pagesArr: [],
  };

  apiHandler(keyword) {
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${this.props.match.params.page}`,
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
          this.setState({
            isLoaded: true,
            films: result.films,
            pages: result.pagesCount,
          });
          this.pagesArray(this.props.match.params.page);
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

  componentDidMount = () => {
    this.apiHandler(this.props.match.params.keyword);
  };

  componentDidUpdate = (prevId) => {
    if (
      prevId.match.params.keyword !== this.props.match.params.keyword ||
      prevId.match.params.page !== this.props.match.params.page
    ) {
      this.apiHandler(this.props.match.params.keyword);
    }
  };

  searchHandler = (event) => {
    this.setState({
      searchPageState: event.target.value,
    });
  };

  pagesArray(page) {
    const pages = parseInt(page);
    if (this.state.pages > 20) {
      this.setState({
        pages: 20,
      });
    }
    let array = [],
      pagesArr = [];
    for (let i = 1; i <= pages; i++) {
      array.push(i);
    }
    if (this.state.pages < 6) {
      const memArr = [
        `${this.state.pages - 4}`,
        `${this.state.pages - 3}`,
        `${this.state.pages - 2}`,
        `${this.state.pages - 1}`,
        `${this.state.pages}`,
      ];
      pagesArr = memArr.filter((elem) => elem > 0);
    } else {
      if (pages < 4) {
        pagesArr = ["1", "2", "3", "4", "5", "...", `${this.state.pages}`];
      } else {
        if (pages <= this.state.pages && pages > this.state.pages - 4) {
          pagesArr = [
            "1",
            "...",
            `${this.state.pages - 4}`,
            `${this.state.pages - 3}`,
            `${this.state.pages - 2}`,
            `${this.state.pages - 1}`,
            `${this.state.pages}`,
          ];
        } else {
          pagesArr = [
            "1",
            "...",
            `${pages - 2}`,
            `${pages - 1}`,
            `${pages}`,
            `${pages + 1}`,
            `${pages + 2}`,
            "...",
            `${this.state.pages}`,
          ];
        }
      }
    }
    this.setState({
      pagesArr: pagesArr,
    });
  }

  render() {
    return (
      <div className="search-page-field">
        <form>
          <input
            type="text"
            placeholder={`Введите название фильма`}
            className="searchpage-input"
            onChange={this.searchHandler}
            value={this.state.searchPageState}
          ></input>
          <Link to={`/search/${this.state.searchPageState}/1`}>
            <button>{"Search"}</button>
          </Link>
        </form>
        <div className="search-page-result">
          <p>{`Результаты поиска по запросу ${this.props.match.params.keyword}`}</p>
          {this.state.films.map((film) => {
            return (
              <SearchPageResult
                key={film.filmId}
                fId={film.filmId}
                nameRu={film.nameRu}
                nameEn={film.nameEn}
                rating={film.rating}
                posterUrl={film.posterUrl}
                year={film.year}
                genre={film.genres}
                country={film.countries}
                time={film.filmLength}
              />
            );
          })}
        </div>
        <div className={"seachpage-pages-wrap"}>
          {this.state.pagesArr.map((num) => {
            if (num != "...") {
              return (
                <NavLink className="searchpage-pages" to={`/search/${this.props.match.params.keyword}/${num}`}>
                  {num}
                </NavLink>
              );
            } else {
              return <p className="searchpage-pages">{num}</p>;
            }
          })}
        </div>
      </div>
    );
  }
}

export default SearchPage;
