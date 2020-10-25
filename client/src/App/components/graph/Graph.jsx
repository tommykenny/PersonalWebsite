import React, { useState, useEffect } from 'react';
const Chart = require('chart.js');


function Graph(props) {
  console.log(props.graphData.xLabels);
  console.log(props.graphData.yData);

  //[0, 10, 20, 30, 40, 50, 60, 70, 80, 90,100]
  //[0, 0, 0, 0, 0.0002, 0.046, 0.866, 4.5216, 11.7043, 20.8915, 30.7261]


  // const [graphData, setGraphData] = useState({});

  // async function fetchData() {
  //   const res = await fetch("/blackSGraph");
  //   const data = await res.json();
  //   setGraphData(data);
  // }
  //
  // useEffect(() => {
  //   fetchGraphData();
  // }, []);


  var ctx = "line-chart";
  var lineChart = new Chart(ctx, {
    type: 'line',
    fill: false,
    data: {
      labels: props.graphData.xLabels,
      datasets: [
        {
          label: "Call",
          data: props.graphData.yData,
          backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: false
        }
      ]
    }
  });

  return <canvas id="line-chart" width="10" height="10"></canvas>
}

export default Graph;
