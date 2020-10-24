const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const blackS = require('./algo/algo.js');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

var blackSObject = {};

var inputs = {
  stockPrice: 0,
  strikePrice: 0,
  dayToExpiration: 0,
  volatility: 0,
  riskFreeReturn: 0,
}

// An api endpoint that returns a short list of items
app.get('/blackS', (req,res) => {
    res.json(blackSObject);
    console.log('Sent list of items');
});

app.post('/blackS', (req, res) => {
  console.log("push Succesful");
  inputs = req.body
  console.log(inputs);
  blackSObject = blackS(inputs.dayToExpiration/365, inputs.stockPrice, inputs.strikePrice, inputs.riskFreeReturn, inputs.volatility);
  console.log(blackSObject);
  res.redirect('/blackS');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
