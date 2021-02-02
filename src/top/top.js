import React from "react";
import { NavLink } from "react-router-dom";
import TopResult from "./topResult";
import "./top.css";

class Top extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoaded: false,
    result: null,
    page: 1,
    error: null,
    pagesArr: [],
  };
  componentDidMount() {
    this.apiHandler(this.props.match.params.type, this.props.match.params.page);
  }

  componentDidUpdate(prevState) {
    if (
      prevState.match.params.page !== this.props.match.params.page ||
      prevState.match.params.type !== this.props.match.params.type
    ) {
      this.apiHandler(this.props.match.params.type, this.props.match.params.page);
    }
  }

  apiHandler(type, page) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${type}&page=${page}`, {
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
            result: result.films,
            pages: result.pagesCount,
          });
          this.pagesArray(this.props.match.params.page);
          this.titleHandler(type);
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

  titleHandler(type) {
    let title = "";
    switch (type) {
      case "TOP_100_POPULAR_FILMS":
        title = "100 ПОПУЛЯРНЫХ";
        break;
      case "TOP_250_BEST_FILMS":
        title = "250 ЛУЧШИХ";
        break;
      case "TOP_AWAIT_FILMS":
        title = "ОЖИДАЕМЫХ";
        break;
    }
    this.setState({
      title: title,
    });
  }

  pagesArray(page) {
    const pages = parseInt(page);
    console.log(page);
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
      document.title = `ТOП ${this.state.title} ФИЛЬМОВ - ТипоКинопоиск`;
      return (
        <div className="top-page-field">
          <div className="top-page-title">{`ТОП ${this.state.title} ФИЛЬМОВ`}</div>
          {this.state.result.map((film) => {
            return (
              <div>
                <TopResult
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
          <div className={"top-page-wrap"}>
            {this.state.pagesArr.map((num) => {
              if (num != "...") {
                return (
                  <NavLink className="top-page-pages" to={`/top/${this.props.match.params.type}/${num}`}>
                    {num}
                  </NavLink>
                );
              } else {
                return <p className="top-page-pages">{num}</p>;
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

export default Top;
