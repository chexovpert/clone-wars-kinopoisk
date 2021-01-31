import React from "react";
import "./footer.css";
import Rslogo from "./rs_school_js.svg";

export default (props) => (
  <footer>
    <div className="footerauthor">
      <p><a href="https://github.com/Vepsar">Vepsar</a></p>
      <p><a href="https://github.com/chexovpert">Сhexovpert</a></p>
    </div>
    <div className="svg">
      <img src={Rslogo}></img>
    </div>
    <div className="rslink">
      <a href="https://rs.school/js/">RS.School</a>
    </div>
  </footer>
);
