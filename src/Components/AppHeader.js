import React from 'react';
import logo from '../Resources/Images/logo.svg';
import './Styles/AppHeader.css';

const AppHeader = props => (
    <div>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Project Babel v0.1.0</h1>
        </header>
        <p className="App-description">
            App Description Here.
        </p>
    </div>
);

export default AppHeader;