import React from "react";
import { NavLink } from "react-router-dom";
import "./filmtable.css";

class FilmTable extends React.Component {
  constructor(props) {
    super();
    //this.id = props;
  }
  state = {
    isLoaded: false,
    error: null,
  };
  apiHandler(link) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${link}`, {
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
            staff: result,
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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        isLoaded: false,
        error: null,
      });
      this.apiHandler(this.props.id);
    }
  }
  componentDidMount() {
    this.apiHandler(this.props.id);
    //console.log(this.state);
  }
  personHandler(arr, proffession) {
    let arrlength = arr.concat().filter((person) => person.professionKey === proffession);
    arrlength.length = arrlength.length > 3 ? 3 : arrlength.length;
    //console.log(arrlength);
    return arrlength;
  }
  render() {
    const { error, isLoaded, staff } = this.state;
    const professions = [
      "DIRECTOR",
      "ACTOR",
      "PRODUCER",
      "WRITER",
      "OPERATOR",
      "EDITOR",
      "COMPOSER",
      "DESIGN",
      "PRODUCER_USSR",
      "TRANSLATOR",
      "VOICE_DIRECTOR",
      "UNKNOWN",
    ];
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
      return (
        <table className="aboutTable">
          <tr>
            <th>Год производства</th>
            <th>{this.props.film.year}</th>
          </tr>
          <tr>
            <th>Страна</th>
            <th>
              {this.props.film.countries.map((country) => (
                <p>{country.country}</p>
              ))}
            </th>
          </tr>
          <tr>
            <th>Жанр</th>
            <th>
              {this.props.film.genres.map((genre) => (
                <p>{genre.genre}</p>
              ))}
            </th>
          </tr>
          <tr>
            <th>Слоган</th>
            <th>{this.props.film.slogan}</th>
          </tr>
          <tr>
            <th>Режиссер</th>
            <th>
              {this.personHandler(staff, "DIRECTOR").map((person) => (
                <NavLink to={"/name/" + person.staffId}>
                  <p onMouseEnter={this.props.showPopup} onMouseOver={this.props.chang.bind(this, person.staffId, false)}>
                    {person.nameRu}
                  </p>
                </NavLink>
              ))}
            </th>
          </tr>
          <tr>
            <th>Сценарист</th>
            <th>
              {this.personHandler(staff, "WRITER").map((person) => (
                <NavLink to={"/name/" + person.staffId}>
                  <p onMouseEnter={this.props.showPopup} onMouseOver={this.props.chang.bind(this, person.staffId, false)}>
                    {person.nameRu}
                  </p>
                </NavLink>
              ))}
            </th>
          </tr>
          <tr>
            <th>Оператор</th>
            <th>
              {this.personHandler(staff, "OPERATOR").map((person) => (
                <NavLink to={"/name/" + person.staffId}>
                  <p onMouseEnter={this.props.showPopup} onMouseOver={this.props.chang.bind(this, person.staffId, false)}>
                    {person.nameRu}
                  </p>
                </NavLink>
              ))}
            </th>
          </tr>
          <tr>
            <th>Композитор</th>
            <th>
              {this.personHandler(staff, "COMPOSER").map((person) => (
                <NavLink to={"/name/" + person.staffId}>
                  <p onMouseEnter={this.props.showPopup} onMouseOver={this.props.chang.bind(this, person.staffId, false)}>
                    {person.nameRu}
                  </p>
                </NavLink>
              ))}
            </th>
          </tr>
          <tr>
            <th>Художник</th>
            <th>
              {this.personHandler(staff, "DESIGN").map((person) => (
                <NavLink to={"/name/" + person.staffId}>
                  <p onMouseEnter={this.props.showPopup} onMouseOver={this.props.chang.bind(this, person.staffId, false)}>
                    {person.nameRu}
                  </p>
                </NavLink>
              ))}
            </th>
          </tr>
          {this.props.film.budget ? (
            <tr>
              <th>Бюджет</th>
              <th>{this.props.film.budget}</th>
            </tr>
          ) : null}
          {this.props.film.grossUsa ? (
            <tr>
              <th>Сборы в США</th>
              <th>{this.props.film.grossUsa}</th>
            </tr>
          ) : null}
          {this.props.film.grossWorld ? (
            <tr>
              <th>Сборы в мире</th>
              <th>{this.props.film.grossWorld}</th>
            </tr>
          ) : null}
          <tr>
            <th>Премьера в мире</th>
            <th>{this.props.film.premiereWorld}</th>
          </tr>
          {this.props.film.ratingAgeLimits ? (
            <tr>
              <th>Возраст</th>
              <th>{this.props.film.ratingAgeLimits}</th>
            </tr>
          ) : null}
          {this.props.film.filmLength ? (
            <tr>
              <th>Время</th>
              <th>{this.props.film.filmLength}</th>
            </tr>
          ) : null}
        </table>
      );
    }
  }
}
export default FilmTable;
