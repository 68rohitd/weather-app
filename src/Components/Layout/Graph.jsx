import React, { Component } from "react";
import { Line } from "react-chartjs-2";
export default class Graph extends Component {
  render() {
    let graphData = {
      labels: this.props.weekDays,
      datasets: [
        {
          label: "Min Temp",
          data: this.props.minTempArray,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
        {
          label: "Max Temp",
          data: this.props.maxTempArray,
          fill: true,
          borderColor: "#742774",
        },
      ],
    };

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "550px" }}>
          <Line
            data={graphData}
            options={{
              title: {
                display: true,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              scales: {
                yAxes: [
                  {scaleLabel: {
                      display: true,
                      labelString: "Temperature (°C)"
                  },
                    gridLines: {
                      lineWidth: 0,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      lineWidth: 0,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    );
  }
}
