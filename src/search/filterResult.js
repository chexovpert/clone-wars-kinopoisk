import React from "react";
import { NavLink } from "react-router-dom";
import "./filterResult.css";

export default (props) => (
  <div className="filter-result-field">
    {props.rating ? <div className="filter-result-rating">{props.rating}</div> : <div />}
    <NavLink to={`/film/${props.fId}`}>
      <img className="filter-result-poster" src={props.posterUrl}></img>
    </NavLink>
    <div className="filter-result-title">
      <NavLink className="filter-result-title-nameRu" to={`/film/${props.fId}`}>
        <div>{props.nameRu ? props.nameRu : props.nameEn}</div>
      </NavLink>
      <div className="filter-result-title-nameEn">{`${props.year}    ${props.nameEn ? props.nameEn : ""}`}</div>
      <div className="filter-result-title-country">
        <p>{"Страна: "}</p>
        {props.country.map((elem) => (
          <p>{elem.country}</p>
        ))}
      </div>
      <div className="filter-result-title-genre">
        <p>{"Жанр: "}</p>
        {props.genre.map((elem) => (
          <p>{elem.genre}</p>
        ))}
      </div>
      <div className="filter-result-title-time">
        {props.time ? <div className="top-result-title-time">{`Продолжительность: ${props.time}`}</div> : <div />}
      </div>
    </div>
  </div>
);
