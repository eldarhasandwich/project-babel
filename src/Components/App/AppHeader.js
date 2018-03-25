import React, {Component} from 'react';
import {Link} from "react-router-dom"
import './AppHeader.css';

var pjson = require('../../../package.json');


class AppHeader extends Component {

    linkStyle = {
        textDecoration: 'none',
        color: 'white',
        padding: '8px 15px'
    
    }
    
    render() {
        return (
            <div>
                <header className="App-header">
                    <h1 className="App-title">Project Babel {pjson.version}</h1>
    
                    <nav className="Route-buttons">
                        <p>
                            <Link style={this.linkStyle} to="/home">Home Page</Link>
                        </p>
                        <p>
                            <Link style={this.linkStyle} to="/attendee">Attendee View</Link>
                        </p>
                    </nav>
                </header>
            </div>
        )
    }
}


export default AppHeader;
