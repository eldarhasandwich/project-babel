import React, {Component} from 'react';
import './ClipList.css';
import {connect} from 'react-redux'
import ClipListItem from "./ClipListItem";

class ClipList extends Component {

    filterAttendeeByState(attendee) {
        let verifiedAttendeesVisible = this.props.state.verifiedAttendeesVisible
        let unverifiedAttendeesVisible = this.props.state.unverifiedAttendeesVisible
        let attendeesWithAudioNeedingReplacementVisible = this.props.state.attendeesWithAudioNeedingReplacementVisible
        let attendeesWithNoAudioVisible = this.props.state.attendeesWithNoAudioVisible

        if (attendeesWithNoAudioVisible && attendee.audioSrc === null) {
            return true
        }

        if (attendeesWithAudioNeedingReplacementVisible && attendee.audioNeedsReplacement) {
            return true
        }

        if (unverifiedAttendeesVisible && !attendee.audioIsVerified) {
            return true
        }

        if (verifiedAttendeesVisible && attendee.audioIsVerified) {
            return true
        }

        return false
    }

    getSortedFilteredAttendees() {
        let attendees = this.props.attendees.attendees
        let attendeeKeys = Object.keys(attendees)
        
        attendeeKeys.sort((a, b) => {return attendees[a].orderPos - attendees[b].orderPos})

        if (this.props.size === "large") { return attendeeKeys }

        return attendeeKeys.filter(x => this.filterAttendeeByState(attendees[x]))
    }

    render() {
        return (
            <div className="Clip-list">

                {this.getSortedFilteredAttendees.call(this)
                    .map((item, index) => <ClipListItem
                        key={index}
                        attendee={this.props.attendees.attendees[item]}
                        itemDisplaySize={this.props.size}/>)
}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {attendees: state.attendees, state: state.state}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClipList)
