import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Audio} from 'redux-audio-fixed'

// import ClipList from "../ClipList/ClipList";

import AdminListSelect from '../AdminView/AdminListSelect'

import SelectedClipInterface from "./SelectedClipInterface";
import EmceeClipList from '../ClipList/EmceeClipList'

import {RaisedButton} from 'material-ui'
import {Divider} from 'material-ui'

import {actions as audioActions} from 'redux-audio-fixed'

import * as stateActions from "../../Actions/state"
import * as AttendeeActions from '../../Actions/attendees';

class MaterialEmceeView extends Component {

    getSelectedList = () => {
        let companyLists = this.props.userSession.companyLists
        if (!companyLists) {
            return null
        }
        let list = companyLists[this.props.userSession.selectedList]
        if (!list) {
            return null
        }
        return list
    }

    getSelectedAttendee = () => {
        let list = this.getSelectedList()
        if (!list) {
            return null
        }
        let attendees = list._ATTENDEES
        if (!attendees) {
            return null
        }

        let selectedAttID = Object.keys(attendees).find(
            attkey => {
                return attendees[attkey].orderPos === this.props.state.selectedClipIndex
            }
        )

        return {
            id: selectedAttID,
            body: attendees[selectedAttID]
        }
    }

    playSelectedAudio() {
        let selectedAttendee = this.getSelectedAttendee()
        let attID = {
            c: this.props.userSession.userCompanyID,
            l: this.props.userSession.selectedList,
            a: selectedAttendee.id
        }

        let audioID = `audio-${attID.c}~${attID.l}~${attID.a}`

        this
            .props
            .playAudio(audioID)
    }
    
    canPlayAudio() {
        let selectedAttendee = this.getSelectedAttendee()
        if (!selectedAttendee) {
            return false
        }

        if (selectedAttendee !== undefined || selectedAttendee !== null) {
            return selectedAttendee.body.audioStatus !== "No Audio"
        } 

        return false
    }

    canIncrementIndex() {
        let list = this.getSelectedList()
        if (!list) {
            return false
        }
        let attendees = list._ATTENDEES
        if (!attendees) {
            return false
        }
        return (this.props.state.selectedClipIndex < Object.keys(attendees).length - 1)
    }

    canDecrementIndex() {
        return (this.props.state.selectedClipIndex > 0)
    }

    incrementIndex = () => {
        // console.log('current:', this.props.state.selectedClipIndex)
        this
            .props
            .setSelectedClipIndex(this.props.state.selectedClipIndex + 1)
    }

    decrementIndex = () => {
        this
            .props
            .setSelectedClipIndex(this.props.state.selectedClipIndex - 1)
    }

    getSelectedListName = () => {
        let lists = this.props.userSession.companyLists
        if (!lists) {
            return "No lists created. Create one in Admin View and populate it with Attendees"
        }

        let selectedList = lists[this.props.userSession.selectedList]
        if (!selectedList) {
            return "No list Selected. Select one in Admin View"
        }

        return selectedList.listName
    }

    render() {
        return (
            <div style={{height:(window.innerHeight - 150) + "px", overflow: "hidden"}}>
                <div style={{width:"25%", float:"left", height:"100%"}}>
                    <AdminListSelect
                        newListButton={false}
                    />
                </div>

                <div style={{width:"73%", float:"right", height:"100%", paddingLeft:"2%"}}>
                    <h3>
                        {
                            this.getSelectedListName()
                        }
                    </h3>

                    <EmceeClipList/>
                    <Divider/>
                    <SelectedClipInterface/>

                    <div>

                        <RaisedButton
                            secondary
                            onClick={this.decrementIndex}
                            disabled={!this
                            .canDecrementIndex
                            .call(this)}
                            label="Back"/>

                        <RaisedButton
                            secondary
                            style={{
                                margin: "0 5px"
                            }}
                            onClick={this
                            .playSelectedAudio
                            .bind(this)}
                            disabled={!this
                            .canPlayAudio
                            .call(this)}
                            label="Play"/>

                        <RaisedButton
                            secondary
                            onClick={this.incrementIndex}
                            disabled={!this
                            .canIncrementIndex
                            .call(this)}
                            label="Next"/>

                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {state: state.state, attendees: state.attendees, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedClipIndex: newIndex => dispatch(stateActions.setSelectedClipIndex(newIndex)),
        loadedAudio: (attendeeID) => dispatch(AttendeeActions.loadedAudio(attendeeID)),
        playAudio: (audioId) => dispatch(audioActions.audioPlay(audioId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialEmceeView)