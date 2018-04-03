import React, {Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import './AppHeader.css';

import { FlatButton } from 'material-ui'

import * as userSessionActions from './../../Actions/userSession'

var pjson = require('../../../package.json');

class AppHeader extends Component {

    logUserOut = () => {
        this.props.setUserLoggedIn(false)
    }

    linkStyle = {
        textDecoration: 'none',
        color: 'white',
        padding: '8px 15px'
    }

    appHeaderStyle = {
        backgroundColor: "#222",
        overflow: "auto",
        padding: "5px 10px",
        color: "white"
    }
    
    titleDivStyle = {
        display: "inline-block",
        float: "left"
    }

    loginDivStyle = {
        display: "inline-block",
        float: "right"
    }

    render() {
        return (
            <div>
                <header style={this.appHeaderStyle}>

                    <div style={this.loginDivStyle}>
                        <LoginButton
                            isLoggedIn={this.props.userSession.isLoggedIn}
                            logUserOut={this.logUserOut}/>
                    </div>
                    
                    <div style={this.titleDivStyle}>
                        <h1>
                            <Link style={this.linkStyle} to={process.env.PUBLIC_URL +'/'}>Project Babel {pjson.version}</Link>
                        </h1>
                    </div>
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
                    <FlatButton
                        label={"Logout"}
                        style={{color: "white"}}
                        onClick={this.props.logUserOut}/>
                </div>
            )
        } // if logged out
        return (
            <div>
                <Link style={this.linkStyle} to={process.env.PUBLIC_URL +'/institution'}>
                    <FlatButton label={"Login"} style={{color: "white"}}/>
                </Link>
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
