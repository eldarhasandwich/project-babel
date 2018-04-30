import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Dialog } from 'material-ui';

import * as EmailActions from '../../../Actions/emails'

class AttendeeEmailDialog extends Component {

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
                <h3 style={{fontWeight:"normal"}}>{`Contact Email: ${this.getSelectedAttendee().contactEmail}`}</h3>

                <RaisedButton
                    label={"Send Email"}
                    onClick={this.sendAudioRequestEmail}
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
        sendAudioRequestEmail: (listID, attID) => dispatch(EmailActions.sendAudioRequestEmail(listID, attID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeEmailDialog)