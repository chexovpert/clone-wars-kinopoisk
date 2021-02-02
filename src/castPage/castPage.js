import React from "react";
import CastElement from "./castElement/castElement";
import {Redirect} from "react-router-dom"
class CastPage extends React.Component {
  constructor(props) {
    super();
    //this.id = props;
  }
  state = {
    isLoaded: false,
    error: null,
  };
  apiHandler(link) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${link}`, {
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
            staff: result,
          });
        },
        (error) => {
          console.log("error");
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
      document.title = `Все актеры - Типокинопоиск`;
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
    //console.log(this.state);
  }
  render() {
    const { error, isLoaded, staff } = this.state;
    const professions = [
      "DIRECTOR",
      "ACTOR",
      "PRODUCER",
      "WRITER",
      "OPERATOR",
      "EDITOR",
      "COMPOSER",
      "DESIGN",
      "PRODUCER_USSR",
      "TRANSLATOR",
      "VOICE_DIRECTOR",
      "UNKNOWN",
    ];
    if (error) {
      return <Redirect to="/404" />;
    } else if (!isLoaded) {
      return (
        <div>
          Загрузка...
          <img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.gif" />
        </div>
      );
    } else {
      const staffarray = professions.map((elem) =>
        staff.slice().filter((person) => person.professionKey === elem)
      );
      return staffarray.map((profession) =>
        profession.length ? (
          <CastElement staff={profession}></CastElement>
        ) : null
      );
    }
  }
}
export default CastPage;
