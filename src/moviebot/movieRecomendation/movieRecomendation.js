import React from "react";
//import "./casttable.css";
import { NavLink } from "react-router-dom";
class CastTable extends React.Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { recomendationList } = steps;

    this.state = { recomendationList };
  }
  state = {
    isLoaded: false,
    error: null,
  };
  apiHandler(link) {
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${link}&order=RATING&type=FILM&ratingFrom=8&ratingTo=10&yearFrom=1888&yearTo=2020&page=1`,
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
            movielist: result,
          });
          //console.log(this.state);
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
  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevState.id !== this.state.recomendationList.value) {
  //       this.setState({
  //         isLoaded: false,
  //         error: null,
  //       });
  //       this.apiHandler(this.state.recomendationList.value);
  //     }
  //   }
  componentDidMount() {
    this.apiHandler(this.state.recomendationList.value);
  }
  render() {
    const { error, isLoaded, movielist } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>
          Загрузка...
          <img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.gif" />
        </div>
      );
    } else {
      //console.log(movielist);

      let randomnum =
        Math.floor(Math.random() * (movielist.films.length - 1 - 0 + 1)) + 0;
      let movie = movielist.films[randomnum];
      console.log(movie);
      //actorArray.length = actorArray.length > 10 ? 10 : actorArray.length;
      return (
        <div className="staffList">
          <img
            src={movie.posterUrl}
            alt={movie.nameRu}
            className="actor_table_img"
          ></img>
          <NavLink to={"/film/" + movie.filmId} exact>
            <p>{movie.nameRu}</p>
          </NavLink>
          <p>{movie.nameEn}</p>
          <p>{movie.rating}</p>
        </div>
      );
    }
  }
}
export default CastTable;
