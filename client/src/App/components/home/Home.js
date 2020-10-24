import React, { useState, useEffect } from 'react';
import './Home.css';
import Input from "../input/Input";
import OutputPut from "../output/OutputPut";
import OutputCall from "../output/OutputCall";
import Header from "../header/Header";


function Home() {

  const [blackSInputs, setInputs] = useState({});

  const [blackSOutput, setOutput] = useState({});

  async function fetchData() {
    const res = await fetch("/blackS");
    const data = await res.json();
    setOutput(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(input) {
    setInputs(input);
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    };
    fetch('/blackS', req)
    fetchData();
    // .then(res => res.json())
  }

  return (
    <div className="App">
      <Header />
      <div class="row">
        <div class="col-lg-4">
          <Input handleSubmit={handleSubmit} />
        </div>
        <div class="col-lg-4">
          <OutputCall blackSOutput={blackSOutput} />
        </div>
        <div class="col-lg-4">
          <OutputPut blackSOutput={blackSOutput}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
