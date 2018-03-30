import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import { AppBar } from 'material-ui'
import { RaisedButton } from 'material-ui'
import { Drawer, MenuItem, Subheader } from 'material-ui'

import LoginView from './LoginView'
import AdminView from '../AdminView/AdminView'
import EmceeView from '../EmceeView/EmceeView'

import MaterialEmceeView from '../EmceeView/MaterialEmceeView'

import * as userSessionActions from './../../Actions/userSession'

class InstitutionView extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            drawerOpen: false
        }
    }

    handleToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

    handleClose = () => this.setState({drawerOpen: false});  

    userLogout = () => {
        this.handleClose()
        this.props.setUserLoggedIn(false)
    }

    appBarStyle = {
        textAlign: "left",
        backgroundColor : "#222"
    }

    linkStyle = {
        color: "#222",
        textDecoration: "none"
    }

    subheaderStyle = {
        paddingLeft: "15px",
        textAlign: "left"
    }

    render() {

        if (!this.props.userSession.isLoggedIn) {
            return (<LoginView/>)
        }

        return (
            <BrowserRouter>
                <div>

                    <AppBar
                        style={this.appBarStyle}
                        title={"Name of Organisation Here"}
                        onLeftIconButtonClick={this.handleToggle}
                    />

                    <Drawer
                        docked={false}
                        // width={200}
                        open={this.state.drawerOpen}
                        onRequestChange={this.handleClose}
                    >
                        <Subheader style={this.subheaderStyle}>Navigation</Subheader>
                        <Link to="/emcee" style={this.linkStyle}>
                            <MenuItem onClick={this.handleClose}>Emcee View</MenuItem>
                        </Link>
                        <Link to="/admin" style={this.linkStyle}>
                            <MenuItem onClick={this.handleClose}>Admin View</MenuItem>
                        </Link>
                        <Subheader style={this.subheaderStyle}>Other</Subheader>
                        <MenuItem onClick={this.userLogout}>Logout</MenuItem>
                    </Drawer>

                    <Route path='/emcee' component={MaterialEmceeView}/>
                    <Route path='/admin' component={AdminView}/>

                </div>
            </BrowserRouter>
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
export default connect(mapStateToProps, mapDispatchToProps)(InstitutionView)
