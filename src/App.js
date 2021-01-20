import "./App.css";
import React, { Component } from "react";
import Car from "./car/car";
import Actor from "./actors/actor";
import Footer from "./footer/footer";

class App extends Component {
  state = {
    cars: [
      { name: "mazda", year: 1997 },
      { name: "audi", year: 1997 },
      { name: "ferrari", year: 1997 },
    ],
    pageTitle: "Title",
    showCars: false,
    isLoaded: false,
    error: null,
    items: {},
  };
  clickHandler(prop) {
    this.setState({
      pageTitle: prop,
    });
  }
  toggleCars() {
    this.setState({
      showCars: !this.state.showCars,
    });
  }
  componentDidMount() {
    fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff/66539`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          const actors = this.state.items.actors;
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
  render() {
    const divStyle = {
      textAlign: "center",
    };
    let cars = null;
    const { error, isLoaded, items } = this.state;
    if (this.state.showCars) {
      cars = this.state.cars.map((car, index) => {
        return (
          <Car
            key={index}
            name={car.name}
            year={car.year}
            handler={this.clickHandler.bind(this, car.name)}
          />
        );
      });
    } else cars = null;
    return (
      <div style={divStyle}>
        {/* <h1>{this.state.pageTitle}</h1>
      <button onClick={this.toggleCars.bind(this)}>toggle cars title</button> */}
        <Actor></Actor>
        <Footer></Footer>
        {/* <div style={{
        width: '400',
        margin: 'auto',
        paddingTop: '20px',
      }}>
        {cars}
      </div> */}
        {/* {this.state.showCars ?
      this.state.cars.map((car, index)=>{
        return (
          <Car
            key={index}
            name={car.name}
            year={car.year}
            handler={this.clickHandler.bind(this, car.name)}
          />
        )
      }): null
    } */}
        {/* <Car name={cars[0].name} year={cars[0].year} handler={this.clickHandler.bind(this)}/>
      <Car name={cars[1].name} year={cars[1].year} handler={this.clickHandler.bind(this)}/>
      <Car name={cars[2].name} year={cars[2].year} handler={this.clickHandler.bind(this)}/> */}
      </div>
    );
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
