import React, { Component } from "react";
import "./films.css";
import Factlist from "../factlist/factlist";
import CastTable from "../casttable/casttable";
import FilmTable from "./filmtable/filmtable";
import {Redirect} from "react-router-dom"
class Films extends Component {
  constructor(props) {
    super();
  }
  state = {
    isLoaded: false,
    error: null,
  };
  apiHandler(link) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${link}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            films: result.data,
          });
          document.title = `${result.data.nameRu ? result.data.nameRu : result.data.nameEn} - Типокинопоиск`;
          if ("history" in localStorage) {
            let history = JSON.parse(localStorage.history);
            if (!history.find((elem) => elem.nameRu === result.data.nameRu)) {
              history.unshift(result.data);
              history.length = history.length > 10 ? 10 : history.length;
              let historyJSON = JSON.stringify(history);
              localStorage.setItem("history", historyJSON);
            }
          } else {
            let history = [result.data];
            let historyJSON = JSON.stringify(history);
            localStorage.setItem("history", historyJSON);
          }
        },
        (error) => {
          console.log("error");
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        isLoaded: false,
        error: null,
      });
      this.apiHandler(this.props.match.params.id);
    }
  }
  componentDidMount() {

    this.apiHandler(this.props.match.params.id);
  }
  render() {
    {
      const { error, isLoaded, films } = this.state;
      if (error) {
        return <Redirect to="/404" />
        // <div>Ошибка: {error.message}</div>;
      } else if (!isLoaded) {
        return (
          <div>
            Загрузка...
            <img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.gif" />
          </div>
        );
      } else {
        return (
          <div className="filmWrap">
            <div className="filmTop">
              <div className="firstColumn">
                <div className="filmPic">
                  <img src={films.posterUrl} alt="filmname" />
                </div>
              </div>
              <div className="secondColumn">
                <div className="description">
                  <div className="actorName">
                    <h1>{films.nameRu}</h1>
                    <h2>{films.nameEn}</h2>
                    <h2>О фильме</h2>
                  </div>
                  <FilmTable
                    film={films}
                    id={this.props.match.params.id}
                    showPopup={this.props.showPopup}
                    chang={this.props.chang}
                  ></FilmTable>
                </div>
              </div>
              <div className="thirdColumn">
                <p>
                  <b>В главных ролях</b>
                </p>
                <CastTable id={this.props.match.params.id} showPopup={this.props.showPopup} chang={this.props.chang}></CastTable>
              </div>
            </div>
            <div className="filmBottom">
              <div className="filmDescription">
                <p>{films.description}</p>
              </div>
              <Factlist facts={this.state.films.facts}></Factlist>
            </div>
          </div>
        );
      }
    }
  }
}
export default Films;
