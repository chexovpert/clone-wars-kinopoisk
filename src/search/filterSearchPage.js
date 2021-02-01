import React from "react";
import "./filterSearchPage.css";
// import SearchPageResult from "./searchPageResult";
import { Link, NavLink } from "react-router-dom";
import filters from "./filter";

class FilterSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.showPopup = props.showPopup;
    this.chang = props.chang;
  }

  state = {
    films: [],
    isLoaded: false,
    error: null,
    filterRequest: "",
    country: 0,
    genre: 0,
    sortbyprops: 0,
    sortbytype: 0,
    yearfrom: 1888,
    yearto: 2021,
    ratingfrom: 0,
    ratingto: 10,
  };

  requestFormer = () => {
    let rqst = [];
    this.state.country !== 0 ? rqst.push(`country=${this.state.country}`) : rqst.push();
    this.state.genre === 0 ? rqst.push() : rqst.push(`genre=${this.state.genre}`);
    this.state.sortbyprops === 0 ? rqst.push(`order=RATING`) : rqst.push(`order=${this.state.sortbyprops}`);
    this.state.sortbytype === 0 ? rqst.push(`type=ALL`) : rqst.push(`type=${this.state.sortbytype}`);
    this.state.ratingfrom === 0 ? rqst.push() : rqst.push(`ratingFrom=${this.state.ratingfrom}`);
    this.state.ratingto === 10 ? rqst.push() : rqst.push(`ratingTo=${this.state.ratingto}`);
    this.state.yearfrom === 1888 ? rqst.push() : rqst.push(`yearFrom=${this.state.yearfrom}`);
    this.state.yearto === 2021 ? rqst.push() : rqst.push(`yearTo=${this.state.yearto}`);
    const reqst = rqst.join("&");
    this.setState({
      filterRequest: reqst,
    });
  };

  render() {
    document.title = "Поиск по параметрам - Типокинопоиск";
    return (
      <div className={"filtersearch-container"}>
        <div className="filtersearch-wrap">
          <div className="filtersearch-title">
            <h1>Поиск фильмов по параметрам</h1>
            <p>Укажите желаемые значения для поиска</p>
          </div>
          <form
            className="filtersearch-form"
            onChange={(event) => {
              this.setState({
                genre: event.target.value,
              });
            }}
          >
            <label>{"Жанр "}</label>
            <select>
              {filters.genres.map((genre) => {
                return <option value={genre.id}>{genre.genre}</option>;
              })}
            </select>
          </form>
          <form
            className="filtersearch-form"
            onChange={(event) => {
              this.setState({
                country: event.target.value,
              });
            }}
          >
            <label>{"Страна "}</label>
            <select>
              {filters.countries.map((country) => {
                return <option value={country.id}>{country.country}</option>;
              })}
            </select>
          </form>
          <form
            className="filtersearch-form"
            onChange={(event) => {
              this.setState({
                sortbyprops: event.target.value,
              });
            }}
          >
            <label>{"Сортировать по: "}</label>
            <select>
              <option value={0} disabled="true">
                {"Выберите..."}
              </option>
              <option value={"RATING"}>{"По рейтингу"}</option>
              <option value={"NUM_VOTE"}>{"По количеству оценок"}</option>
              <option value={"YEAR"}>{"По году"}</option>
            </select>
          </form>
          <form
            className="filtersearch-form"
            onChange={(event) => {
              this.setState({
                sortbytype: event.target.value,
              });
            }}
          >
            <label>{"Выберите тип: "}</label>
            <select>
              <option value={0} disabled="true">
                {"Выберите..."}
              </option>
              <option value={"FILM"}>{"Фильмы"}</option>
              <option value={"TV_SHOW"}>{"Сериалы"}</option>
              <option value={"ALL"}>{"Фильмы и сериалы"}</option>
            </select>
          </form>
          <form className="filtersearch-form">
            <label>{"Года   "}</label>
            <select
              onChange={(event) => {
                this.setState({
                  yearfrom: event.target.value,
                });
              }}
            >
              {Array(134)
                .fill(0)
                .map((e, i) => i + 1888)
                .map((year) => {
                  {
                    return <option value={year}>{year}</option>;
                  }
                })}
            </select>
            <label>{" по "}</label>
            <select
              onChange={(event) => {
                this.setState({
                  yearfrom: event.target.value,
                });
              }}
            >
              {Array(134)
                .fill(0)
                .map((e, i) => i + 1888)
                .reverse()
                .map((year) => {
                  {
                    return <option value={year}>{year}</option>;
                  }
                })}
            </select>
          </form>

          <form className="filtersearch-form">
            <label>{"Рейтинг     "}</label>
            <select
              onChange={(event) => {
                this.setState({
                  ratingfrom: event.target.value,
                });
              }}
            >
              {Array(11)
                .fill(0)
                .map((e, i) => i)
                .map((rating) => {
                  {
                    return <option value={rating}>{`${rating}.0`}</option>;
                  }
                })}
            </select>
            <label>{" по "}</label>
            <select
              onChange={(event) => {
                this.setState({
                  ratingto: event.target.value,
                });
              }}
            >
              {Array(11)
                .fill(0)
                .map((e, i) => i)
                .map((rating) => {
                  {
                    return <option value={rating}>{`${rating}.0`}</option>;
                  }
                })}
            </select>
          </form>

          <Link
            to={{
              pathname: "/filterSearchResult",
              search: `?${this.state.filterRequest}&page=1`,
            }}
          >
            <button className="filtersearch-button" onMouseOver={this.requestFormer}>
              {"Искать фильмы"}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FilterSearchPage;
