import React from "react";
import "./actortable.css";

const professions = [
  "profession",
  "growth",
  "birthday",
  "birthplace",
];
const professionsRu = [
  "Карьера",
  "Рост",
  "Дата рождения",
  "Место рождения",
];

export default (props) => (
  <table className="aboutTable">
    {professions.map((elem, index) => props.actors[elem] ? (
      <tr>
        <th>{professionsRu[index]}</th>
        <th>{props.actors[elem]}</th>
      </tr>
    ) : null )}
    {props.actors.films.length ? (
      <tr>
        <th>Всего фильмов</th>
        <th>{props.actors.films.length}</th>
      </tr>
    ) : null}
  </table>
);
