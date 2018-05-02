import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Audio} from 'redux-audio-fixed'

// import { Tab, Tabs } from 'material-ui'

import LoginView from './LoginView'
// import InstitutionInfo from './InstitutionInfo'
import AdminView from '../AdminView/AdminView'
// import MaterialEmceeView from '../EmceeView/MaterialEmceeView'

import * as userSessionActions from './../../Actions/userSession'
import NewAccountView from './NewAccountView';
// import {actions as audioActions} from 'redux-audio-fixed'

import palette from '../../Resources/colorPalette.js'
import AppHeader from '../App/AppHeader';

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
        backgroundColor : palette.blue_dark
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

        if(!compLists) {
            return null
        }

        Object.keys(compLists).forEach(
            x => {
                if (compLists[x]._ATTENDEES !== undefined) {
                    Object.keys(compLists[x]._ATTENDEES).forEach(
                        y => {
                            let attendee = compLists[x]._ATTENDEES[y]
                            if (attendee.audioStatus !== "No Audio") {
    
                                audioComponents.push(<Audio
                                    src={""}
                                    autoPlay={false}
                                    controls={false}
                                    command='none'
                                    preload={"auto"}
                                    uniqueId={`audio-${compID}~${x}~${y}`}
                                    key={`audio-${compID}~${x}~${y}`}
                                    // onLoadedData={() => this.props.loadedAudio(attendeeID)}
                                />)
                            }
                        }
                    )
                }
            }
        )

        // console.log(audioComponents)
        return audioComponents.map(
            comp => {
                return comp
            }
        )
    }

    tabStyle = {
        backgroundColor: palette.blue_dark
    }

    render() {

        if (!this.props.userSession.isLoggedIn) {
            return (<LoginView/>)
        }

        if (this.props.userSession.isLoggedIn && this.props.userSession.userCompanyName === null) {
            return <NewAccountView/>
        }

        return (
            
                <div>

                {this.generateAttendeeAudio()}

                    <AppHeader/>

                    <div style={{maxWidth:"2000px"}}>
                        <AdminView/>
                    </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(InstitutionView)
