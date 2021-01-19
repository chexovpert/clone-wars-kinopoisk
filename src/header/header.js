import React from "react";
import "./header.css";
import logo from "./Burger.png";

export default () => (
  <div className="header">
    <div className="logoTitle">ТипоКинопоиск</div>
    <div className="title" onMouseLeave={toggleBurger}>
      <img
        src={logo}
        className="logo"
        onMouseEnter={toggleBurger}
        onMouseLeave={toggleBurger}
      ></img>
      <ul className="burger-menu">
        <li>Films</li>
        <li>Shows</li>
        <li>Top 250 Films</li>
        <li>Top 250 shows</li>
      </ul>
    </div>
    <div className="search"></div>
  </div>
);

function toggleBurger() {
  const list = document.querySelector(".burger-menu");
  if (list.style.display === "inline") {
    list.style.display = "none";
  } else {
    list.style.display = "inline";
  }
}
