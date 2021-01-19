import React from "react";
import "./actor.css";
class Actor extends React.Component {
  constructor(props) {
    super();
    //this.id = props;
  }

  state = {
    actor: null,
    isLoaded: false,
    error: null,
    listToggle: false,
    role: "HIMSELF",
  };
  componentDidMount() {
    fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff/${this.props.id}`, {
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
  roleHandler(prop) {
    this.setState({
      role: prop,
    });
  }
  toggleList() {
    this.setState({
      listClass: "show",
      listToggle: !this.state.listToggle,
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
                {this.state.actors.films.map((film) =>
                  film.general ? <p>{film.nameRu}</p> : null
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
              <ul style={{ listStyleType: "square" }} class="factlist">
                {this.state.actors.facts.length ? (
                  <h2>Знаете ли вы, что…</h2>
                ) : null}
                {this.state.actors.facts.map((fact) =>
                  this.state.actors.facts.length ? (
                    <li className={this.state.listToggle ? "show" : ""}>
                      {fact}
                    </li>
                  ) : null
                )}
                {this.state.actors.facts.length >= 3 ? (
                  <div
                    className="show_hide_list"
                    onClick={this.toggleList.bind(this)}
                  >
                    {this.state.listToggle ? "Скрыть" : "Смотреть все"}
                  </div>
                ) : null}
              </ul>
              <div className="movieList">
                <ol className="listt">
                  <div class="scrollmenu">
                    <div onClick={this.roleHandler.bind(this, "ACTOR")}>
                      Актер
                    </div>
                    <div onClick={this.roleHandler.bind(this, "PRODUCER")}>
                      Продюсер
                    </div>
                    <div onClick={this.roleHandler.bind(this, "HIMSELF")}>
                      Актер: играет самого себя
                    </div>
                    <div onClick={this.roleHandler.bind(this, "WRITER")}>
                      Сценарист
                    </div>
                  </div>
                  {this.state.actors.films.map((film) =>
                    film.professionKey === this.state.role ? (
                      <ol className="film_list_table">
                        <div className="film_table_name">
                          <h3>{film.nameEn}</h3>
                          <p>{film.nameRu}</p>
                          <p>{film.description}</p>
                        </div>
                        <div className="film_rating">{film.rating}</div>
                      </ol>
                    ) : null
                  )}
                </ol>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default Actor;
