import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import {connect} from 'react-redux'
import {Audio} from 'redux-audio-fixed'

import './App.css';
// import Data from "../../Classes/DataController"

import AppHeader from "./AppHeader";
import HomePage from "../HomePage/HomePage"
import EmceeView from "../EmceeView/EmceeView";
import AdminView from "../AdminView/AdminView";
import AttendeeView from '../AttendeeView/AttendeeView';
import * as AttendeeActions from '../../Actions/attendees';
import {actions as audioActions} from 'redux-audio-fixed'

class App extends Component {

    constructor(props) {
        super(props);

        this.playSelectedAudio = this
            .playSelectedAudio
            .bind(this);

    }

    generateAudioComponents() {
        return Object
            .keys(this.props.attendees.attendees)
            .map(attendeeID => {
                let attendee = this.props.attendees.attendees[attendeeID]
                return <Audio
                    src={attendee.audioSrc}
                    autoPlay={false}
                    controls={false}
                    command='none'
                    preload={true}
                    uniqueId={`audio-${attendeeID}`}
                    onLoadedData={() => this.props.loadedAudio(attendeeID)}/>
            })
    }

    playSelectedAudio() {
        let attendees = this.props.attendees.attendees;
        let selected = Object
            .keys(attendees)
            .find(x => attendees[x].orderPos === this.props.state.selectedClipIndex)
        let selectedAttendee = attendees[selected]

        this
            .props
            .playAudio(`audio-${selectedAttendee.id}`)
    }

    linkStyle = {
        textDecoration: 'none',
        color: 'white',
        padding: '8px 15px'
        
    }

    render() {
        return (
            <div className="App">

                <AppHeader/> {this.generateAudioComponents()}

                <Router>
                    <div>
                        <div className="Route-buttons">
                            <p>
                                <Link
                                    style={this.linkStyle}
                                    to="/">Home Page</Link>
                            </p>
                            <p>
                                <Link
                                    style={this.linkStyle}
                                    to="list">List View</Link>
                            </p>
                            <p>
                                <Link
                                    style={this.linkStyle}
                                    to="admin">Admin View</Link>
                            </p>
                            <p>
                                <Link
                                    style={this.linkStyle}
                                    to="attendee">Attendee View</Link>
                            </p>
                        </div>

                        <Route
                            exact path={process.env.PUBLIC_URL +'/'}
                            render={(props) => (
                            <HomePage
                                {...props}
                                state={this.state}></HomePage>
                        )}/>
                        <Route
                            exact
                            path={process.env.PUBLIC_URL +'/list'}
                            render={(props) => (
                            <EmceeView
                                {...props}
                                state={this.state}
                                playSelectedAudio={this.playSelectedAudio}/>)}/>
                        <Route
                            path={process.env.PUBLIC_URL +'/admin'}
                            render={(props) => (
                            <AdminView
                                {...props}
                                state={this.state}></AdminView>
                        )}/>
                        <Route
                            path={process.env.PUBLIC_URL +'/attendee'}
                            render={(props) => (
                            <AttendeeView
                                {...props}
                                state={this.state}></AttendeeView>
                        )}/>
                    </div>
                </Router>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {attendees: state.attendees, state: state.state}
}

const mapDispatchToProps = dispatch => {
    return {
        loadAttendees: (listKey) => dispatch(AttendeeActions.loadAttendees(listKey)),
        loadedAudio: (attendeeID) => dispatch(AttendeeActions.loadedAudio(attendeeID)),
        playAudio: (audioId) => dispatch(audioActions.audioPlay(audioId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)