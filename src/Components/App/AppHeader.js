import React, {Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import './AppHeader.css';

import * as userSessionActions from './../../Actions/userSession'

var pjson = require('../../../package.json');

class AppHeader extends Component {

    logUserOut () {
        this.props.setUserLoggedIn(false)
        
    }

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

                    <LoginButton
                        isLoggedIn={this.props.userSession.isLoggedIn}
                        logUserOut={this.logUserOut.bind(this)}/>
                </header>
            </div>
        )
    }
}

class LoginButton extends Component {
    linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <p
                        onClick={this.props.logUserOut}>
                        Logout
                    </p>
                </div>
            )
        } // if logged out
        return (
            <div>
                <p>
                    <Link style={this.linkStyle} to="/institution">Login</Link>   
                </p>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setUserLoggedIn: bool => dispatch(userSessionActions.setUserLoggedIn(bool))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
