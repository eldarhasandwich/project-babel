import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Dialog, TextField } from 'material-ui';

import * as EmailActions from '../../../Actions/emails'

class AttendeeEmailDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            replaceReasonText: ""
        }
    }

    updateReplaceReasonText = newText => {
        this.setState({replaceReasonText: newText.target.value})
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

    sendAudioRequestEmail = () => {
        this.props.sendAudioRequestEmail(this.props.userSession.selectedList, this.props.userSession.selectedAttendee)
    }

    sendAudioReplacementEmail = () => {
        this.props.sendAudioReplacementEmail(this.props.userSession.selectedList, this.props.userSession.selectedAttendee, this.state.replaceReasonText)
    }

    render() {
        const dialogActions = [
            <RaisedButton
                primary
                label={"Return"}
                onClick={this.props.onRequestClose}
            />
        ]

        return (
            <Dialog
                title={`Send an Email to ${this.getSelectedAttendee().name}`}
                open={this.props.isOpen}
                actions={dialogActions}
                onRequestClose={this.props.onRequestClose}
            >
                <p style={{fontWeight:"bold"}}>{`Contact Email: ${this.getSelectedAttendee().contactEmail}`}</p>

                {

                    this.getSelectedAttendee().audioStatus === "No Audio"
                        ?   <InitialRequester
                                awaitingResponse={this.getSelectedAttendee().awaitingResponse}
                                btnOnClick={this.sendAudioRequestEmail}
                            />
                        :   <ReplacementRequester
                                awaitingResponse={this.getSelectedAttendee().awaitingResponse}
                                btnOnClick={this.sendAudioReplacementEmail}
                                textFieldValue={this.state.replaceReasonText}
                                onTextFieldChange={this.updateReplaceReasonText}
                            />

                }

            </Dialog>
        )
    }

}

class InitialRequester extends Component {

    render() {
        return (
            <div>
                <p>
                    {
                        this.props.awaitingResponse
                            ? "This attendee has already been sent an Email."
                            : "This attendee has not been sent an Email yet."
                    }
                </p>

                <RaisedButton
                    label={"Send Email"}
                    onClick={this.props.btnOnClick}
                    disabled={this.props.awaitingResponse}
                />
            </div>
        )
    }

}

class ReplacementRequester extends Component {

    replacementTextIsValid = () => {
        let l = this.props.textFieldValue.length
        if (l >= 5 && l <= 80) { 
            return true
        } return false
    }

    render() {
        return (
            <div>
                <p>
                    {
                        this.props.awaitingResponse
                            ? "This attendee has already been sent a Replacement Email."
                            : "This attendee has not been sent any Replacement Emails."
                    }
                </p>

                <p>Give a reason as to why this Attendee needs to replace their AudioClip.</p>

                <TextField
                    floatingLabelText={"Reason for Replacement..."}
                    fullWidth
                    value={this.props.textFieldValue}
                    onChange={this.props.onTextFieldChange}
                    errorText={this.replacementTextIsValid() ? null : `Must be between 5 and 80 characters`}
                    disabled={this.props.awaitingResponse}
                />

                <RaisedButton
                    label={"Send Email"}
                    onClick={this.props.btnOnClick}
                    disabled={this.props.awaitingResponse || !this.replacementTextIsValid()}
                />
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        sendAudioRequestEmail: (listID, attID) => dispatch(EmailActions.sendAudioRequestEmail(listID, attID)),
        sendAudioReplacementEmail: (l, a, message) => dispatch(EmailActions.sendAudioReplacementEmail(l, a, message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeEmailDialog)