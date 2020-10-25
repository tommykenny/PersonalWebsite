import React, {useState} from 'react';
import './Output.css';

function OutputPut(props) {

  return(

    <div>
      <div className="card output">
          <div className="card-block">
              <h2 className="card-title">Put</h2>
              <p className="card-text">Price: {props.blackSObject.putPrice}</p>
              <p className="card-text">Delta: {props.blackSObject.putDelta}</p>
              <p className="card-text">Gamma: {props.blackSObject.putGamma}</p>
              <p className="card-text">Vega: {props.blackSObject.putVega}</p>
              <p className="card-text">Theta: {props.blackSObject.putTheta}</p>
              <p className="card-text">Rho: {props.blackSObject.putRho}</p>
              <p className="card-text">Omega: {props.blackSObject.putOmega}</p>
          </div>
      </div>
    </div>
  );
}

export default OutputPut;
