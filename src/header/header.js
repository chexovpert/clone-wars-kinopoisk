import React from "react";
import "./header.css";
import logo from "./Burger.png";
import Search from "../search/search";
import { NavLink } from "react-router-dom";

export default (props) => (
  <div className="header">
    <NavLink to="/">
      <div className="logoTitle">ТипоКинопоиск</div>
    </NavLink>
    <div className="title">
      <img src={logo} className="logo"></img>
      <ul className="burger-menu">
        <li>
          <NavLink to="/filtersearch">Поиск по фильтру</NavLink>
        </li>
        <li>
          <NavLink to="/top/TOP_250_BEST_FILMS/1">Топ 250 лучших фильмов</NavLink>
        </li>
        <li>
          <NavLink to="/top/TOP_100_POPULAR_FILMS/1">Топ 100 популярных фильмов</NavLink>
        </li>
        <li>
          <NavLink to="/top/TOP_AWAIT_FILMS/1">Топ ожидаемых фильмов</NavLink>
        </li>
      </ul>
    </div>
    <div className="search">
      <Search />
    </div>
  </div>
);
