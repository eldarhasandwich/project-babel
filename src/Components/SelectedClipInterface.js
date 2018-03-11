import React, {Component} from 'react';
import {connect} from 'react-redux'
import './Styles/SelectedClipInterface.css';

class SelectedClipInterface extends Component {

    getSelectedAttendee () {
        let attendeeKeys = Object.keys(this.props.attendees.attendees)
        return this.props.attendees.attendees[attendeeKeys[this.props.state.selectedClipIndex]]
    }

    getSelectedAttendeeName () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return "No Names Loaded"
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

    render() {
        return (
            <div className="Selected-clip-view">

                <p id="person-name">
                    { this.getSelectedAttendeeName.call(this) }
                </p>

                <div 
                    className="Selected-clip-view-col"
                    id="col-A">
                    
                    <p id="person-id">
                        { this.getSelectedAttendeeId.call(this) }
                    </p>
                    <p id="custom-text-A">
                        { this.getSelectedAttendeeTextA.call(this) }
                    </p>

                </div>

                <div 
                    className="Selected-clip-view-col"
                    id="col-B">

                    <p id="custom-text-B">
                        { this.getSelectedAttendeeTextB.call(this) }
                    </p>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {state: state.state, attendees: state.attendees}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedClipInterface)
