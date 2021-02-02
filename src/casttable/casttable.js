import React from "react";
import "./casttable.css";
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
class CastTable extends React.Component {
  constructor(props) {
    super();
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
  }
  componentDidUpdate(prevProps, prevState) {
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
      let actorArray = staff.slice().filter((person) => person.professionKey === "ACTOR");
      actorArray.length = actorArray.length > 10 ? 10 : actorArray.length;
      if (isLoaded) {
        return (
          <div className="staffList">
            {actorArray.map((actor) => (
              <HtmlTooltip title={
                <React.Fragment>
                  <div className="tooltip">
                  <img className="tooltipimg" src={actor.posterUrl}></img>
                  <div>
                  <NavLink to={"/name/" + actor.staffId}>
                  <p>{actor.nameRu ? actor.nameRu : actor.nameEn}</p></NavLink>
                  <p>{actor.professionText ? actor.professionText : null}</p>
                  </div>
                  </div>
                </React.Fragment>
              } interactive>
              <NavLink to={"/name/" + actor.staffId} exact>
                <p>
                  {actor.nameRu}
                </p>
              </NavLink>
              </HtmlTooltip>
            ))}
            <NavLink to={"/film/" + this.props.id + "/staff"} exact>
              <h3>Вся съемочная группа</h3>
            </NavLink>
          </div>
        );
      } else {
        return (
          <div>
            Загрузка...
            <img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.gif" />
          </div>
        );
      }
    }
  }
}
export default CastTable;
