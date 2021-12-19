import React, { useState} from 'react';
import { createPopper } from '@popperjs/core';

function DropDown({title, items, multiSelect = false}) {
  const [open, setOpen] = useState(false);
  const[selection, setSelection] = useState([]);

  function handleOnClick(item) {

  }

  const topCategory = ["Option Type", "X-axis", "y-axis"];
  const navList = topCategory.map(navList => {
    return (
      <button
        className="btn btn-primary dropdown-toggle mr-1"
        data-toggle="dropdown"
        type="button"
      >
        {navList}
      </button>
    );
  });
  //
  // return {
  //   <div className="dd-wrapper">
  //     <div
  //     tabIndex={0}
  //     className="dd-header"
  //     role="button"
  //     onKeyPress={() => toggle(!open)}
  //     onClick={() => toggle(!open)}>
  //     </div>
  //
  //   </div>
  // }

  return (
    <div className="App container">
      <div className="row py-3">
        <div className="col-12">
          <div className="dropdown">
            {navList}
            <div class="dropdown-menu">
              <a class="dropdown-item" id='call'>
                Call
              </a>
              <a class="dropdown-item" id='put'>
                Put
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
