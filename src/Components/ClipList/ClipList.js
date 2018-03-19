import React, {Component} from 'react';
import './ClipList.css';
import {connect} from 'react-redux'
import ClipListItem from "./ClipListItem";

class ClipList extends Component {

    getSortedAttendees() {
        let attendees = this.props.attendees.attendees
        let attendeeKeys = Object.keys(attendees)
        
        attendeeKeys.sort((a, b) => {return attendees[a].orderPos - attendees[b].orderPos})

        if (!this.props.state.attendeesWithNoAudioVisible && this.props.size === "small") {
            attendeeKeys = attendeeKeys.filter(x => attendees[x].audioSrc !== null)
        }

        return attendeeKeys;
    }

    render() {
        return (
            <div className="Clip-list">

                {this.getSortedAttendees.call(this)
                    .map((item, index) => <ClipListItem
                        key={index}
                        thisItemIndex={index}
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
