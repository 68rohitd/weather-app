import React, { Component } from "react";
import "../../Assets/Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      max: 0,
      cardNumber: -1,
    };
  }

  componentDidMount() {
    let data = this.props.data;

    if (data) {
      this.setState({
        min: data.temp.min,
        max: data.temp.max,
      });
    }
  }

  getInfo = (data, index) => {
    this.setState({
      min: data.temp.min,
      max: data.temp.max,
      cardNumber: index,
    });

    this.props.activeCardFunction(index);
  };

  getDate = (unixTime) => {
    const milliseconds = unixTime * 1000;
    const dateObject = new Date(milliseconds);
    const date = dateObject.toDateString();

    return date;
  };

  render() {
    const data = this.props.data;
    const index = this.props.i;

    return (
        <div className="card m-1 myCard">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            style={{ height: "80px", width: "80px", alignSelf: "center" }}
            className="card-img-top m-2"
            alt="..."
          ></img>

          <div className="card-body pt-0">
            <h5 className="card-title date text-center">
              {this.getDate(data.dt)}
            </h5>

            <hr style={{ borderColor: "white" }} />
            
            <p className="text-center mainTemperature mb-0">
              {data.temp.day.toFixed()} °C
            </p>

            {this.props.activeCardNumber === index ? (
              <div className="text-center">
                <p className="card-text description">
                  {data.weather[0].description.toUpperCase()}{" "}
                </p>

                <p>
                  Min Temp: <b>{this.state.min.toFixed(0)} °C</b> <br />
                  Max Temp: <b>{this.state.max.toFixed(0)} °C</b>
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="card-text description">
                  {data.weather[0].description.toUpperCase()}
                </p>
                <button
                  className="btn btn-light btn-block"
                  onClick={() => this.getInfo(data, index)}
                >
                  More Info
                </button>
              </div>
            )}
          </div>
        </div>
    );
  }
}
