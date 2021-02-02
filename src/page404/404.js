import React from "react";
import { NavLink } from "react-router-dom";
import "./404.css";
import itsfine from "./tenor.gif";

export default () => (
  <div className="page-404-container">
    <div className="page-404-field">
      <h1>{"404 СТРАНИЦА НЕ НАЙДЕНА"}</h1>
      <img src={itsfine}></img>
      <h2>{"Все в порядке. Не стоит нервничать. Попробуй сделать тоже еще раз и посмотри за результатом"}</h2>
      <NavLink className="page-404-link" to={"/"}>
        <h3>{"или жми сюда чтобы вернуться в начало"}</h3>
      </NavLink>
    </div>
  </div>
);
