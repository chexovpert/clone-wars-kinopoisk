import React from "react";
import TopResult from "./topResult";

class Top extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoaded: false,
    result: null,
    page: 1,
    error: null,
  };
  componentDidMount() {
    this.apiHandler(this.props.match.params.type, this.props.match.params.page);
  }

  componentDidUpdate(prevState) {
    console.log(prevState.page);
    if (prevState.page !== this.props.match.params.page || prevState.type !== this.props.match.params.type) {
      // this.apiHandler(this.props.match.params.type, this.props.match.params.page);
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

  render() {
    console.log(this.state.result);
    return (
      <div className="search-page-result">
        <p>{`Результаты поиска по запросу`}</p>
        {/* {this.state.result.films.map((film) => {
          return (
            <TopResult
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
        })} */}
      </div>
    );
  }
}

export default Top;
