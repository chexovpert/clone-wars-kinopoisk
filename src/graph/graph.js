import React from "react";
import "./graph.css";
import Chart from "chart.js";

class Graph extends React.Component {
  constructor(props) {
    super();
    this.chartRef = React.createRef();
  }

  state = {
    actor: null,
    role: null,
    chart: null,
    ctx: null,
    //   isLoaded: false,
    //   error: null,
    //   listToggle: false,
    //   role: "HIMSELF",
  };

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.state.chart.destroy();
    this.buildChart();
  }
  buildChart() {
    let actor = this.props.actor;
    let role = this.props.role;

    let filmtype = actor.films.filter((film) =>
      film.professionKey === role && film.rating && film.rating > 0 ? film : null
    );
    let filmlabel = filmtype.map((film) =>
      film.nameRu ? film.nameRu : film.nameEn
    );
    let filmrating = filmtype.map((film) =>
      film.rating.includes("%")
        ? film.rating.substring(0, film.rating.length - 1) / 10
        : film.rating
    );

    //console.log(filmtype);
    this.state.ctx = this.chartRef.current.getContext("2d");
    this.state.chart = new Chart(this.state.ctx, {
      type: "bar",
      data: {
        labels: filmlabel,
        datasets: [
          {
            label: "# of Votes",
            data: filmrating,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 10,
              },
            },
          ],
        },
      },
    }); // eslint-disable-line no-new
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}
export default Graph;
