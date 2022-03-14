import React, { useState, useEffect } from 'react';
import './Home.css';
import Input from "../input/Input";
import OutputPut from "../output/OutputPut";
import OutputCall from "../output/OutputCall";
import Header from "../header/Header";
import Graph from "../graph/Graph";
import GraphInput from "../graphInput/GraphInput";
import DropDown from "../dropDown/DropDown";
import PrimeDropDown from '../primeDropDown/primeDropDown'



function Home() {

  const [blackSInputs, setInputs] = useState({});

  const [blackSObject, setOutput] = useState({});
  const [graphData, setGraphData] = useState([]);

  console.log(blackSObject);
  console.log(graphData);

  async function fetchBlackSData() {
    const res = await fetch("/blackSValues");
    const data = await res.json();
    setOutput(data);
  }

  async function fetchGraphData() {
    const res = await fetch("/graphData");
    const graphData = await res.json();
    setGraphData(graphData);
  }

  useEffect(() => {
    fetchBlackSData();
    fetchGraphData();
  }, []);

  function handleSubmit(input) {
    setInputs(input);
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    };
    fetch('/blackS', req);
    fetchBlackSData();
    fetchGraphData();
  }



  return (
    <div className="App">
      <div class="App-header" >
        <Header />
      </div>
      <div class="row">
        <div class="col-lg-5">
          <div class="row inputComponent">
            <div class="col-lg-12">
              <Input handleSubmit={handleSubmit} />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-4">
                  <PrimeDropDown placeholder={'Call'} filterHeader={"Option Type"} filterOptions={[
            { name: 'Call', code: 'call' },
            { name: 'Put', code: 'put' }]} />
                </div>
                <div class="col-lg-4">
                <PrimeDropDown placeholder={'Stock Price'} filterHeader={"X-axis variable"} filterOptions={[
            { name: 'Stock Price', code: 'stockPrice' },
            { name: 'Strike Price', code: 'strikePrice' },
            { name: 'Option Price', code: 'optionPrice' },
            { name: 'Delta', code: 'Delta' },
            { name: 'Gamma', code: 'Gamma' },
            { name: 'Vega', code: 'Vega' },
            { name: 'Theta', code: 'Theta' },
            { name: 'Rho', code: 'Rho' },
            { name: 'Omega', code: 'Omega' }]} />
                </div>
                <div class="col-lg-4">
                <PrimeDropDown placeholder={"Option Price"} filterHeader={"Y-axis variable"} filterOptions={[
            { name: 'Stock Price', code: 'stockPrice' },
            { name: 'Strike Price', code: 'strikePrice' },
            { name: 'Option Price', code: 'optionPrice' },
            { name: 'Delta', code: 'Delta' },
            { name: 'Gamma', code: 'Gamma' },
            { name: 'Vega', code: 'Vega' },
            { name: 'Theta', code: 'Theta' },
            { name: 'Rho', code: 'Rho' },
            { name: 'Omega', code: 'Omega' }]} />
                </div>
              </div>
              {/* <DropDown /> */}
            </div>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="row">
            <div class="col-lg-6">
              <OutputCall blackSObject={blackSObject} />
            </div>
            <div class="col-lg-6">
              <OutputPut blackSObject={blackSObject}/>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 graph">
              <Graph graphData={graphData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
