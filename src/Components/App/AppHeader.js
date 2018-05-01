import React, {Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import './AppHeader.css';

import { FlatButton } from 'material-ui'

import * as userSessionActions from './../../Actions/userSession'
import palette from '../../Resources/colorPalette.js'

import titlelogo from '../../Resources/Images/titlelogo.png'

var pjson = require('../../../package.json');

class AppHeader extends Component {

    logUserOut = () => {
        this.props.setUserLoggedIn(false)
    }

    linkStyle = {
        textDecoration: 'none',
        color: 'white',
        padding: '8px 15px',
        marginBottom:"0px"
    }

    appHeaderStyle = {
        backgroundColor: palette.blue_dark,
        overflow: "hidden",
        padding: "5px 10px",
        color: "white",
        maxHeight:"80px"
    }
    
    titleDivStyle = {
        display: "inline-block",
        float: "left",
    }

    loginDivStyle = {
        display: "inline-block",
        float: "right"
    }

    logoStyle = {
        paddingTop:"15px",
        height: "50px"
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
                        <img src={titlelogo} style={this.logoStyle} alt=""/>

                        <h2 style={{display:"inline-block"}}>
                            {pjson.version}
                        </h2>
                        <h4 style={{display:"inline-block", fontWeight: "normal", marginLeft:"15px"}}>
                            {this.props.userSession.userCompanyName}
                        </h4>

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
                <div style={{marginTop:"20px"}}>
                    <FlatButton
                        label={"Logout"}
                        style={{color: "white"}}
                        onClick={this.props.logUserOut}/>
                </div>
            )
        } // if logged out
        return (
            <div style={{marginTop:"20px"}}>
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
