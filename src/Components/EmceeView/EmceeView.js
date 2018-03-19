import React, {Component} from 'react';
import {connect} from 'react-redux';
import './EmceeView.css';

import ClipList from "../ClipList/ClipList";
import SelectedClipInterface from "./SelectedClipInterface";

import Toggle from 'react-toggle'
import './react-toggle.css'

import * as stateActions from "../../Actions/state"

class EmceeView extends Component {

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
                    size={"small"}
                />

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
                        onClick={this.props.playSelectedAudio}
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

                <div className="toggle-w-text">
                    <Toggle
                        id="show-Attendee-Toggle"
                        checked={this.props.state.attendeesWithNoAudioVisible}
                        onChange={this.props.setAttendeesWithNoAudioVisible}
                        />
                    <p>Show Attendees with no Voice Clips</p>
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
        setAttendeesWithNoAudioVisible: boolean => dispatch(stateActions.setAttendeesWithNoAudioVisible(boolean.target.checked))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmceeView)