import React, { useState, useEffect } from 'react';
import './Home.css';
import Input from "../input/Input";
import OutputPut from "../output/OutputPut";
import OutputCall from "../output/OutputCall";
import Header from "../header/Header";
import Graph from "../graph/Graph";
import GraphInput from "../graphInput/GraphInput";


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
    fetch('/blackS', req)
    fetchBlackSData();
    fetchGraphData();
  }



  return (
    <div className="App">
      <div class="App-header" >
        <Header />
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="row">
            <div class="col-lg-12">
              <Input handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
        <div class="col-lg-8">
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
