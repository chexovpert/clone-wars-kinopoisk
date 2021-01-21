import React from "react";
import "./factlist.css";

class Factlist extends React.Component {
  constructor(props) {
    super();
  }
  state = {
    listToggle: false,
  };
  toggleList() {
    this.setState({
      listToggle: !this.state.listToggle,
    });
  }
  render() {
    return (
      <ul style={{ listStyleType: "square" }} class="factlist">
        {this.props.facts.length ? <h2>Знаете ли вы, что…</h2> : null}
        {this.props.facts.map((fact) =>
          this.props.facts.length ? (
            <li className={this.state.listToggle ? "show" : ""}>{fact}</li>
          ) : null
        )}
        {this.props.facts.length >= 3 ? (
          <div className="show_hide_list" onClick={this.toggleList.bind(this)}>
            {this.state.listToggle ? "Скрыть" : "Смотреть все"}
          </div>
        ) : null}
      </ul>
    );
  }
}
export default Factlist;
