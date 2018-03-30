import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Audio} from 'redux-audio-fixed'

import ClipList from "../ClipList/ClipList";
import SelectedClipInterface from "./SelectedClipInterface";

import EmceeClipList from '../ClipList/EmceeClipList'

import { RaisedButton } from 'material-ui'
import { Divider } from 'material-ui'


import {actions as audioActions} from 'redux-audio-fixed'

import * as stateActions from "../../Actions/state"
import * as AttendeeActions from '../../Actions/attendees';

class MaterialEmceeView extends Component {

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
                    preload={"auto"}
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
                {this.generateAudioComponents()}
                
                <EmceeClipList/>
                <Divider/>
                <SelectedClipInterface/>

                <div>

                    <RaisedButton
                        secondary
                        onClick={this
                        .decrementIndex
                        .bind(this)}
                        disabled={!this.canDecrementIndex.call(this)}
                        label="Back"/>

                    <RaisedButton
                        secondary
                        style={{margin: "0 5px"}} 
                        onClick={this.playSelectedAudio.bind(this)}
                        disabled={!this.canPlayAudio.call(this)}
                        label="Play"/>

                    <RaisedButton
                        secondary
                        onClick={this
                        .incrementIndex
                        .bind(this)}
                        disabled={!this.canIncrementIndex.call(this)}
                        label="Next"/>

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
        loadedAudio: (attendeeID) => dispatch(AttendeeActions.loadedAudio(attendeeID)),
        playAudio: (audioId) => dispatch(audioActions.audioPlay(audioId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialEmceeView)