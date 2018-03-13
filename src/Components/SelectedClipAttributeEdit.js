import React, {Component} from 'react';
import {connect} from 'react-redux'
import './Styles/SelectedClipAttributeEdit.css';

import * as attendeeActions from '../Actions/attendees'

class SelectedClipAttributeEdit extends Component {

    constructor(props) {
        super(props)
    }

    getSelectedAttendee () {
        let attendees = this.props.attendees.attendees;
        let selected = Object.keys(attendees).find(x => attendees[x].orderPos === this.props.state.selectedClipIndex)
        return attendees[selected]
    }

    getSelectedAttendeeName () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return null
        } return attendee.name
    }

    getSelectedAttendeeId () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return null
        } return attendee.id
    }
 
    getSelectedAttendeeTextA () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return null
        } return attendee.textA
    }

    getSelectedAttendeeTextB () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return null
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
                            disabled
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
                            disabled
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
                            disabled
                            value = {this.getSelectedAttendeeTextB.call(this)}
                            onChange = {this.updateTextB.bind(this)}/>
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
        updateAttendeeAttribute: (attendeeID, targetField, newValue) => dispatch(attendeeActions.updateAttendeeAttribute(attendeeID, targetField, newValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedClipAttributeEdit)
