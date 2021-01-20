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
      film.professionKey === role ? film : null
    );
    let filmlabel = filmtype.map((film) => film.nameEn);
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
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
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
