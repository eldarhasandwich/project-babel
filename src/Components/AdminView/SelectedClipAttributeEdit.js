import React, {Component} from 'react';
import {connect} from 'react-redux'
import './SelectedClipAttributeEdit.css';
import Toggle from 'react-toggle'
import './react-toggle.css'


import * as attendeeActions from '../../Actions/attendees'
import * as stateActions from '../../Actions/state'

class SelectedClipAttributeEdit extends Component {

    // constructor(props) {
    //     super(props)
    // }

    getSelectedAttendee () {
        let attendees = this.props.attendees.attendees;
        let selected = Object.keys(attendees).find(x => attendees[x].orderPos === this.props.state.selectedClipIndex)
        return attendees[selected]
    }

    getSelectedAttendeeName () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return ""
        } return attendee.name
    }

    getSelectedAttendeeId () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return ""
        } return attendee.id
    }
 
    getSelectedAttendeeTextA () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return ""
        } return attendee.textA
    }

    getSelectedAttendeeTextB () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return ""
        } return attendee.textB
    }

    updateName (newValue) {
        this.props.updateAttendeeAttribute(this.getSelectedAttendeeId(), 'name', newValue.target.value)
    }

    updateTextA (newValue) {
        this.props.updateAttendeeAttribute(this.getSelectedAttendeeId(), 'textA', newValue.target.value)        
    }

    updateTextB (newValue) {
        this.props.updateAttendeeAttribute(this.getSelectedAttendeeId(), 'textB', newValue.target.value)
    }

    render() {
        return (
            <div>
                <div className="Selected-clip-attribute-edit">

                    <div className="Attribute-edit-row">
                        <div className="Attribute-edit-col-left">
                            <p>Attendee ID:</p>
                        </div>
                        <div className="Attribute-edit-col-right">
                            <p>
                                { this.getSelectedAttendeeId.call(this) }
                            </p>
                        </div>
                    </div>

                    <div className="Attribute-edit-row">
                        <div className="Attribute-edit-col-left">
                            <p>Attendee Name:</p>
                        </div>
                        <div className="Attribute-edit-col-right">
                            <input
                                value = {this.getSelectedAttendeeName.call(this)}
                                onChange = {this.updateName.bind(this)}/>
                        </div>
                    </div>

                    <div className="Attribute-edit-row">
                        <div className="Attribute-edit-col-left">
                            <p>Text Field A:</p>
                        </div>
                        <div className="Attribute-edit-col-right">
                            <input
                                value = {this.getSelectedAttendeeTextA.call(this)}
                                onChange = {this.updateTextA.bind(this)}/>
                        </div>
                    </div>

                    <div className="Attribute-edit-row">
                        <div className="Attribute-edit-col-left">
                            <p>Text Field B:</p>
                        </div>
                        <div className="Attribute-edit-col-right">
                            <input
                                value = {this.getSelectedAttendeeTextB.call(this)}
                                onChange = {this.updateTextB.bind(this)}/>
                        </div>
                    </div>
                </div>

                <div className="List-visibility-checkboxes">
                    <div className="Toggle-w-text">
                        <Toggle
                            checked={this.props.state.verifiedAttendeesVisible}
                            onChange={this.props.setVerifiedAttendeesVisible}/>
                        <p>Show Verified Attendees</p>
                    </div>
                    <div className="Toggle-w-text">
                        <Toggle
                            checked={this.props.state.unverifiedAttendeesVisible}
                            onChange={this.props.setUnverifiedAttendeesVisible}/>
                        <p>Show Unverified Attendees</p>
                    </div>
                    <div className="Toggle-w-text">
                        <Toggle
                            checked={this.props.state.attendeesWithAudioNeedingReplacementVisible}
                            onChange={this.props.setAttendeesWithAudioNeedingReplacementVisible}/>
                        <p>Show Attendees pending Audio replacement</p>
                    </div>
                    <div className="Toggle-w-text">
                        <Toggle
                            checked={this.props.state.attendeesWithNoAudioVisible}
                            onChange={this.props.setAttendeesWithNoAudioVisible}/>
                        <p>Show Attendees with no Clips</p>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {state: state.state, attendees: state.attendees}
}

const mapDispatchToProps = dispatch => {
    return {
        updateAttendeeAttribute: (attendeeID, targetField, newValue) => dispatch(attendeeActions.updateAttendeeAttribute(attendeeID, targetField, newValue)),
        setVerifiedAttendeesVisible: boolean => dispatch(stateActions.setVerifiedAttendeesVisible(boolean.target.checked)),
        setUnverifiedAttendeesVisible: boolean => dispatch(stateActions.setUnverifiedAttendeesVisible(boolean.target.checked)),
        setAttendeesWithAudioNeedingReplacementVisible: boolean => dispatch(stateActions.setAttendeesWithAudioNeedingReplacementVisible(boolean.target.checked)),
        setAttendeesWithNoAudioVisible: boolean => dispatch(stateActions.setAttendeesWithNoAudioVisible(boolean.target.checked))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedClipAttributeEdit)
