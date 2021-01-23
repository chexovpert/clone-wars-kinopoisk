import React from "react";
import "./actor.css";
import Graph from "../graph/graph";
import Table from "../table/table";
import Factlist from "../factlist/factlist";

import { NavLink } from "react-router-dom";
class Actor extends React.Component {
  constructor(props) {
    super();
    //this.id = props;
  }

  state = {
    actors: null,
    isLoaded: false,
    error: null,
    role: "ACTOR",
  };
  // idHandler(id) {
  //   this.props.handler(id);
  //   //console.log(this.props);
  // }
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
          //const actors = this.state.items.actor
          this.setState({
            isLoaded: true,
            actors: result,
          });
          console.log(this.state);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
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
    // only update if not match I don't know what's your data is so add a
    // simple check like we use for strings.
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
            <img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.gif" />
          </div>
        );
      } else {
        return (
          <div className="actorWrap">
            <h2>{this.props.match.params.id}</h2>
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
                  <table className="aboutTable">
                    <tr>
                      <th>Карьера</th>
                      <th>{actors.profession}</th>
                    </tr>
                    <tr>
                      <th>Рост</th>
                      <th>{actors.growth} см</th>
                    </tr>
                    <tr>
                      <th>Дата рождения</th>
                      <th>
                        {actors.birthday}, {actors.age} лет
                      </th>
                    </tr>
                    <tr>
                      <th>Место рождения</th>
                      <th>{actors.birthplace}</th>
                    </tr>
                    <tr>
                      <th>Жанры</th> <th></th>
                    </tr>
                    <tr>
                      <th>Всего фильмов</th>
                      <th>{actors.films.length}</th>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="thirdColumn">
                <p>
                  <b>Лучшие фильмы</b>
                </p>
                <NavLink
                  to={"/name/" + 10988}
                  exact
                  //onClick={this.idHandler.bind(this, 10988)}
                >
                  Мартин
                </NavLink>
                <NavLink
                  to={"/name/" + 37859}
                  exact
                  //onClick={this.idHandler.bind(this, 37859)}
                >
                  Лео
                </NavLink>
                {this.state.actors.films.map((film) =>
                  film.general ? (
                    <div>
                      <NavLink to={"/film/" + film.filmId} exact>
                        <p>{film.nameRu}</p>
                      </NavLink>
                    </div>
                  ) : null
                )}
                {actors.hasAwards ? (
                  <div>
                    <img
                      src="https://st.kp.yandex.net/images/movies/awardOscar.png"
                      alt="actorname"
                    />
                    <p>{actors.hasAwards}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="actorBottom">
              <Factlist facts={this.state.actors.facts}></Factlist>
              <Graph actor={this.state.actors} role={this.state.role}></Graph>
              <Table
                actors={this.state.actors}
                role={this.state.role}
                handler={this.roleHandler.bind(this)}
              ></Table>
            </div>
          </div>
        );
      }
    }
  }
}

export default Actor;
