import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import {connect} from 'react-redux'
import {Audio} from 'redux-audio-fixed'


import './Styles/App.css';
import Data from "../Classes/DataController"

import AppHeader from "./AppHeader";
import EmceeView from "./EmceeView";
import AdminView from "./AdminView";
import AttendeeView from "./AttendeeView";
import * as AttendeeActions from '../Actions/attendees';
import { actions as audioActions } from 'redux-audio-fixed'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedClipIndex: 0,
            audioClipArray: [
                // {
                //     audioSrc: new Audio(""),
                //     canPlay: false,
                //     id: "00000001",
                //     name: "Mr Snare",
                //     textA: "Bachelor of Arts",
                //     textB: "N/A"
                // }, {
                //     audioSrc: new Audio(""),
                //     id: "00000002",
                //     name: "Miss Acoustic",
                //     textA: "Bachelor of Engineering",
                //     textB: "N/A"
                // }, {
                //     audioSrc: new Audio(""),
                //     id: "00000003",
                //     name: "Mrs Bass",
                //     textA: "Bachelor of Medicine",
                //     textB: "N/A"
                // }
            ]
        };

        this.saveToLocalStorage = this
            .saveToLocalStorage
            .bind(this);
        this.loadFromLocalStorage = this
            .loadFromLocalStorage
            .bind(this);
        this.loadFromFireBase = this
            .loadFromFireBase
            .bind(this);
        this.saveToFireBase = this
            .saveToFireBase
            .bind(this);

        this.ThisSetState = this
            .ThisSetState
            .bind(this);

        this.incrementIndex = this
            .incrementIndex
            .bind(this);
        this.decrementIndex = this
            .decrementIndex
            .bind(this);
        this.getSelectedClip = this
            .getSelectedClip
            .bind(this);
        this.setSelectedIndex = this
            .setSelectedIndex
            .bind(this);
        this.playSelectedAudio = this
            .playSelectedAudio
            .bind(this);

    }

    getAudioComponents () {
        return Object.keys(this.props.attendees.attendees).map(attendeeID => {
            let attendee = this.props.attendees.attendees[attendeeID]
            console.log('audio src:', attendee.audioSrc)
            return <Audio
                src={attendee.audioSrc}
                autoPlay={false}
                controls={false}
                command='none'
                preload={true}  
                uniqueId={`audio-${attendeeID}`}
            />
        })
    }

    loadFromLocalStorage() {
        var newState = Data.Read_From_Store();
        this.setState(newState);
        alert("Data Loaded From File!");
    }

    saveToLocalStorage() {
        Data.Write_To_Store(this.state);
        alert("Data Saved To File!");
    }

    ThisSetState(newState) {
        this.setState(newState);
    }

    loadFromFireBase() {
        Data.Read_From_FireBase(this.ThisSetState);
        this.props.loadAttendees(Data.databaseDir);
        //alert("Data Read From Server!");
    }

    saveToFireBase() {
        Data.Write_To_FireBase(this.state)
        //alert("Data Saved To Server!");
    }

    addNewClip(object) {
        // TODO: clipObjectVerification
        this.setState(prevState => ({
            audioClipArray: [
                ...prevState.audioClipArray,
                object
            ]
        }))
    }

    getSelectedClip() {
        return this.state.audioClipArray[this.state.selectedClipIndex] || null
    }

    boolCanDecrement() {
        if (this.state.selectedClipIndex < 1) {
            return false;
        }
        return true;
    }

    decrementIndex() {
        if (!this.boolCanDecrement()) {
            return;
        }
        this.setState(prevState => ({
            selectedClipIndex: prevState.selectedClipIndex - 1
        }));
    }

    boolCanIncrement() {
        if (this.state.selectedClipIndex > this.state.audioClipArray.length - 2) {
            return false;
        }
        return true;
    }

    incrementIndex() {
        if (!this.boolCanIncrement()) {
            return;
        }
        this.setState(prevState => ({
            selectedClipIndex: prevState.selectedClipIndex + 1
        }));
    }

    setSelectedIndex (newIndex) {
        // console.log(newIndex.target.value)
        this.setState(prevState => ({
           selectedClipIndex: newIndex
        }))
    }

    playSelectedAudio() {
        if (this.getSelectedClip() == null) {
            console.log("Selected Clip does not exist?");
            return;
        }
        var audio = this
        .getSelectedClip()
        .audioSrc;
        if (audio == null) {
            console.log("Audio does not exist / Is not loaded?");
            return;
        }

        // document.querySelectorAll('')

        console.log('audio-N' + this.getPlayerFromIndex(this.props.state.selectedClipIndex))

        this.props.playAudio(`audio-N${this.getPlayerFromIndex(this.props.state.selectedClipIndex)}`)
    }

    getPlayerFromIndex (index) {
        let s = ''

        index = index + 1

        if (index < 10) {
            s += '0' + index
        } else {
            s += index
        }

        return s
    }

    render() {
        return (
            <div className="App">

                <AppHeader/>

                {this.getAudioComponents()}

                <Router>
                    <div>
                        <p>
                            <Link to="/">Emcee View</Link>
                        </p>
                        <p>
                            <Link to="admin">Admin View</Link>
                        </p>
                        <p>
                            <Link to="attendee">Attendee View</Link>
                        </p>

                        <Route 
                            exact path="/" 
                            render={(props) => (
                                <EmceeView {...props}
                                state={this.state}
                                getSelectedClip={this.getSelectedClip}
                                boolCanDecrement={this.boolCanDecrement}
                                boolCanIncrement={this.boolCanIncrement}
                                incrementIndex={this.incrementIndex}
                                decrementIndex={this.decrementIndex}
                                playSelectedAudio={this.playSelectedAudio}/>
                            )}
                        />
                        <Route 
                            path="/admin" 
                            render={(props) => (
                                <AdminView {...props}
                                state={this.state}
                                loadFromLocalStorage={this.loadFromLocalStorage}
                                saveToLocalStorage={this.saveToLocalStorage}
                                loadFromFireBase={this.loadFromFireBase}
                                saveToFireBase={this.saveToFireBase}
                                setSelectedIndex={this.setSelectedIndex}>
                                </AdminView>
                            )}
                        />
                        <Route
                            path="/attendee"
                            render={(props) => (
                                <AttendeeView {...props}
                                state={this.state}
                                />
                            )}
                        />
                    </div>
                </Router>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        attendees: state.attendees,
        state: state.state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadAttendees: (listKey) => dispatch(AttendeeActions.loadAttendees(listKey)),
        playAudio: (audioId) => dispatch(audioActions.audioPlay(audioId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)