import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Toggle, Dialog } from 'material-ui';

import * as StateActions from '../../../Actions/state'
import * as UserSessionActions from '../../../Actions/userSession'

class AttendeeTableVisibilityDialog extends Component {

    verifiedToggle = (e, value) => {
        this.props.allowAttendeeSorting(false);
        this.props.setVerifiedAttendeesVisible(value);
    }
    
    needsReplacementToggle = (e, value) => {
        this.props.allowAttendeeSorting(false);
        this.props.setAttendeesWithAudioNeedingReplacementVisible(value);
    }

    unverifiedToggle = (e, value) => {
        this.props.allowAttendeeSorting(false);
        this.props.setUnverifiedAttendeesVisible(value);
    }

    noAudioToggle = (e, value) => {
        this.props.allowAttendeeSorting(false);
        this.props.setAttendeesWithNoAudioVisible(value);
    }

    allTogglesEnabled = () => {
        let s = this.props.state
        return s.verifiedAttendeesVisible && s.unverifiedAttendeesVisible && s.attendeesWithAudioNeedingReplacementVisible && s.attendeesWithNoAudioVisible
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
                title={"Show Attendees by Audio Status"}
                open={this.props.isOpen}
                actions={dialogActions}
                onRequestClose={this.props.onRequestClose}
            >
                <Toggle
                    label="Verified"
                    labelPosition={"right"}
                    toggled={this.props.state.verifiedAttendeesVisible === true}
                    onToggle={this.verifiedToggle}
                />
                <Toggle
                    label="Needing Replacement"
                    labelPosition={"right"}
                    toggled={this.props.state.attendeesWithAudioNeedingReplacementVisible === true}
                    onToggle={this.needsReplacementToggle}
                />
                <Toggle
                    label="Unverified"
                    labelPosition={"right"}
                    toggled={this.props.state.unverifiedAttendeesVisible === true}
                    onToggle={this.unverifiedToggle}
                />
                <Toggle
                    label="No Audio"
                    labelPosition={"right"}
                    toggled={this.props.state.attendeesWithNoAudioVisible === true}
                    onToggle={this.noAudioToggle}
                />

                <p>{this.allTogglesEnabled() ? null : "You cannot reorder Attendees if any are not Visible."}</p>
            </Dialog>
        )
    }

}

const mapStateToProps = state => {
    return {state: state.state}
}

const mapDispatchToProps = dispatch => {
    return {
        allowAttendeeSorting: bool => dispatch(UserSessionActions.allowAttendeeSorting(bool)),

        setVerifiedAttendeesVisible: bool => dispatch(StateActions.setVerifiedAttendeesVisible(bool)),
        setAttendeesWithAudioNeedingReplacementVisible: bool => dispatch(StateActions.setAttendeesWithAudioNeedingReplacementVisible(bool)),
        setUnverifiedAttendeesVisible: bool => dispatch(StateActions.setUnverifiedAttendeesVisible(bool)),
        setAttendeesWithNoAudioVisible: bool => dispatch(StateActions.setAttendeesWithNoAudioVisible(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeTableVisibilityDialog)