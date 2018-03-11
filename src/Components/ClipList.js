import React, {Component} from 'react';
import './Styles/ClipList.css';
import {connect} from 'react-redux'
import ClipListItem from "./ClipListItem";

class ClipList extends Component {

    getSortedAttendees () {
        let attendees = this.props.attendees.attendees
        let attendeeKeys = Object.keys(attendees)
        attendeeKeys.sort((a,b) =>
            attendees[a] -= attendees[b])
        return attendeeKeys;
    }

    render() {
        return (
            <div className="Clip-list">

                {Object
                    .keys(this.props.attendees.attendees)
                    .map((item, index) => <ClipListItem
                        key={index}
                        attendee={this.props.attendees.attendees[item]}
                        index={index}/>)
}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {attendees: state.attendees}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClipList)
