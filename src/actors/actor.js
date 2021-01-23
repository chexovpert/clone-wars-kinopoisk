import React from "react";
import "./actor.css";
class Actor extends React.Component {
  constructor(props) {
    super();
    this.id = props;
  }

  state = {
    actor: null,
    isLoaded: false,
    error: null,
  };
  componentDidMount() {
    fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff/37859`, {
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
          console.log(this.state.actors);
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

  render() {
    {
      const { error, isLoaded, actors } = this.state;
      if (error) {
        return <div>Ошибка: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Загрузка...</div>;
      } else {
        return (
          <div className="actorWrap">
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
                <div className="aboutTable">
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
                </div>
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
        );
      }
    }
  }
}

export default Actor;
