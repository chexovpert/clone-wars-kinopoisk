import React from "react";
import FilterResult from "./filterResult";

class FilterSearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    films: [],
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
          // console.log(result);
          this.setState({
            isLoaded: true,
            films: result.films,
            pages: result.pagesCount,
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

  componentDidMount = () => {
    this.apiHandler(this.props.location.search);
  };

  componentDidUpdate = (prevId) => {
    if (
      prevId.match.params.keyword !== this.props.match.params.keyword ||
      prevId.match.params.page !== this.props.match.params.page
    ) {
      this.apiHandler(this.props.match.params.keyword);
    }
  };

  render() {
    console.log(this.state.films);
    return (
      <div className="search-page-result">
        <p>{`Результаты поиска по запросу`}</p>
        {this.state.films.map((film) => {
          return (
            <FilterResult
              key={film.filmId}
              fId={film.filmId}
              nameRu={film.nameRu}
              nameEn={film.nameEn}
              rating={film.rating}
              posterUrl={film.posterUrl}
              // showPopup={this.showPopup}
              // chang={this.chang}
            />
          );
        })}
      </div>
    );
  }
}

export default FilterSearchResult;
