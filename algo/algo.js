const mathjs = require('mathjs');
const distributions = require('distributions');
var normal = distributions.Normal(0, 1);

function cdfNormal (x, mean, standardDeviation) {
  return (1 - mathjs.erf((mean - x ) / (Math.sqrt(2) * standardDeviation))) / 2;
}

function calcPhi(x) {
  var m = Math.sqrt(2 * Math.PI);
  var e = Math.exp(-Math.pow(x, 2) / 2);
  var phi = e / m;
  return phi;
}

module.exports = function(time, stockPrice, strikePrice, riskFreeReturn, stdDev) {
  var time = parseFloat(time);
  var stockPrice = parseFloat(stockPrice);
  var strikePrice = parseFloat(strikePrice);
  var riskFreeReturn = parseFloat(riskFreeReturn);
  var stdDev = parseFloat(stdDev);

  // var xmin = 0;
  // var xmax = Math.max(stockPrice, strikePrice);
  // xmax = xmax * 2;
  // console.log(xmax);
  // xmax = Math.ceil((xmax/10)) * 10;
  // console.log(xmax)

  // console.log(time, stockPrice, strikePrice, riskFreeReturn, stdDev);

  //Calculated values
  var d1 = ((Math.log(stockPrice/strikePrice))+(riskFreeReturn+(.5*(Math.pow(stdDev,2))))*time)/(stdDev*(Math.pow(time,.5)));
  var d2 = d1-(stdDev*(Math.pow(time,.5)));
  var normD1 = cdfNormal(d1, 0, 1);
  var normD2 = cdfNormal(d2, 0, 1);

  //Option prices
  var callPrice = (stockPrice * normD1)-(strikePrice*(Math.exp((-1*riskFreeReturn)))*normD2);
  var putPrice = callPrice+(strikePrice/(Math.exp(riskFreeReturn*time)))-stockPrice;

  //GREEKS
  //CALL GREEKS
  var callDelta = normD1;
  var callGamma = normal.pdf(d1)/(stockPrice*stdDev*Math.pow(time, .5));
  var callVega = .01 * stockPrice * normal.pdf(d1) * Math.pow(time, .5);
  // var callTheta = ((-(stockPrice * calcPhi(d1) * stdDev)/(2 * Math.sqrt(time)))-(riskFreeReturn * strikePrice * Math.pow(Math.E, (-riskFreeReturn * time)) * cdfNormal(d2, 0, 1)))/365;
  var callTheta = ((-1 * stdDev * stockPrice * normal.pdf(d1) / (2 * Math.sqrt(time)) - strikePrice * riskFreeReturn * Math.pow(Math.E, -1 * riskFreeReturn * time) * cdfNormal(d2, 0, 1)))/365;

  //callTheta = .01 * (-(stockPrice*normal.pdf(d1)*stdDev/(2*Math.pow(time,.5))) - (riskFreeReturn * strikePrice * Math.exp(-riskFreeReturn * time) * cdfNormal(d2, 0, 1)));
  var callRho = .01 * strikePrice * time * Math.exp(-riskFreeReturn * time) * cdfNormal(d2, 0, 1);
  //PUT GREEKS
  var putDelta = -(cdfNormal(-d1, 0, 1));
  var putGamma = callGamma;
  var putVega = callVega;
  var putTheta = (-(stockPrice * normal.pdf(d1) * stdDev / (2 * Math.pow(time,.5))) + (riskFreeReturn * strikePrice * Math.exp(-riskFreeReturn * time) * cdfNormal(-d2, 0, 1)))/365;
  var putRho = .01 * (-time * strikePrice * Math.exp(-riskFreeReturn * time) * cdfNormal(-d2, 0, 1));

  if (callPrice === 0) {
    callPrice = .01;
  }
  if (putPrice === 0) {
    putPrice = .01;
  }

  //Leverage
  var callOmega = normD2 * (stockPrice / callPrice);
  var putOmega = (normD2 - 1) * (stockPrice / putPrice);


  var blackSObj = {
    callPrice: callPrice.toFixed(4),
    putPrice: putPrice.toFixed(4),
    callDelta: callDelta.toFixed(4),
    callGamma: callGamma.toFixed(4),
    callVega: callVega.toFixed(4),
    callTheta: callTheta.toFixed(4),
    callRho: callRho.toFixed(4),
    callOmega: callOmega.toFixed(4),
    putDelta: putDelta.toFixed(4),
    putGamma: putGamma.toFixed(4),
    putVega: putVega.toFixed(4),
    putTheta: putTheta.toFixed(4),
    putRho: putRho.toFixed(4),
    putOmega: putOmega.toFixed(4)
  }

  return blackSObj;
}
