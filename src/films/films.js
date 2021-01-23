import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./films.css";
import Factlist from "../factlist/factlist";
import CastTable from "../casttable/casttable";

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
          //const actors = this.state.items.actor
          this.setState({
            isLoaded: true,
            films: result.data,
          });
          //console.log(this.state);
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
  render() {
    {
      const { error, isLoaded, films } = this.state;
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
          <div className="filmWrap">
            <h2>{this.props.match.params.id}</h2>
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
                  {/* <table className="aboutTable">
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
                  </table> */}
                </div>
              </div>
              <div className="thirdColumn">
                <p>
                  <b>В главных ролях</b>
                </p>
                <CastTable id={this.props.match.params.id}></CastTable>
                {/* {this.state.actors.films.map((film) =>
                  film.general ? (
                    <div>
                      <p>{film.nameRu}</p>
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
                ) : null} */}
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
        //   <div className="filmWrap">
        //     <h2>{this.props.match.params.id}</h2>
        //     <div className="actorTop">
        //       <div className="firstColumn">
        //         <div className="actorPic">
        //           <img src={actors.posterUrl} alt="actorname" />
        //         </div>
        //       </div>
        //       <div className="secondColumn">
        //         <div className="description">
        //           <div className="actorName">
        //             <h1>{actors.nameRu}</h1>
        //             <h2>{actors.nameEn}</h2>
        //             <h2>О персоне</h2>
        //           </div>
        //           <table className="aboutTable">
        //             <tr>
        //               <th>Карьера</th>
        //               <th>{actors.profession}</th>
        //             </tr>
        //             <tr>
        //               <th>Рост</th>
        //               <th>{actors.growth} см</th>
        //             </tr>
        //             <tr>
        //               <th>Дата рождения</th>
        //               <th>
        //                 {actors.birthday}, {actors.age} лет
        //               </th>
        //             </tr>
        //             <tr>
        //               <th>Место рождения</th>
        //               <th>{actors.birthplace}</th>
        //             </tr>
        //             <tr>
        //               <th>Жанры</th> <th></th>
        //             </tr>
        //             <tr>
        //               <th>Всего фильмов</th>
        //               <th>{actors.films.length}</th>
        //             </tr>
        //           </table>
        //         </div>
        //       </div>
        //       <div className="thirdColumn">
        //         <p>
        //           <b>Лучшие фильмы</b>
        //         </p>
        //         {this.state.actors.films.map((film) =>
        //           film.general ? (
        //             <div>
        //               <p>{film.nameRu}</p>
        //               <NavLink
        //                 to={"/name/" + 10988}
        //                 exact
        //                 //onClick={this.idHandler.bind(this, 10988)}
        //               >
        //                 Мартин
        //               </NavLink>
        //               <NavLink
        //                 to={"/name/" + 37859}
        //                 exact
        //                 //onClick={this.idHandler.bind(this, 37859)}
        //               >
        //                 Лео
        //               </NavLink>
        //             </div>
        //           ) : null
        //         )}
        //         {actors.hasAwards ? (
        //           <div>
        //             <img
        //               src="https://st.kp.yandex.net/images/movies/awardOscar.png"
        //               alt="actorname"
        //             />
        //             <p>{actors.hasAwards}</p>
        //           </div>
        //         ) : null}
        //       </div>
        //     </div>
        //     <div className="filmBottom">
        //       <Factlist facts={this.state.films.facts}></Factlist>
        //     </div>
        //   </div>
      }
    }
  }
}
export default Films;
