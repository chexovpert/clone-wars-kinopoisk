import React from "react";
import "./actortable.css";

export default (props) => (
  <table className="aboutTable">
    {props.actors.profession ? (
      <tr>
        <th>Карьера</th>
        <th>{props.actors.profession}</th>
      </tr>
    ) : null}
    {props.actors.growth ? (
      <tr>
        <th>Рост</th>
        <th>{props.actors.growth}</th>
      </tr>
    ) : null}
    {props.actors.birthday ? (
      <tr>
        <th>Дата рождения</th>
        <th>{props.actors.birthday}</th>
      </tr>
    ) : null}
    {props.actors.birthplace ? (
      <tr>
        <th>Место рождения</th>
        <th>{props.actors.birthplace}</th>
      </tr>
    ) : null}
    {props.actors.films.length ? (
      <tr>
        <th>Всего фильмов</th>
        <th>{props.actors.films.length}</th>
      </tr>
    ) : null}
  </table>
);
