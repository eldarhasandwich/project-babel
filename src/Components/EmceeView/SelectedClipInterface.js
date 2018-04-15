import React, {Component} from 'react';
import {connect} from 'react-redux'
// import './SelectedClipInterface.css';

class SelectedClipInterface extends Component {

    getSelectedAttendee () {
        // let attendees = this.props.attendees.attendees;

        let selectedList = this.props.userSession.companyLists[this.props.userSession.selectedList]
        if (selectedList === null || selectedList === undefined) {
            return null
        }
        let attendees = selectedList._ATTENDEES
        if (!attendees) {
            return null
        }
        let selected = Object.keys(attendees).find(x => attendees[x].orderPos === this.props.state.selectedClipIndex)
        return attendees[selected]
    }

    getSelectedAttendeeName () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return "No Names Loaded"
        } return attendee.name
    }

    // getSelectedAttendeeId () {
    //     let attendee = this.getSelectedAttendee()
    //     if (!attendee) {
    //         return ""
    //     } return attendee.id
    // }

    getSelectedAttendeeOrderPos () {
        let attendee = this.getSelectedAttendee()
        if (!attendee) {
            return ""
        } return "#" + (attendee.orderPos+1) + " in Order" 
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

                <h2 id="person-name">
                    { this.getSelectedAttendeeName.call(this) }
                </h2>

                <p id="person-orderPos">
                    { this.getSelectedAttendeeOrderPos.call(this) }
                </p>

                <p id="custom-text-A">
                    { this.getSelectedAttendeeTextA.call(this) }
                </p>

                <p id="custom-text-B">
                    { this.getSelectedAttendeeTextB.call(this) }
                </p>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedClipInterface)
