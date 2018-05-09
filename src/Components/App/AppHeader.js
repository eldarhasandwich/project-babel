import React, {Component} from 'react';
// import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import './AppHeader.css';

import { RaisedButton } from 'material-ui'

import * as userSessionActions from './../../Actions/userSession'
import palette from '../../Resources/colorPalette.js'

import titlelogo from '../../Resources/Images/titlelogo.png'
import HelpDialog from '../InstitutionView/Dialogs/HelpDialog';

var pjson = require('../../../package.json');

class AppHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            helpDialogIsOpen: false
        }
    }

    openHelpDialog = () => {
        this.setState({helpDialogIsOpen: true})
    }

    closeHelpDialog = () => {
        this.setState({helpDialogIsOpen: false})
    }

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
        maxHeight:"70px"
    }
    
    titleDivStyle = {
        display: "inline-block",
        float: "left",
    }

    loginDivStyle = {
        float: "right",
        margin:"0 auto",
        marginTop:`16px`
    }

    logoStyle = {
        paddingTop:"0px",
        height: "50px"
    }

    render() {
        return (
            <div>
                <header style={this.appHeaderStyle}>

                    <div style={this.loginDivStyle}>
                        <RaisedButton
                            label={"Help"}
                            onClick={this.openHelpDialog}
                        />
                        <RaisedButton
                            style={{marginLeft:"5px"}}
                            label={"Logout"}
                            onClick={this.props.logUserOut}/>
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

                <HelpDialog
                    isOpen={this.state.helpDialogIsOpen}
                    onRequestClose={this.closeHelpDialog}
                />

            </div>
        )
    }
}

// class LoginButton extends Component {

//     render() {
//         if (this.props.isLoggedIn) {
//             return (
//                 <div style={{marginTop:`16px`, marginRight:"10px"}}>
//                     <RaisedButton
//                         label={"Logout"}
//                         onClick={this.props.logUserOut}/>
//                 </div>
//             )
//         } // if logged out
//         return (
//             <div/>
//         )
//     }
// }



const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setUserLoggedIn: bool => dispatch(userSessionActions.setUserLoggedIn(bool))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
