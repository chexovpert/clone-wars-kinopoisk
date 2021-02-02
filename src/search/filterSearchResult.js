import React from "react";
import { NavLink } from "react-router-dom";
import FilterResult from "./filterResult";
import "./filterSearchResult.css";

class FilterSearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    films: [],
    pagesArr: [],
  };

  apiHandler(keyword) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters${keyword}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            films: result.films,
            pages: result.pagesCount,
          });
          this.pagesArray(this.props.location.search.slice(-1));
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
    this.apiHandler(this.props.location.search);
  };

  componentDidUpdate = (prevId) => {
    if (prevId.location.search !== this.props.location.search) {
      this.apiHandler(this.props.location.search);
    }
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
    if (this.state.isLoaded) {
      // console.log(this.state.pagesArr);
      return (
        <div className="filter-search-page-result">
          <div className="filter-search-page-title">{`Результаты поиска по параметрам`}</div>
          {this.state.films.map((film) => {
            return (
              <div>
                <FilterResult
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
                <hr />
              </div>
            );
          })}
          <div className={"filter-search-page-wrap"}>
            {this.state.pagesArr.map((num) => {
              if (num != "...") {
                return (
                  <NavLink
                    className="filter-search-page-pages"
                    to={{
                      pathname: "/filterSearchResult",
                      search: `${this.props.location.search.slice(0, -1)}${num}`,
                    }}
                  >
                    {num}
                  </NavLink>
                );
              } else {
                return <p className="filter-search-page-pages">{num}</p>;
              }
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Загрузка...
          <img alt="loadinggif" src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.gif" />
        </div>
      );
    }
  }
}

export default FilterSearchResult;
