const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const blackS = require('./algo/algo.js');
const graph = require('./algo/graph.js');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

var blackSOutput = {};
var graphData = {};


var inputs = {
  stockPrice: 0,
  strikePrice: 0,
  dayToExpiration: 0,
  volatility: 0,
  riskFreeReturn: 0,
}

// An api endpoint that returns a short list of items
app.get('/blackSValues', (req,res) => {
  res.json(blackSOutput);
  console.log('Sent list of items');
});

app.get('/graphData', (req,res) => {
  res.json(graphData);
  console.log('Sent graph data');
});

app.post('/blackS', (req, res) => {
  console.log("push Succesful");
  inputs = req.body
  blackSOutput = blackS(inputs.dayToExpiration/365, inputs.stockPrice, inputs.strikePrice, inputs.riskFreeReturn, inputs.volatility);
  graphData = graph(inputs.dayToExpiration/365, inputs.stockPrice, inputs.strikePrice, inputs.riskFreeReturn, inputs.volatility);

  res.redirect('/blackSValues');
});

// Handles any requests that don't match the ones above
app.get('/*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
