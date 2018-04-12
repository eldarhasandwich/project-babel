import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Audio} from 'redux-audio-fixed'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import { AppBar } from 'material-ui'
import { Drawer, MenuItem, Subheader } from 'material-ui'

import LoginView from './LoginView'
import AdminView from '../AdminView/AdminView'
import MaterialEmceeView from '../EmceeView/MaterialEmceeView'

import * as userSessionActions from './../../Actions/userSession'
// import {actions as audioActions} from 'redux-audio-fixed'


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

    generateAttendeeAudio = () => {
        let compID = this.props.userSession.userCompanyID
        let compLists = this.props.userSession.companyLists

        let audioComponents = []

        Object.keys(compLists).forEach(
            x => {
                // console.log("ListID: " + x)
                Object.keys(compLists[x]._ATTENDEES).forEach(
                    y => {
                        // console.log("AttendeeID: " + y)
                        let attendee = compLists[x]._ATTENDEES[y]
                        if (attendee.audioStatus !== "No Audio") {
                            // console.log("HAS AUDIO")

                            audioComponents.push(<Audio
                                src={""}
                                autoPlay={false}
                                controls={false}
                                command='none'
                                preload={"auto"}
                                uniqueId={`audio-${compID}~${x}~${y}`}
                                // onLoadedData={() => this.props.loadedAudio(attendeeID)}
                            />)
                        }
                    }
                )
            }
        )

        // console.log(audioComponents)
        return audioComponents.map(
            comp => {
                return comp
            }
        )
    }

    render() {

        if (!this.props.userSession.isLoggedIn) {
            return (<LoginView/>)
        }

        return (
            <BrowserRouter>

                <div>

                {this.generateAttendeeAudio()}

                    <AppBar
                        style={this.appBarStyle}
                        title={this.props.userSession.userCompanyName}
                        onLeftIconButtonClick={this.handleToggle}
                    />

                    <Drawer
                        docked={false}
                        // width={200}
                        open={this.state.drawerOpen}
                        onRequestChange={this.handleClose}
                    >
                        <Subheader style={this.subheaderStyle}>Navigation</Subheader>
                        <Link to={process.env.PUBLIC_URL + '/emcee'} 
                            style={this.linkStyle}>
                            <MenuItem onClick={this.handleClose}>Emcee View</MenuItem>
                        </Link>
                        <Link to={process.env.PUBLIC_URL + '/admin'}
                            style={this.linkStyle}>
                            <MenuItem onClick={this.handleClose}>Admin View</MenuItem>
                        </Link>
                        <Subheader style={this.subheaderStyle}>Other</Subheader>
                        <MenuItem onClick={this.userLogout}>Logout</MenuItem>
                    </Drawer>

                    <Route path={process.env.PUBLIC_URL + '/emcee'} component={MaterialEmceeView}/>
                    <Route path={process.env.PUBLIC_URL + '/admin'} component={AdminView}/>

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
