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
    return (
      <div className="movieList">
        <ol className="listt">
          <div class="scrollmenu">
            <div onClick={this.roleHandler.bind(this, "ACTOR")}>Актер</div>
            <div onClick={this.roleHandler.bind(this, "PRODUCER")}>
              Продюсер
            </div>
            <div onClick={this.roleHandler.bind(this, "HIMSELF")}>
              Актер: играет самого себя
            </div>
            <div onClick={this.roleHandler.bind(this, "WRITER")}>Сценарист</div>
          </div>
          <ol>
            {this.props.actors.films.map((film) =>
              film.professionKey === this.props.role ? (
                <li>
                  <div className="film_list_table">
                    <div className="film_table_name">
                      <NavLink to={"/film/" + film.filmId} exact>
                        <h3>{film.nameEn}</h3>
                      </NavLink>
                      <p>{film.nameRu}</p>
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
