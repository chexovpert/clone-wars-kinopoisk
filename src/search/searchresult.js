import React from "react";
import "./searchresult.css";

export default (props) => (
  <div className="search-result-field">
    <div className="search-result-rating">{props.rating}</div>
    <img className="search-result-poster" src={props.posterUrl}></img>
    <div className="search-result-title">
      <div className="search-result-title-nameRu">{props.nameRu}</div>
      <div className="search-result-title-nameEn">{`${props.year}    ${props.nameEn}`}</div>
      <div className="search-result-title-genre">
        {props.genre.map((elem) => (
          <p>{elem.genre}</p>
        ))}
      </div>
    </div>
  </div>
);
