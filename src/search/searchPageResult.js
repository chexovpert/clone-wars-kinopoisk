import React from "react";
import "./searchPageResult.css";

export default (props) => (
  <div className="search-page-result-field">
    <img className="searchpage-poster" src={props.posterUrl}></img>
    <div className="searchpage-title">
      <h1>{props.nameRu}</h1>
      <p>
        {props.rating} {props.nameEn}
      </p>
    </div>
  </div>
);
