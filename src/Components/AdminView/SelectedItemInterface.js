import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, DropDownMenu, MenuItem } from 'material-ui';

import * as UserSessionActions from '../../Actions/userSession'

class SelectedItemInterface extends Component {


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
        }
    }

    handleAudioStatusChange = (event, index, value) => {
        this.props.updateAttendeeAudioStatus(value)
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
                <h1 style={this.textStyle}>{selectedAttendee.name}</h1>
                <h4 style={this.textStyle}>{"Order in Ceremony: " + (selectedAttendee.orderPos + 1)}</h4>

                <div style={{overflow:"auto", height:"80px"}}>
                    <RaisedButton
                        style={{float:"left", marginLeft:"40px", marginTop:"12px"}}
                        label={"Play Audio"}
                        primary
                        disabled={selectedAttendee.audioStatus === "No Audio"}

                    />
                    <DropDownMenu
                        style={{float:"left"}}
                        disabled={selectedAttendee.audioStatus === "No Audio"} 
                        onChange={this.handleAudioStatusChange}
                        value={this.getAudioStatusDropdownValue()}
                    >
                        <MenuItem value={"Unverified"} primaryText={"Unverified"}/>
                        <MenuItem value={"Needs Replacement"} primaryText={"Needs Replacement"}/>
                        <MenuItem value={"Verified"} primaryText={"Verified"}/>
                    </DropDownMenu>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedItemInterface)