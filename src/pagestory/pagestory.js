import React from "react";
import { NavLink } from "react-router-dom";
import "./pagestory.css";

class Pagestory extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    historylocal: false,
    history: null,
  };
  componentDidMount() {
    if ("history" in localStorage) {
      let history = JSON.parse(localStorage.history);
      this.setState({
        historylocal: true,
        history: history,
      });
    }
  }
  render() {
    if (this.state.historylocal) {
      return (
        <div className="pageStoryWrapper">
          <p>Вы интересовались</p>
          <div className="pageStory">
            {this.state.history.map((page) => (
              <div>
                <NavLink className="page-story-page" to={page.filmId ? "/film/" + page.filmId : "/name/" + page.personId} exact>
                  <img src={page.posterUrl} alt={page.nameRu} className="page_story_img"></img>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      );
    } else return <div className="staffList"></div>;
  }
}
export default Pagestory;
