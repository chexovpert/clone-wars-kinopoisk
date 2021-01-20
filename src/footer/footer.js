import React from "react";
import "./footer.css";
import Rslogo from "./rs_school_js.svg";

export default (props) => (
  <footer>
    <div className="footerauthor">
      <a href="https://github.com/chexovpert">Github</a>
    </div>
    <div className="svg">
      <img src={Rslogo}></img>
    </div>
    <div className="rslink">
      <a href="https://rs.school/js/">RS.School</a>
    </div>
  </footer>
);
