import React from "react";
import "./table.css";
import { NavLink } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

// let apiimg = null
// function apiHandler(link) {
//   fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${link}`, {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8",
//     },
//   })
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         apiimg = result.posterUrl
//       },
//       (error) => {
//           error= true
        
//       }
//     );
// }

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
class Table extends React.Component {
  constructor(props) {
    super();
    //this.id = props;
  }
  roleHandler(role) {
    this.props.handler(role);
  }
  render() {
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
    const professionsRu = [
      "Режиссер",
      "Актер",
      "Продюсер",
      "Сценарист",
      "Оператор",
      "Монтажер",
      "Композитор",
      "Художник",
      "Автор дубляжа",
      "Переводчик",
      "Звукорежиссер",
      "Неизвестно",
    ];
    console.log(this.props.actors.films);
    return (
      <div className="movieList">
        <ol className="listt">
          <div class="scrollmenu">
            {professions.map((profession) =>
              this.props.actors.films.find(
                (film) => film.professionKey === profession
              ) ? (
                <div onClick={this.roleHandler.bind(this, profession)}>
                  {professionsRu[professions.indexOf(profession)]}
                </div>
              ) : null
            )}
          </div>
          <ol>
            {this.props.actors.films.map((film) =>
              film.professionKey === this.props.role ? (
                <li>
                  <div className="film_list_table">
                    <div className="film_table_name">
                    <HtmlTooltip title={
                <React.Fragment>
                  <div className="tooltip">
                  <div className="tooltiprating">{film.rating}</div>
                  <div>
                  <NavLink to={"/film/" + film.filmId}>
                  <p>{film.nameRu ? film.nameRu : film.nameEn}</p></NavLink>
                  <p>{film.nameEn ? film.nameEn : null}</p>
                  </div>
                  </div>
                </React.Fragment>
              } interactive>
                      <NavLink to={"/film/" + film.filmId} exact>
                        <h3>{film.nameEn ? film.nameEn : film.nameRu}</h3>
                      </NavLink>
                      </HtmlTooltip>
                      <p>{film.nameEn ? film.nameRu : null}</p>
                      <p>{film.description}</p>
                      
                    </div>
                    
                    {film.rating ? <div className="film_rating">{film.rating}</div> : null }
                    
                  </div>
                </li>
              ) : null
            )}
          </ol>
        </ol>
      </div>
    );
  }
}
export default Table;
