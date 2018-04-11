// import React, {Component} from 'react';
// import './ClipList.css';
// import {connect} from 'react-redux'
// import ClipListItem from "./ClipListItem";

// class ClipList extends Component {

//     filterAttendeeByState(attendee) {
//         let verifiedAttendeesVisible = this.props.state.verifiedAttendeesVisible
//         let unverifiedAttendeesVisible = this.props.state.unverifiedAttendeesVisible
//         let attendeesWithAudioNeedingReplacementVisible = this.props.state.attendeesWithAudioNeedingReplacementVisible
//         let attendeesWithNoAudioVisible = this.props.state.attendeesWithNoAudioVisible

//         let hasAudio = (attendee.audioSrc !== null)
//         let verified = (attendee.audioIsVerified)
//         let needsReplacement = (attendee.audioNeedsReplacement)

//         if (attendeesWithNoAudioVisible && !hasAudio) {
//             return true
//         }

//         if (verifiedAttendeesVisible && hasAudio && verified) {
//             return true
//         }
        
//         if (unverifiedAttendeesVisible && hasAudio && !verified && !needsReplacement) {
//             return true
//         }

//         if (attendeesWithAudioNeedingReplacementVisible && hasAudio && !verified && needsReplacement) {
//             return true
//         }

//         return false
//     }

//     getSortedFilteredAttendees() {
//         let attendees = this.props.attendees.attendees
//         let attendeeKeys = Object.keys(attendees)
        
//         attendeeKeys.sort((a, b) => {return attendees[a].orderPos - attendees[b].orderPos})

//         if (this.props.size === "large") { return attendeeKeys }

//         return attendeeKeys.filter(x => this.filterAttendeeByState(attendees[x]))
//     }

//     render() {
//         return (
//             <div className="Clip-list">

//                 {this.getSortedFilteredAttendees.call(this)
//                     .map((item, index) => <ClipListItem
//                         key={index}
//                         attendee={this.props.attendees.attendees[item]}
//                         itemDisplaySize={this.props.size}/>)
// }

//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {attendees: state.attendees, state: state.state}
// }

// const mapDispatchToProps = dispatch => {
//     return {}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ClipList)
