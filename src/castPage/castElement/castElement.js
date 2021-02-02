import React from "react";
import { NavLink } from "react-router-dom";
import "./castElement.css";

export default (props) => (
  <div className="actor_list_prof">
    <h3>{props.staff[0].professionText}</h3>
    <ol>
      {props.staff.map((actor) => (
        <li>
          <div className="actor_list_table">
            <img
              src={actor.posterUrl}
              alt={actor.nameRu}
              className="actor_table_img"
            ></img>
            <div className="actor_table_name">
              <NavLink to={"/name/" + actor.staffId} exact>
                <p>{actor.nameRu ? actor.nameRu : actor.nameEn}</p>
              </NavLink>

              <p>{actor.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  </div>
);
