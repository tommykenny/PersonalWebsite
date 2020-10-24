
import React, { useState, useEffect } from 'react';

function List() {

  const [list, setList] = useState([]);
  const [item, setItem] = useState("");

  async function fetchData() {
    const res = await fetch("/api/getList");
    const data = await res.json();
    setList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);


  function handleChange(event) {
    setItem(event.target.value);
  }

  function submitHandler() {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: item })
    };
    fetch('/api/postList', req)
    // .then(res => res.json())
    window.location.reload(false);
  }



  return (
    <div className="App">
      <h1>List of Items</h1>
      {/* Check to see if any items are found*/}
      {list.length ? (
        <div>
          {/* Render the list of items */}
          {list.map((item) => {
            return(
              <div>
                {item}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h2>No List Items Found</h2>
        </div>
      )
    }
      <input onChange={handleChange} type="text" name="holdItem" value={item}/>
      <button onClick={submitHandler}>Submit</button>
  </div>
  );
}

export default List;
