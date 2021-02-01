import React from "react";
import { Link } from "react-router-dom";
import Pagestory from "../pagestory/pagestory";
import ButtonsCase from "./buttonCase";
import "./main.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    // searchPageState: "",
  };

  searchHandler = (event) => {
    this.setState({
      searchPageState: event.target.value,
    });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }} className="main-container">
        <h1>{`Добро пожаловать на наш ТипоКинопоиск`}</h1>
        <h2>{`Здесь вы можете узнать обо всех фильмах планеты,`}</h2>
        <h2>{`а также обо всех актерах, сыгравших в этих фильмах`}</h2>
        <h3>{`Для этого вы можете воспользоваться строкой поиска`}</h3>
        <div className="main-search">
          <form className="main-search-form">
            <input
              className="main-search-input"
              type="text"
              placeholder={`Введите название фильма`}
              onChange={this.searchHandler}
              value={this.state.searchPageState}
            ></input>
            <Link to={`/search/${this.state.searchPageState}/1`}>
              <button className="main-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </Link>
          </form>
        </div>
        <h3>{`или выбрать что-то из представленных категорий`}</h3>
        <ButtonsCase />
        <Pagestory {...this.props} />
      </div>
    );
  }
}

export default Main;
