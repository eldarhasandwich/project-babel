import React, {Component} from 'react';
import {connect} from 'react-redux'
// import {Audio} from 'redux-audio-fixed'
import { RaisedButton, Toggle } from 'material-ui';

import * as UserSessionActions from '../../Actions/userSession'
import {actions as audioActions} from 'redux-audio-fixed'

import AttendeeEmailDialog from './Dialogs/AttendeeEmailDialog'

import AVVolumeUp from 'material-ui/svg-icons/av/volume-up'
import CommunicationMail from 'material-ui/svg-icons/communication/mail-outline'

class SelectedItemInterface extends Component {

    constructor(props) {
        super(props)

        this.state = {
            attendeeEmailDialogOpen: false
        }
    }

    openAttendeeEmailDialog = () => {
        this.setState({attendeeEmailDialogOpen: true})
    }

    closeAttendeeEmailDialog = () => {
        this.setState({attendeeEmailDialogOpen: false})
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

    handleAudioStatusChange = (event) => {
        this.props.updateAttendeeAudioStatus(event.target.value)
    }

    setAudioStatusAsNeedsReplace = () => {
        this.props.updateAttendeeAudioStatus("Needs Replacement")
    }

    setAudioStatusAsVerified = () => {
        this.props.updateAttendeeAudioStatus("Verified")
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
        let attID = {
            c: this.props.userSession.userCompanyID,
            l: this.props.userSession.selectedList,
            a: this.props.userSession.selectedAttendee
        }
        return ( // ATTENDEE OPTIONS
            <div>

                <h1 style={this.textStyle}>{selectedAttendee.name}</h1>
                <h4 style={this.textStyle}>{`ID: ${attID.c}~${attID.l}~${attID.a}`}</h4>
                <h4 style={this.textStyle}>{"Order in Ceremony: " + (selectedAttendee.orderPos + 1)}</h4>

                <div style={{overflow:"auto", height:"65px"}}>
                    <RaisedButton
                        style={{float:"left", marginLeft:"40px", marginTop:"6px"}}
                        label={"Play Audio"}
                        labelPosition={"before"}
                        icon={<AVVolumeUp/>}
                        primary
                        disabled={selectedAttendee.audioStatus === "No Audio"}
                        onClick={this.playSelectedAttendeeAudio}

                    />

                    <div style={{float:"left", marginLeft: "20px"}}>
                        <Toggle
                            value="Needs Replacement"
                            
                            disabled={selectedAttendee.audioStatus === "No Audio"}
                            toggled={selectedAttendee.audioStatus === "Needs Replacement"}
                            onToggle={this.handleAudioStatusChange}

                            style={{textAlign:"left"}}
                            labelPosition="right"
                            label={
                                (selectedAttendee.audioStatus === "Needs Replacement")
                                ? "Needs Replacement"
                                : "Mark as Needing Replacement"
                            }/>
                        <Toggle
                            value="Verified"

                            disabled={selectedAttendee.audioStatus === "No Audio"}
                            toggled={selectedAttendee.audioStatus === "Verified"}
                            onToggle={this.handleAudioStatusChange}

                            style={{textAlign:"left"}}
                            labelPosition="right" 
                            label={
                                (selectedAttendee.audioStatus === "Verified")
                                ? "Verified"
                                : "Verify"
                            }/>
                    </div>

                </div>

                <p style={{...this.textStyle, marginTop:"0px"}}>{this.getAudioStatusText()}</p>

                <h4 style={{...this.textStyle, marginBottom:"5px"}}>{"Contact Email: " + (selectedAttendee.contactEmail)}</h4>

                <RaisedButton
                    style={{float:"left", marginLeft:"40px", marginTop:"6px"}}
                    label={"Send Email"}
                    labelPosition={"before"}
                    icon={<CommunicationMail/>}
                    primary
                    disabled={selectedAttendee.audioStatus === "Verified"}
                    onClick={this.openAttendeeEmailDialog}
                />

                <AttendeeEmailDialog
                    isOpen={this.state.attendeeEmailDialogOpen}
                    onRequestClose={this.closeAttendeeEmailDialog}
                />

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