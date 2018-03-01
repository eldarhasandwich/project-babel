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
            Project Babel is an Application that stores audio clips along with relavent
            information about attendees to award ceremonies. Ultimately, our goal is to
            increase the accuracy with which emcees pronounce names in these ceremonies.
        </p>
    </div>
);

export default AppHeader;