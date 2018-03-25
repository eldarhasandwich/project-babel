import React, {Component} from 'react';
import {connect} from 'react-redux';
import './EmceeView.css';
import {Audio} from 'redux-audio-fixed'

import ClipList from "../ClipList/ClipList";
import SelectedClipInterface from "./SelectedClipInterface";

import {actions as audioActions} from 'redux-audio-fixed'

import * as stateActions from "../../Actions/state"
import * as AttendeeActions from '../../Actions/attendees';


class EmceeView extends Component {

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

    canIncrementIndex() {
        return (this.props.state.selectedClipIndex < Object.keys(this.props.attendees.attendees).length - 1)
    }

    canDecrementIndex() {
        return (this.props.state.selectedClipIndex > 0)
    }

    canPlayAudio() {
        let attendees = this.props.attendees.attendees;
        let selected = Object
            .keys(attendees)
            .find(x => attendees[x].orderPos === this.props.state.selectedClipIndex)
        let selectedAttendee = attendees[selected]
        if (selectedAttendee === undefined) {
            return false
        }
        return selectedAttendee.audioLoaded
    }

    incrementIndex() {
        console.log('current:', this.props.state.selectedClipIndex)
        this
            .props
            .setSelectedClipIndex(this.props.state.selectedClipIndex + 1)
    }

    decrementIndex() {
        this
            .props
            .setSelectedClipIndex(this.props.state.selectedClipIndex - 1)
    }

    render() {
        return (
            <div>
                <ClipList
                    size={"large"}
                />

                {this.generateAudioComponents()}

                <SelectedClipInterface/>

                <div className="Interface-buttons">

                    <button
                        id="back-btn"
                        onClick={this
                        .decrementIndex
                        .bind(this)}
                        disabled={!this.canDecrementIndex.call(this)}>
                        Back
                    </button>

                    <button 
                        id="play-btn" 
                        onClick={this.playSelectedAudio.bind(this)}
                        disabled={!this.canPlayAudio.call(this)}>
                        Play
                    </button>

                    <button
                        id="next-btn"
                        onClick={this
                        .incrementIndex
                        .bind(this)}
                        disabled={!this.canIncrementIndex.call(this)}>
                        Next
                    </button>

                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {state: state.state, attendees: state.attendees}
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedClipIndex: newIndex => dispatch(stateActions.setSelectedClipIndex(newIndex)),
        setAttendeesWithNoAudioVisible: boolean => dispatch(stateActions.setAttendeesWithNoAudioVisible(boolean.target.checked)),
        loadedAudio: (attendeeID) => dispatch(AttendeeActions.loadedAudio(attendeeID)),
        playAudio: (audioId) => dispatch(audioActions.audioPlay(audioId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmceeView)