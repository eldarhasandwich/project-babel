import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Toggle, Dialog } from 'material-ui';

import * as StateActions from '../../../Actions/state'

class AttendeeTableVisibilityDialog extends Component {

    verifiedToggle = (e, value) => {
        console.log(value)
        this.props.setVerifiedAttendeesVisible(value);
    }
    
    needsReplacementToggle = (e, value) => {
        this.props.setAttendeesWithAudioNeedingReplacementVisible(value);
    }

    unverifiedToggle = (e, value) => {
        this.props.setUnverifiedAttendeesVisible(value);
    }

    noAudioToggle = (e, value) => {
        this.props.setAttendeesWithNoAudioVisible(value);
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
                open={this.props.isOpen}
                actions={dialogActions}
                onRequestClose={this.props.onRequestClose}
            >
                <Toggle
                    label="Verified"
                    toggled={this.props.state.verifiedAttendeesVisible === true}
                    onToggle={this.verifiedToggle}
                />
                <Toggle
                    label="Needing Replacement"
                    toggled={this.props.state.attendeesWithAudioNeedingReplacementVisible === true}
                    onToggle={this.needsReplacementToggle}
                />
                <Toggle
                    label="Unverified"
                    toggled={this.props.state.unverifiedAttendeesVisible === true}
                    onToggle={this.unverifiedToggle}
                />
                <Toggle
                    label="No Audio"
                    toggled={this.props.state.attendeesWithNoAudioVisible === true}
                    onToggle={this.noAudioToggle}
                />
            </Dialog>
        )
    }

}

const mapStateToProps = state => {
    return {state: state.state}
}

const mapDispatchToProps = dispatch => {
    return {
        setVerifiedAttendeesVisible: bool => dispatch(StateActions.setVerifiedAttendeesVisible(bool)),
        setAttendeesWithAudioNeedingReplacementVisible: bool => dispatch(StateActions.setAttendeesWithAudioNeedingReplacementVisible(bool)),
        setUnverifiedAttendeesVisible: bool => dispatch(StateActions.setUnverifiedAttendeesVisible(bool)),
        setAttendeesWithNoAudioVisible: bool => dispatch(StateActions.setAttendeesWithNoAudioVisible(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeTableVisibilityDialog)