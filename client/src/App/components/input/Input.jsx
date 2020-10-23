import React, { useState} from 'react';
import './Input.css';


function Input(props) {

  const [inputs, setInput] = useState({
    stockPrice: null,
    strikePrice: null,
    dayToExpiration: null,
    volatility: null,
    riskFreeReturn: null,
  });

  function handleChange(event) {
    const { name, value } = event.target;
  setInput(prevValues => {
    return {
      ...prevValues,
      [name]: value
    };
  });
}


  return (

    <div className="card output">
      <div className="card-block">
        <form onSubmit={() => {
          props.handleSubmit(inputs);
        }} class="input">
          <div class="form-group">
            <label>Stock Price</label>
              <input onChange={handleChange} type="text" class="form-control" id="stockPrice" name="stockPrice" value={inputs.stockPrice} placeholder="Enter Stock Price"></input>
          </div>
          <div class="form-group">
            <label>Strike Price</label>
              <input onChange={handleChange} name="strikePrice" value={inputs.strikePrice} type="text" class="form-control" id="strikePrice" placeholder="Enter Strike Price"></input>
          </div>
          <div class="form-group">
            <label>Days to Expiration</label>
              <input onChange={handleChange} name="dayToExpiration" value={inputs.dayToExpiration} type="text" class="form-control" id="days" placeholder="Enter Days"></input>
          </div>
          <div class="form-group">
            <label>Volatility</label>
              <input onChange={handleChange} name="volatility" value={inputs.volatility} type="text" class="form-control" id="volatility" placeholder="Enter Volatility"></input>
          </div>
          <div class="form-group">
            <label>Risk Free Return</label>
              <input onChange={handleChange} name="riskFreeReturn" value={inputs.riskFreeReturn} type="text" class="form-control" id="riskFreeReturn" placeholder="Enter Risk Free Return"></input>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Input;
