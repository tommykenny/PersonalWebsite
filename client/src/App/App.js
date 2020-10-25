import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import List from './components/List';

function App() {
  const App = () => (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/list' component={List}/>
      </Switch>
    </div>
  )
  return (
    <Switch>
      <App/>
    </Switch>
  );
}

export default App;

//
//
// import React, { useState, useEffect } from 'react';
// import './Home.css';
// import Input from "../input/Input";
// import OutputPut from "../output/OutputPut";
// import OutputCall from "../output/OutputCall";
// import Header from "../header/Header";
// import Graph from "../graph/Graph";
//
//
// function Home() {
//
//   const [blackSInputs, setInputs] = useState({});
//
//   const [blackSValues, setOutput] = useState({});
//   const [graphData, setGraphData] = useState({});
//   //
//   console.log(blackSValues);
//   // console.log(graphData);
//
//   async function fetchData() {
//     const res = await fetch("/blackS");
//     const data = await res.json();
//     // console.log(data.blackSOutput);
//     // console.log(data.graphData);
//     setGraphData(data.graphData);
//     setOutput(data.blackSOutput);
//   }
//
//   useEffect(() => {
//     fetchData();
//   }, []);
//
//   function handleSubmit(input) {
//     setInputs(input);
//     const req = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(input)
//     };
//     fetch('/blackS', req)
//     fetchData();
//     // .then(res => res.json())
//   }
//
//
//
//   return (
//     <div className="App">
//       <Header />
//       <div class="row">
//         <div class="col-lg-4">
//           <Input handleSubmit={handleSubmit} />
//         </div>
//         <div class="col-lg-4">
//           <OutputCall blackSValues={blackSValues} />
//         </div>
//         <div class="col-lg-4">
//           <OutputPut blackSValues={blackSValues}/>
//         </div>
//       </div>
//       <div class="row">
//         <div class="col-lg-6 graph">
//           <Graph graphData={graphData}/>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default Home;
