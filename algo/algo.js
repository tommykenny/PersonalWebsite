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


  console.log(time, stockPrice, strikePrice, riskFreeReturn, stdDev);

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

//test Theta

// function _stdNormDensity(x)
// {
//   return Math.pow(Math.E, -1 * Math.pow(x, 2) / 2) / Math.sqrt(2 * Math.PI);
// }
//
// function _doubleFactorial(n)
// {
//   var val = 1;
//   for(var i = n; i > 1; i-=2)
//   {
//     val *= i;
//   }
//   return val;
// }
//
// function stdNormCDF(x)
// {
//   var probability = 0;
//   // avoid divergence in the series which happens around +/-8 when summing the
//   // first 100 terms
//   if(x >= 8)
//   {
//     probability = 1;
//   }
//   else if(x <= -8)
//   {
//     probability = 0;
//   }
//   else
//   {
//     for(var i = 0; i < 100; i++)
//     {
//       probability += (Math.pow(x, 2*i+1)/_doubleFactorial(2*i+1));
//     }
//     probability *= Math.pow(Math.E, -0.5*Math.pow(x, 2));
//     probability /= Math.sqrt(2*Math.PI);
//     probability += 0.5;
//   }
//   return probability;
// }

// var callTheta = -1 * stdDev * stockPrice * _stdNormDensity(w) / (2 * Math.sqrt(time)) - strikePrice * riskFreeReturn * Math.pow(Math.E, -1 * riskFreeReturn * time) * stdNormCDF(w - stdDev * Math.sqrt(time));
