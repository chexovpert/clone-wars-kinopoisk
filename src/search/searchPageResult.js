import React from "react";
import { NavLink } from "react-router-dom";
import "./searchPageResult.css";

export default (props) => (
  <div className="searchpage-result-field">
    {props.rating ? <div className="searchpage-result-rating">{props.rating}</div> : <div />}
    <NavLink to={`/film/${props.fId}`}>
      <img className="searchpage-result-poster" src={props.posterUrl}></img>
    </NavLink>
    <div className="searchpage-result-title">
      <NavLink className="searchpage-result-title-nameRu" to={`/film/${props.fId}`}>
        <div>{props.nameRu ? props.nameRu : props.nameEn}</div>
      </NavLink>
      <div className="searchpage-result-title-nameEn">{`${props.year}    ${props.nameEn ? props.nameEn : ""}`}</div>
      <div className="searchpage-result-title-country">
        <p>{"Страна: "}</p>
        {props.country.map((elem) => (
          <p>{elem.country}</p>
        ))}
      </div>
      <div className="searchpage-result-title-genre">
        <p>{"Жанр: "}</p>
        {props.genre.map((elem) => (
          <p>{elem.genre}</p>
        ))}
      </div>
      <div className="searchpage-result-title-time">
        {props.time ? <div className="top-result-title-time">{`Продолжительность: ${props.time}`}</div> : <div />}
      </div>
    </div>
  </div>
);
