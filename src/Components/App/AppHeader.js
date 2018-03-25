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
                    <h1 className="App-title">
                        <Link style={this.linkStyle} to="/">Project Babel {pjson.version}</Link>
                    </h1>
                </header>
            </div>
        )
    }
}


export default AppHeader;
