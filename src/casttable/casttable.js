import React from "react";
//import "./table.css";
import { NavLink } from "react-router-dom";
class CastTable extends React.Component {
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
    if (prevProps.id !== this.props.id) {
      this.setState({
        isLoaded: false,
        error: null,
      });
      this.apiHandler(this.props.id);
    }
  }
  componentDidMount() {
    this.apiHandler(this.props.id);
  }
  render() {
    const { error, isLoaded, staff } = this.state;
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
      let actorArray = staff
        .slice()
        .filter((person) => person.professionKey === "ACTOR");
      console.log(actorArray);
      actorArray.length = actorArray.length > 10 ? 10 : actorArray.length;
      return (
        <div className="staffList">
          {actorArray.map((actor) => (
            <NavLink to={"/name/" + actor.staffId} exact>
              <p>{actor.nameRu}</p>
            </NavLink>
          ))}
        </div>
      );
    }
  }
}
export default CastTable;
