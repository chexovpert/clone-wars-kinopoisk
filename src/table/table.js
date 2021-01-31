import React from "react";
import "./table.css";
import { NavLink } from "react-router-dom";
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
                      <NavLink to={"/film/" + film.filmId} exact>
                        <h3>{film.nameEn ? film.nameEn : film.nameRu}</h3>
                      </NavLink>
                      <p>{film.nameEn ? film.nameRu : null}</p>
                      <p>{film.description}</p>
                    </div>
                    <div className="film_rating">{film.rating}</div>
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
