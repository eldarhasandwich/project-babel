import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Dialog } from 'material-ui';

import * as EmailActions from '../../../Actions/emails'

class AttendeeEmailDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            replaceReasonText: ""
        }
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

    sendAudioReplacementEmail = message => {
        this.props.sendAudioReplacementEmail(this.props.userSession.selectedList, this.props.userSession.selectedAttendee, message)
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
                <p>{`Contact Email: ${this.getSelectedAttendee().contactEmail}`}</p>

                <p>
                    {
                        this.getSelectedAttendee().awaitingResponse
                            ? "This attendee has already been sent an Email."
                            : "This attendee has not been sent an Email yet."
                    }
                </p>

                <RaisedButton
                    label={"Send Email"}
                    onClick={this.sendAudioRequestEmail}
                    disabled={this.getSelectedAttendee().awaitingResponse}
                />

            </Dialog>
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