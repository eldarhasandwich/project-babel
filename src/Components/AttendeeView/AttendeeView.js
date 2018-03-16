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
        let key = this.state.attendeeKey.split("#")
        if (key.length !== 2) {
            return;
        }
        this.props.pullAttendee(key[0], key[1])
    }

    unloadAttendee () {
        this.props.setLoadedStatus(false)
    }

    giveOrderPosString () {
        let orderInt = this.props.singleAttendee.singleAttendee.orderPos + 1
        let ordinalInidcator = 'th'
        switch(String(orderInt).slice(-1)[0]) {
            case '1': {
                ordinalInidcator = 'st'
                break
            }
            case '2': {
                ordinalInidcator = 'nd'
                break
            }
            case '3': {
                ordinalInidcator = 'rd'
                break
            }
        }
        return "Ceremony Order Position: " + orderInt + ordinalInidcator
    }

    render () {

        if (!this.props.singleAttendee.attendeeLoaded) {
            return (
                <div className="Attendee-key-form">
                    <p>Provide your Unique Attendee-Key...</p>
                    <input
                        style={(this.state.attendeeKey.split("#").length === 2)
                                ? this.styles.validInput
                                : this.styles.invalidInput}
                        onChange={this.updateAttendeeKey.bind(this)}/>
                    <button
                        onClick={this.submitAttendeeKey.bind(this)}>
                            Enter</button>
                </div>
            )
        }

        return (
            <div className="Attendee-view">

                <button
                    onClick={this.unloadAttendee.bind(this)}>Back</button>
                <div id="Attendee-view-body">
                    <div id="attendee-information">
                        <p id="attendee-name">{this.props.singleAttendee.singleAttendee.name}</p>
                        <p id="attendee-textA">{this.props.singleAttendee.singleAttendee.textA}</p>
                        <p id="attendee-textB">{this.props.singleAttendee.singleAttendee.textA}</p>
                        <p id="attendee-orderPos">{this.giveOrderPosString.call(this)}</p>
                    </div>                

                    <div id="attendee-buttons">
                        <button id="Review-audio-btn">Review Audio</button>
                        <button id="Upload-audio-btn">Upload Audio</button>
                    </div> 
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
        pullAttendee: (listID, attendeeID) => dispatch(SingleAttendeeActions.pullAttendee(listID, attendeeID)),
        setLoadedStatus: bool => dispatch(SingleAttendeeActions.setAttendeeLoadedStatus(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeView)