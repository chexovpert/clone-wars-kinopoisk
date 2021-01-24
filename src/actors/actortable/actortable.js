import React from "react";
import "./actortable.css";

export default (props) => (
  <table className="aboutTable">
    <tr>
      <th>Карьера</th>
      <th>{props.actors.profession}</th>
    </tr>
    <tr>
      <th>Рост</th>
      <th>{props.actors.growth} см</th>
    </tr>
    <tr>
      <th>Дата рождения</th>
      <th>
        {props.actors.birthday}, {props.actors.age} лет
      </th>
    </tr>
    <tr>
      <th>Место рождения</th>
      <th>{props.actors.birthplace}</th>
    </tr>
    <tr>
      <th>Жанры</th> <th></th>
    </tr>
    <tr>
      <th>Всего фильмов</th>
      <th>{props.actors.films.length}</th>
    </tr>
  </table>
);
