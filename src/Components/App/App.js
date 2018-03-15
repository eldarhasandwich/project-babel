import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import {connect} from 'react-redux'
import {Audio} from 'redux-audio-fixed'

import './App.css';
// import Data from "../../Classes/DataController"

import AppHeader from "./AppHeader";
import EmceeView from "../EmceeView/EmceeView";
import AdminView from "../AdminView/AdminView";
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

    render() {
        return (
            <div className="App">

                <AppHeader/> {this.generateAudioComponents()}

                <Router>
                    <div>
                        <p>
                            <Link to="emcee">Emcee View</Link>
                        </p>
                        <p>
                            <Link to="admin">Admin View</Link>
                        </p>

                        <Route
                            exact
                            path={process.env.PUBLIC_URL +'/emcee'}
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