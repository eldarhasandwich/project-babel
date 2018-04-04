import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Audio} from 'redux-audio-fixed'
import { RaisedButton, DropDownMenu, MenuItem, Toggle } from 'material-ui';

import * as UserSessionActions from '../../Actions/userSession'
import {actions as audioActions} from 'redux-audio-fixed'


class SelectedItemInterface extends Component {

    // generateAudioComponents() {
    //     return Object
    //         .keys(this.props.attendees.attendees)
    //         .map(attendeeID => {
    //             let attendee = this.props.attendees.attendees[attendeeID]
    //             return <Audio
    //                 src={attendee.audioSrc}
    //                 autoPlay={false}
    //                 controls={false}
    //                 command='none'
    //                 preload={"auto"}
    //                 uniqueId={`audio-${attendeeID}`}
    //                 onLoadedData={() => this.props.loadedAudio(attendeeID)}/>
    //         })
    // }

    generateAttendeeAudio = () => {
        let compID = this.props.userSession.userCompanyID
        let listID = this.props.userSession.selectedList

        let selectedListAttendees = this.props.userSession.companyLists[listID]._ATTENDEES || null
        if (selectedListAttendees === null) {
            return;
        }

        return Object
            .keys(selectedListAttendees)
            .map(attendeeID => {
                let attendee = selectedListAttendees[attendeeID]
                if (attendee.audioStatus !== "No Audio") {
                    return <Audio
                        src={""}
                        autoPlay={false}
                        controls={false}
                        command='none'
                        preload={"auto"}
                        uniqueId={`audio-${compID}~${listID}~${attendeeID}`}
                        // onLoadedData={() => this.props.loadedAudio(attendeeID)}
                    />
                }
            })
    }

    getSelectedList = () => {
        if (this.props.userSession.selectedList === null) {
            return null
        }

        return this.props.userSession.companyLists[this.props.userSession.selectedList]
    }

    getSelectedAttendee = () => {
        if (this.props.userSession.selectedAttendee === null) {
            return null
        }

        return this.props.userSession
            .companyLists[this.props.userSession.selectedList]
            ._ATTENDEES[this.props.userSession.selectedAttendee]
    }

    getAudioStatusDropdownValue = () => {
        let selectedAttendee = this.getSelectedAttendee()
        if (selectedAttendee.audioStatus === "No Audio") {
            return "Unverified"
        }
        return selectedAttendee.audioStatus
    }

    getAudioStatusText = () => {
        let noAudio = "This Attendee has not supplied any Audio yet."
        let unverified = "This Attendee's Audio has not been reviewed yet." 
        let needsRep = "This Attendee's Audio needs to be replaced."
        let verified = "This Attendee's Audio is ready for use in the Ceremony."

        let selectedAttendee = this.getSelectedAttendee()
        let status = selectedAttendee.audioStatus
        
        switch (status) {
            case 'No Audio': {
                return noAudio
            }

            case 'Unverified': {
                return unverified
            }

            case 'Needs Replacement': {
                return needsRep
            }

            case 'Verified': {
                return verified
            }

            default: {
                return ""
            }
        }
    }

    handleAudioStatusChange = (event, bool) => {
        // console.log(event.target.value)
        // console.log(bool)
        this.props.updateAttendeeAudioStatus(event.target.value)
    }

    playSelectedAttendeeAudio = () => {
        let compID = this.props.userSession.userCompanyID
        let listID = this.props.userSession.selectedList
        let attID = this.props.userSession.selectedAttendee

        let audioID = `audio-${compID}~${listID}~${attID}`

        console.log(audioID)

        this.props.playAudio(audioID)
    }

    textStyle = {
        textAlign: "left",
        marginLeft: "40px"
    }

    render() {

        let selectedList = this.getSelectedList()
        if (this.props.userSession.selectedAttendee === null) {
            return ( // LIST OPTIONS
                <div>
                    <h1 style={this.textStyle}>{selectedList.listName}</h1>

                </div>
            )
        }

        let selectedAttendee = this.getSelectedAttendee()
        return ( // ATTENDEE OPTIONS
            <div>
                {this.generateAttendeeAudio()}
                <h1 style={this.textStyle}>{selectedAttendee.name}</h1>
                <h4 style={this.textStyle}>{"Order in Ceremony: " + (selectedAttendee.orderPos + 1)}</h4>

                <div style={{overflow:"auto", height:"65px"}}>
                    <RaisedButton
                        style={{float:"left", marginLeft:"40px", marginTop:"6px"}}
                        label={"Play Audio"}
                        primary
                        disabled={selectedAttendee.audioStatus === "No Audio"}
                        onClick={this.playSelectedAttendeeAudio}

                    />

                    {/* <DropDownMenu
                        style={{float:"left"}}
                        disabled={selectedAttendee.audioStatus === "No Audio"} 
                        onChange={this.handleAudioStatusChange}
                        value={this.getAudioStatusDropdownValue()}
                    >
                        <MenuItem value={"Unverified"} primaryText={"Unverified"}/>
                        <MenuItem value={"Needs Replacement"} primaryText={"Needs Replacement"}/>
                        <MenuItem value={"Verified"} primaryText={"Verified"}/>
                    </DropDownMenu> */}

                    <div style={{float:"left", marginLeft: "20px"}}>
                        <Toggle
                            value="Needs Replacement"
                            
                            disabled={selectedAttendee.audioStatus === "No Audio"}
                            toggled={selectedAttendee.audioStatus === "Needs Replacement"}
                            onToggle={this.handleAudioStatusChange}

                            style={{textAlign:"left"}}
                            labelPosition="right"
                            label="Needs Replacement"/>
                        <Toggle
                            value="Verified"

                            disabled={selectedAttendee.audioStatus === "No Audio"}
                            toggled={selectedAttendee.audioStatus === "Verified"}
                            onToggle={this.handleAudioStatusChange}

                            style={{textAlign:"left"}}
                            labelPosition="right" 
                            label="Verified"/>
                    </div>

                </div>

                <p style={{...this.textStyle, marginTop:"0px"}}>{this.getAudioStatusText()}</p>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        updateAttendeeAudioStatus: newStatus => dispatch(UserSessionActions.updateAttendeeAudioStatus(newStatus)),
        playAudio: audioID => dispatch(audioActions.audioPlay(audioID)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedItemInterface)