import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar mb-3 p-0 px-4 myHeading">
          <span className="navbar-brand mb-0 h1">
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/weather-192-461761.png"
              style={{ height: "40px" }}
              alt=""
            />{" "}
            AccuWeather
          </span>
        </nav>
      </div>
    );
  }
}
