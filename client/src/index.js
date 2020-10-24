import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from "./App/components/home/Home";

import './index.css';
import App from './App/App';

render((
    <BrowserRouter>
        <Home/>
    </BrowserRouter>
), document.getElementById('root'));
