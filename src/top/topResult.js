import React from "react";
import { NavLink } from "react-router-dom";
import "./topResult.css";

export default (props) => (
  <div className="top-result-field">
    {props.rating ? <div className="top-result-rating">{props.rating}</div> : <div />}
    <NavLink to={`/film/${props.fId}`}>
      <img className="top-result-poster" src={props.posterUrl}></img>
    </NavLink>
    <div className="top-result-title">
      <NavLink className="top-result-title-nameRu" to={`/film/${props.fId}`}>
        <div>{props.nameRu ? props.nameRu : props.nameEn}</div>
      </NavLink>
      <div className="top-result-title-nameEn">{`${props.year}    ${props.nameEn ? props.nameEn : ""}`}</div>
      <div className="top-result-title-country">
        <p>{"Страна: "}</p>
        {props.country.map((elem) => (
          <p>{elem.country}</p>
        ))}
      </div>
      <div className="top-result-title-genre">
        <p>{"Жанр: "}</p>
        {props.genre.map((elem) => (
          <p>{elem.genre}</p>
        ))}
      </div>
      {props.time ? <div className="top-result-title-time">{`Продолжительность: ${props.time}`}</div> : <div />}
    </div>
  </div>
);
