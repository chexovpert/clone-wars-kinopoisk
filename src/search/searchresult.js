import React from "react";
import "./searchresult.css";

export default (props) => (
  <div className="search-result-field">
    <img className="poster" src={props.posterUrl}></img>
    <div className="title">
      <h1>{props.nameRu}</h1>
      <p>
        {props.rating} {props.nameEn}
      </p>
    </div>
  </div>
);
