import React from "react";
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
          console.log(this.state);
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
  componentDidUpdate(prevProps, prevState) {
    // only update if not match I don't know what's your data is so add a
    // simple check like we use for strings.
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
    console.log(this.state);
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
    //console.log(this.props.film);
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
      // const staffarray = professions.map((elem) =>
      //   staff.slice().filter((person) => person.professionKey === elem)
      // );
      // return staffarray.map((profession) =>
      //   profession.length ? <div className={profession}></div> : null
      // );
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
              {staff.map((person) =>
                person.professionKey === "DIRECTOR" ? (
                  <p>{person.nameRu}</p>
                ) : null
              )}
            </th>
          </tr>
          <tr>
            <th>Сценарист</th>
            <th>
              {staff.map((person) =>
                person.professionKey === "WRITER" ? (
                  <p>{person.nameRu}</p>
                ) : null
              )}
            </th>
          </tr>
          <tr>
            <th>Оператор</th>
            <th>
              {staff.map((person) =>
                person.professionKey === "OPERATOR" ? (
                  <p>{person.nameRu}</p>
                ) : null
              )}
            </th>
          </tr>
          <tr>
            <th>Композитор</th>
            <th>
              {staff.map((person) =>
                person.professionKey === "COMPOSER" ? (
                  <p>{person.nameRu}</p>
                ) : null
              )}
            </th>
          </tr>
          <tr>
            <th>Художник</th>
            <th>
              {staff.map((person) =>
                person.professionKey === "DESIGN" ? (
                  <p>{person.nameRu}</p>
                ) : null
              )}
            </th>
          </tr>
          <tr>
            <th>Бюджет</th>
            <th>${this.props.film.budget}</th>
          </tr>
          <tr>
            <th>Сборы в США</th>
            <th>${this.props.film.grossUsa}</th>
          </tr>
          <tr>
            <th>Сборы в мире</th>
            <th>${this.props.film.grossWorld}</th>
          </tr>
          <tr>
            <th>Премьера в мире</th>
            <th>${this.props.film.premiereWorld}</th>
          </tr>
          <tr>
            <th>Возраст</th>
            <th>${this.props.film.ratingAgeLimits}</th>
          </tr>
          <tr>
            <th>Время</th>
            <th>${this.props.film.filmLength}</th>
          </tr>
        </table>
      );
    }
  }
}
export default FilmTable;
//export default (props) => (
//   <table className="aboutTable">
//     <tr>
//       <th>Карьера</th>
//       <th>{props.actors.profession}</th>
//     </tr>
//     <tr>
//       <th>Рост</th>
//       <th>{props.actors.growth} см</th>
//     </tr>
//     <tr>
//       <th>Дата рождения</th>
//       <th>
//         {props.actors.birthday}, {props.actors.age} лет
//       </th>
//     </tr>
//     <tr>
//       <th>Место рождения</th>
//       <th>{props.actors.birthplace}</th>
//     </tr>
//     <tr>
//       <th>Жанры</th> <th></th>
//     </tr>
//     <tr>
//       <th>Всего фильмов</th>
//       <th>{props.actors.films.length}</th>
//     </tr>
//   </table>
// );
