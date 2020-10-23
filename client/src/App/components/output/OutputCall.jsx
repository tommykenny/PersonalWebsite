import React from 'react';
import './Output.css';

function OutputCall(props) {

  return(

    <div>
      <div className="card output">
          <div className="card-block">
              <h2 className="card-title">Call</h2>
              <p className="card-text">Price: {props.blackSOutput.callPrice}</p>
              <p className="card-text">Delta: {props.blackSOutput.callDelta}</p>
              <p className="card-text">Gamma: {props.blackSOutput.callGamma}</p>
              <p className="card-text">Vega: {props.blackSOutput.callVega}</p>
              <p className="card-text">Theta: {props.blackSOutput.callTheta}</p>
              <p className="card-text">Rho: {props.blackSOutput.callRho}</p>
              <p className="card-text">Omega: {props.blackSOutput.callOmega}</p>
          </div>
      </div>
    </div>
  );
}

export default OutputCall;
