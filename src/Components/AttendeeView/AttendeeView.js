import React, {Component} from 'react';
import {connect} from 'react-redux'
import './AttendeeView.css';

import * as SingleAttendeeActions from '../../Actions/singleAttendee';

class AttendeeView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            attendeeKey: ""
        }
    }

    updateAttendeeKey (value) {
        this.setState({attendeeKey: value.target.value})
    }

    submitAttendeeKey () {
        let key = this.state.attendeeKey
        let listID = "testDir"
        let attendeeID = "N01"
        this.props.pullAttendee(listID, attendeeID)
    }

    render () {

        if (!this.props.singleAttendee.attendeeLoaded) {
            return (
                <div id="attendee-key-form">
                    <p>Provide your Unique Attendee-Key</p>
                    <input
                        onChange={this.updateAttendeeKey.bind(this)}/>
                    <button
                        onClick={this.submitAttendeeKey.bind(this)}>
                            Enter</button>
                </div>
            )
        }

        return (
            <div className="Attendee-view">

                <button>Back</button>

                <div id="attendee-information">
                    <p id="attendee-name"></p>
                    <p id="attendee-textA"></p>
                    <p id="attendee-textB"></p>
                </div>                

                <div id="attendee-buttons">
                    <button id="Review-audio-btn">Review Audio</button>
                    <button id="Upload-audio-btn">Upload Audio</button>
                </div> 
 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {singleAttendee: state.singleAttendee}
}

const mapDispatchToProps = dispatch => {
    return {
        pullAttendee: (listID, attendeeID) => dispatch(SingleAttendeeActions.pullAttendee(listID, attendeeID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeView)