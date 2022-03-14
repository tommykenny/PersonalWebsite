import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import './primeDropDown.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

function PrimeDropDown(props) {
    const {
        filterHeader,
        filterOptions,
        placeholder
    } = props;

    const [selectedCity1, setSelectedCity1] = useState(placeholder);

    console.log(selectedCity1)

    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }

    return (
        <div className="dropdown-demo">
            <h6>{filterHeader}</h6>
            <Dropdown placeholder={placeholder} value={selectedCity1} options={filterOptions} onChange={onCityChange} optionLabel="name" />
        </div>
    );
}

export default PrimeDropDown;