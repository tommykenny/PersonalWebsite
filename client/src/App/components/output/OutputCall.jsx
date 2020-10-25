import React, {useState} from 'react';
import './Output.css';

function OutputCall(props) {

  console.log(props.blackSObject.callPrice)

  return(

    <div>
      <div className="card output">
          <div className="card-block">
              <h2 className="card-title">Call</h2>
              <p className="card-text">Price: {props.blackSObject.callPrice}</p>
              <p className="card-text">Delta: {props.blackSObject.callDelta}</p>
              <p className="card-text">Gamma: {props.blackSObject.callGamma}</p>
              <p className="card-text">Vega: {props.blackSObject.callVega}</p>
              <p className="card-text">Theta: {props.blackSObject.callTheta}</p>
              <p className="card-text">Rho: {props.blackSObject.callRho}</p>
              <p className="card-text">Omega: {props.blackSObject.callOmega}</p>
          </div>
      </div>
    </div>
  );
}

export default OutputCall;
