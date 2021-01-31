import React from "react";
import "./header.css";
import logo from "./Burger.png";
import Search from "../search/search";
import { NavLink } from "react-router-dom";

export default (props) => (
  <div className="header">
    <div className="logoTitle">ТипоКинопоиск</div>
    <div className="title">
      <img src={logo} className="logo"></img>
      <ul className="burger-menu">
        <li>Films</li>
        <li>Shows</li>
        <li>
          <NavLink to="/top/TOP_250_BEST_FILMS/1">Top 250 Films</NavLink>
        </li>
        <li>Top 250 shows</li>
      </ul>
    </div>
    <div className="search">
      <Search />
    </div>
  </div>
);
