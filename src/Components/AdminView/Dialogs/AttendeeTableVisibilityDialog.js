import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Dialog, Checkbox } from 'material-ui';

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

    toggleOnEverything = () => {
        this.props.allowAttendeeSorting(false);
        this.props.setVerifiedAttendeesVisible(true);
        this.props.setAttendeesWithAudioNeedingReplacementVisible(true);
        this.props.setUnverifiedAttendeesVisible(true);
        this.props.setAttendeesWithNoAudioVisible(true);
    }

    areAllTogglesEnabled = () => {
        let s = this.props.state
        return s.verifiedAttendeesVisible && s.unverifiedAttendeesVisible && s.attendeesWithAudioNeedingReplacementVisible && s.attendeesWithNoAudioVisible
    }

    render() {
        const dialogActions = [
            <RaisedButton
                secondary
                label={"Show All"}
                onClick={this.toggleOnEverything}
                disabled={this.areAllTogglesEnabled()}
            />,
            <RaisedButton
                style={{marginLeft:"5px"}}
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
                <Checkbox
                    label="Verified"
                    labelPosition={"right"}
                    checked={this.props.state.verifiedAttendeesVisible === true}
                    onCheck={this.verifiedToggle}
                />
                <Checkbox
                    label="Needing Replacement"
                    labelPosition={"right"}
                    checked={this.props.state.attendeesWithAudioNeedingReplacementVisible === true}
                    onCheck={this.needsReplacementToggle}
                />
                <Checkbox
                    label="Unverified"
                    labelPosition={"right"}
                    checked={this.props.state.unverifiedAttendeesVisible === true}
                    onCheck={this.unverifiedToggle}
                />
                <Checkbox
                    label="No Audio"
                    labelPosition={"right"}
                    checked={this.props.state.attendeesWithNoAudioVisible === true}
                    onCheck={this.noAudioToggle}
                />

                <p style={{height: "20px"}}>{this.areAllTogglesEnabled() ? " " : "You cannot reorder Attendees if any are not Visible."}</p>
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