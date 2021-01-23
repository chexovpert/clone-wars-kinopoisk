import React from "react";
import "./header.css";
import logo from "./Burger.png";
import Search from "./search";
// import Popup from "./popup";

export default (props) => (
  <div className="header">
    <div className="logoTitle" onMouseEnter={props.showPopup}>
      ТипоКинопоиск
    </div>
    <div className="title">
      <img src={logo} className="logo"></img>
      <ul className="burger-menu">
        <li>Films</li>
        <li>Shows</li>
        <li>Top 250 Films</li>
        <li>Top 250 shows</li>
      </ul>
    </div>
    <div className="search">
      <Search />
    </div>
  </div>
);
