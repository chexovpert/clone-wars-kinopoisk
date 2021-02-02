import React from "react";
import { NavLink } from "react-router-dom";
import "./filmtable.css";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';




const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
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
 
  }
  personHandler(arr, proffession) {
    let arrlength = arr.concat().filter((person) => person.professionKey === proffession);
    arrlength.length = arrlength.length > 3 ? 3 : arrlength.length;
   
    return arrlength;
  }
  render() {
    const { error, isLoaded, staff } = this.state;
    const professions = [
      "DIRECTOR",
      "WRITER",
      "OPERATOR",
      "COMPOSER",
      "DESIGN",
    ];
    const professionsRu = [
      "Режиссер",
      "Сценарист",
      "Оператор",
      "Композитор",
      "Художник",
    ];
    const filmprops1 = [
      "year",
    ];
    const filmpropsRu1 = [
      "Год производства",
      
    ];
    const filmprops2 = [
      "budget",
      "grossUsa",
      "grossWorld",
      "premiereWorld",
      "ratingAgeLimits",
      "filmLength"
    ];
    const filmpropsRu2 = [
      "Бюджет",
      "Сборы в США",
      "Сборы в мире",
      "Премьера в мире",
      "Возраст",
      "Время" 
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
           {filmprops1.map((elem, index) => this.props.film[elem] ? <tr>
            <th>{filmpropsRu1[index]}</th>
            <th>{this.props.film[elem]}</th>
          </tr> : null) }
          {this.props.film.countries.length > 0 ? <tr>
            <th>Страна</th>
            <th>
              {this.props.film.countries.map((country) => (
                <p>{country.country}</p>
              ))}
            </th>
          </tr> : null}
          {this.props.film.genres.length > 0 ? <tr>
            <th>Жанр</th>
            <th>
              {this.props.film.genres.map((genre) => (
                <p>{genre.genre}</p>
              ))}
            </th>
          </tr>: null}
          {this.props.film.slogan ? <tr>
            <th>Слоган</th>
            <th>{this.props.film.slogan}</th>
          </tr>
          : null}
          {professions.map((elem, index) => this.personHandler(staff, elem).length > 0 ? <tr>
            <th>{professionsRu[index]}</th>
            <th>
              {this.personHandler(staff, elem).map((person) => (
                <HtmlTooltip title={
                  <React.Fragment>
                    <div className="tooltip">
                    <img className="tooltipimg" src={person.posterUrl}></img>
                    <div>
                    <NavLink to={"/name/" + person.staffId}>
                    <p>{person.nameRu ? person.nameRu : person.nameEn}</p></NavLink>
                    <p>{person.professionText ? person.professionText : null}</p>
                    </div>
                    </div>
                  </React.Fragment>
                } interactive>
                <NavLink to={"/name/" + person.staffId}>
                  <p>
                  {person.nameRu ? person.nameRu : person.nameEn}
                  </p>
                </NavLink>
                </HtmlTooltip>
              ))}
            </th>
          </tr>: null )}
          {filmprops2.map((elem, index) => this.props.film[elem] ? <tr>
            <th>{filmpropsRu2[index]}</th>
            <th>{this.props.film[elem]}</th>
          </tr> : null) }
        </table>
      );
    }
  }
}
export default FilmTable;
