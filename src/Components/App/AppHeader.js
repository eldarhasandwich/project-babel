import React from 'react';
//import logo from '../Resources/Images/logo.svg';
import './AppHeader.css';

var pjson = require('../../../package.json');

const AppHeader = props => (
    <div>
        <header className="App-header">
            <h1 className="App-title">Project Babel {pjson.version}</h1>
            <h3 className="App-subtitle">Testing Build</h3>
        </header>
    </div>
);

export default AppHeader;

// image object
//<img src={logo} className="App-logo" alt="logo"/>