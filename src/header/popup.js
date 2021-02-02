import "./popup.css";
import React from "react";

class Popup extends React.Component {
  constructor(props) {
    super();
    // this.props = props;
  }

  state = {
    isLoaded: false,
    error: null,
  };

  apiHandler(id, type) {
    let prefics;
    type ? (prefics = "v2.1/films") : (prefics = "v1/staff");
    fetch(`https://kinopoiskapiunofficial.tech/api/${prefics}/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (type) {
            this.setState({
              isLoaded: true,
              result: result.data,
            });
          } else {
            this.setState({
              isLoaded: true,
              result: result,
            });
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

  componentDidUMount = () => {
    this.apiHandler(this.props.kName, this.props.kFilm);
  };

  componentDidUpdate = (prevId) => {
    if (prevId.kName !== this.props.kName) {
      this.setState({
        isLoaded: false,
      });
      this.apiHandler(this.props.kName, this.props.kFilm);
    }
  };

  render() {
    if (this.state.isLoaded) {
      if (this.props.kFilm) {
        return (
          <div id="popup-wrap" onMouseLeave={removePopup}>
            <img className="popup-poster" src={this.state.result.posterUrl} alt="none"></img>
            <div className="popup-info">
              <h1>{this.state.result.nameRu}</h1>
              <p id="popup-extra">
                {this.state.result.year} {this.state.result.nameEn}
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div id="popup-wrap" onMouseLeave={removePopup}>
            <img className="popup-poster" src={this.state.result.posterUrl} alt="none"></img>
            <div className="popup-info">
              <h1>{this.state.result.nameRu}</h1>
              <p>{this.state.result.nameEn}</p>
              <p id="popup-extra">{this.state.result.profession}</p>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div id="popup-wrap" onMouseLeave={removePopup}>
          Загрузка...
        </div>
      );
    }
  }
}

function removePopup() {
  const popup = document.getElementById("popup-wrap");
  popup.style.display = "none";
}

export default Popup;
