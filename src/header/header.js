import React from "react";
import "./header.css";
import Search from "../search/search";
import { NavLink } from "react-router-dom";

export default () => (
  <div className="header">
    <div className="header-container">
      <div className="title-container">
        <NavLink to="/">
          <div className="logoTitle">ТипоКинопоиск</div>
        </NavLink>
        <div className="title">
          {/* <img src={logo} className="logo"></img> */}
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="40px" height="40px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </div>
          <ul className="burger-menu">
            <NavLink className="NavLi" to="/filtersearch">
              <li>Поиск по фильтру</li>
            </NavLink>

            <li>
              <NavLink className="NavLi" to="/top/TOP_250_BEST_FILMS/1">
                Топ 250 лучших фильмов
              </NavLink>
            </li>
            <li>
              <NavLink className="NavLi" to="/top/TOP_100_POPULAR_FILMS/1">
                Топ 100 популярных фильмов
              </NavLink>
            </li>
            <li>
              <NavLink className="NavLi" to="/top/TOP_AWAIT_FILMS/1">
                Топ ожидаемых фильмов
              </NavLink>
            </li>
            <li>
              <NavLink className="NavLi" onClick={getRandomNumber} to={`/film/${getRandomNumber()}`}>
                Случайный фильм
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="search">
        <Search />
      </div>
    </div>
  </div>
);

function getRandomNumber() {
  return Math.floor(Math.random() * 150000 + 1);
}
