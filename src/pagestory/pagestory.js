import React from "react";
import {NavLink} from "react-router-dom";

class Pagestory extends React.Component {
    constructor(props) {
        super(props);
    }
    state ={
        historylocal: false,
        history: null,
    }
    componentDidMount() {
        if("history" in localStorage){
            let history = JSON.parse( localStorage.history );
            this.setState({
                historylocal: true,
                history: history,
              });
        }
      }
      render() {
          if (this.state.historylocal) {
              this.state.history.length = this.state.history.length > 10 ? 10 : this.state.history.length;
              return ( this.state.history.map((page) => <div className="staffList">
              <img
                src={page.posterUrl}
                alt={page.nameRu}
                className="actor_table_img"
              ></img>
              <NavLink to={"/film/" + page.filmId} exact>
                <p>{page.nameRu}</p>
              </NavLink>
              <p>{page.nameEn}</p>
              <p>{page.rating}</p>
            </div> ) )
          } else return <div className="staffList"></div>;
      }
}
export default Pagestory