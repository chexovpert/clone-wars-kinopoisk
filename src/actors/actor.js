import React from "react";
import "./actor.css";
import Graph from "../graph/graph";
import Table from "../table/table";
import Factlist from "../factlist/factlist";
import ActorTable from "./actortable/actortable";
import { NavLink } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
class Actor extends React.Component {
  constructor(props) {
    super();
  }

  state = {
    actors: null,
    isLoaded: false,
    error: null,
    role: "ACTOR",
  };
  apiHandler(link) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff/${link}`, {
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
            actors: result,
          });
          document.title = `${result.nameRu ? result.nameRu : result.nameEn} - Типокинопоиск`;
          if ("history" in localStorage) {
            let history = JSON.parse(localStorage.history);
            if (!history.find((elem) => elem.nameRu === result.nameRu)) {
              history.unshift(result);
              history.length = history.length > 10 ? 10 : history.length;
              let historyJSON = JSON.stringify(history);
              localStorage.setItem("history", historyJSON);
            }
          } else {
            let history = [result];
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

  // apiHandlerFilm(link) {
  //   fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${link}`, {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoadedFilm: true,
  //           film: result,
  //         });
  //         console.log(result)
  //       },
  //       (errorFilm) => {
  //         console.log("error");
  //         this.setState({
  //           isLoadedFilm: true,
  //           errorFilm,
  //         });
  //       }
  //     );
  // }
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
  roleHandler(prop) {
    this.setState({
      role: prop,
    });
  }

  render() {
    {
      const { error, isLoaded, actors } = this.state;
      if (error) {
        return <div>Ошибка: {error.message}</div>;
      } else if (!isLoaded) {
        return (
          <div>
            Загрузка...
            <img alt="loadinggif" src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.gif" />
          </div>
        );
      } else {
        console.log(this.props);
        return (
          <div className="actorWrap">
            <div className="actorTop">
              <div className="firstColumn">
                <div className="actorPic">
                  <img src={actors.posterUrl} alt="actorname" />
                </div>
              </div>
              <div className="secondColumn">
                <div className="description">
                  <div className="actorName">
                    <h1>{actors.nameRu}</h1>
                    <h2>{actors.nameEn}</h2>
                    <h2>О персоне</h2>
                  </div>
                  <ActorTable actors={actors}></ActorTable>
                </div>
              </div>
              <div className="thirdColumn">
                <p>
                  <b>Лучшие фильмы</b>
                </p>
                {this.state.actors.films.map((film) =>
                  film.general ? (
                    <div>
                      <HtmlTooltip title={
                <React.Fragment>
                  <div className="tooltip">
                  <div className="tooltiprating">{film.rating}</div>
                  <div>
                  <NavLink to={"/film/" + film.filmId}>
                  <p>{film.nameRu ? film.nameRu : film.nameEn}</p></NavLink>
                  <p>{film.nameEn ? film.nameEn : null}</p>
                  </div>
                  </div>
                </React.Fragment>
              } interactive>
                      <NavLink to={"/film/" + film.filmId} exact>
                        <p>
                          {film.nameRu}
                        </p>
                      </NavLink>
                      </HtmlTooltip>
                    </div>
                  ) : null
                )}
                {actors.hasAwards ? (
                  <div>
                    <img src="https://st.kp.yandex.net/images/movies/awardOscar.png" alt="actorname" />
                    <p>Наград: {actors.hasAwards}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="actorBottom">
              <Factlist facts={this.state.actors.facts}></Factlist>
              <Graph actor={this.state.actors} role={this.state.role}></Graph>
              <Table actors={this.state.actors} role={this.state.role} handler={this.roleHandler.bind(this)}></Table>
            </div>
          </div>
        );
      }
    }
  }
}

export default Actor;
