import React from 'react';
import './Output.css';

function OutputPut(props) {

  return(

    <div>
      <div className="card output">
          <div className="card-block">
              <h2 className="card-title">Put</h2>
              <p className="card-text">Price: {props.blackSOutput.putPrice}</p>
              <p className="card-text">Delta: {props.blackSOutput.putDelta}</p>
              <p className="card-text">Gamma: {props.blackSOutput.putGamma}</p>
              <p className="card-text">Vega: {props.blackSOutput.putVega}</p>
              <p className="card-text">Theta: {props.blackSOutput.putTheta}</p>
              <p className="card-text">Rho: {props.blackSOutput.putRho}</p>
              <p className="card-text">Omega: {props.blackSOutput.putOmega}</p>
          </div>
      </div>
    </div>
  );
}

export default OutputPut;
