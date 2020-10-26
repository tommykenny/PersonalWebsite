const blackS = require('./algo.js');
const Chart = require('chart.js');
const mathjs = require('mathjs');

module.exports = function (time, stockPrice, strikePrice, riskFreeReturn, stdDev, xAxis, yAxis) {

  var time = parseFloat(time);
  var stockPrice = parseFloat(stockPrice);
  var strikePrice = parseFloat(strikePrice);
  var riskFreeReturn = parseFloat(riskFreeReturn);
  var stdDev = parseFloat(stdDev);

  console.log(xAxis);
  console.log(yAxis);

  var graphType = "blackSObject." + yAxis;
  console.log(graphType);

  var xMin = 0;
  var xMax = Math.max(stockPrice, strikePrice);
  xMax = xMax * 2;
  xMax = Math.ceil((xMax/10)) * 10;
  var interval = 0;

  if (xMax < .1) {
    interval = .001;
  }
  else if (xMax < 1) {
    interval = .01;
  }
  else if (xMax < 10) {
    interval = .1;
  }
  else if (xMax < 100) {
    interval = 1;
  }
  else if (xMax < 1000) {
    interval = 10;
  }
  else if (xMax < 10000) {
    interval = 100;
  }
  else if (xMax < 100000) {
    interval = 1000;
  }
  else if (xMax < 1000000) {
    interval = 10000;
  }

  // console.log(interval);
  // console.log(xMax);

  xLabels = [];
  yData = [];

  for (var i = xMin; i < xMax+interval; i = i + interval) {
    xLabels.push(i);
    blackSObject = blackS(time, i, strikePrice, riskFreeReturn, stdDev);
    yData.push(Math.max(eval(graphType), 0));
  }

  console.log(xLabels);
  console.log(yData);

  return {
    xLabels: xLabels,
    yData: yData
  };


}

//
// var time = 1;
// var stockPrice = 50;
// var strikePrice = 70;
// var riskFreeReturn = .01;
// var stdDev = .15;
//
// graph(time, stockPrice, strikePrice, riskFreeReturn, stdDev);
