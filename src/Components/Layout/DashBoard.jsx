import React, { Component } from "react";
import Card from "../Card/Card";
import Axios from "axios";
import Graph from "./Graph";
import Header from "./Header";

export default class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: [],
      activeCardNumber: -1,
      limit: 5,
      city: "",
      currentCity: "Panjim",
    };
  }

  async componentDidMount() {
    const weatherData = await Axios.get(
      "https://api.openweathermap.org/data/2.5/onecall?lat=15.4909&lon=73.8278&exclude=hourly,minutely&units=metric&appid=60cb22eb49b77d6a6361e9192bbed2ec"
    );

    this.setState({
      weatherData: weatherData.data.daily,
    });
  }

  onChange = (e) => [
    this.setState({
      [e.target.name]: e.target.value,
    }),
  ];

  getCityWeather = async (e) => {
    e.preventDefault();

    try {
      let cityWeather = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=60cb22eb49b77d6a6361e9192bbed2ec`
      );

      const latitude = cityWeather.data.coord.lat;
      const longitude = cityWeather.data.coord.lon;

      cityWeather = await Axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=60cb22eb49b77d6a6361e9192bbed2ec`
      );

      this.setState({
        weatherData: cityWeather.data.daily,
        currentCity: this.state.city,
      });
    } catch (e) {
      console.log(e);
    }
  };

  activeCard = (activeCardNumber) => {
    this.setState({
      activeCardNumber,
    });
  };

  getMinTempArray = () => {
    try {
      let arr = [];
      this.state.weatherData.forEach((data) =>
        arr.push(data.temp.min.toFixed(0))
      );

      return arr;
    } catch (e) {
      console.log(e);
    }
  };

  getMaxTempArray = () => {
    try {
      let arr = [];
      this.state.weatherData.forEach((data) =>
        arr.push(data.temp.max.toFixed(0))
      );
      return arr;
    } catch (e) {
      console.log(e);
    }
  };

  getWeekDays = () => {
    let dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
    let d = new Date();
    let todayDayNumber = d.getDay();

    let weekDays = [];
    for (let i = todayDayNumber; i <= 6; i++) weekDays.push(dayNames[i]);
    for (let i = 0; i < todayDayNumber; i++) weekDays.push(dayNames[i]);
    return weekDays;
  };

  render() {
    let { weatherData } = this.state;

    return (
      <div>
        <div className="row m-0 mb-3">
          <div className="col">
            <div className="row">
              <Header />
            </div>

            {/* left part */}
            <div className="row">
              <form className="container mt-3">
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Enter Number of Days</label>
                      <input
                        className="form-control container daysInput"
                        value={this.state.limit}
                        onChange={this.onChange}
                        type="number"
                        name="limit"
                        min="1"
                        max="7"
                      ></input>
                    </div>
                  </div>

                  <label>Enter City</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      value={this.state.city}
                      onChange={this.onChange}
                      className="form-control container"
                      name="city"
                      placeholder="Panjim"
                      aria-describedby="button-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        onClick={this.getCityWeather}
                        className="btn btn-secondary"
                        type="button"
                        id="button-addon2"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* graph */}
          <div className="col">
            <Graph
              minTempArray={this.getMinTempArray()}
              maxTempArray={this.getMaxTempArray()}
              weekDays={this.getWeekDays()}
            />
          </div>
        </div>

        <div
          className="container-fluid"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {weatherData.map((weatherData, index) =>
            index < this.state.limit ? (
              <Card
                i={index}
                data={weatherData}
                key={index}
                activeCardFunction={this.activeCard}
                activeCardNumber={this.state.activeCardNumber}
              />
            ) : null
          )}
        </div>
      </div>
    );
  }
}
