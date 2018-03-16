import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ClipListItem.css';

import * as stateActions from "../../Actions/state"
import * as attendeeActions from "../../Actions/attendees"

class ClipListItem extends Component {

    constructor(props) {
        super(props)
        this.setSelectedIndexAsSelf = this
            .setSelectedIndexAsSelf
            .bind(this)
        this.switchPositionWithLowerIndex = this
            .switchPositionWithLowerIndex
            .bind(this)
        this.switchPositionWithHigherIndex = this
            .switchPositionWithHigherIndex
            .bind(this)
    }

    styles = {
        selected: {
            backgroundColor: "lightblue"
        },
        notSelected: {}
    }

    setSelectedIndexAsSelf() {
        this
            .props
            .setSelectedClipIndex(this.props.attendee.orderPos)
    }

    switchPositionWithLowerIndex() {
        let targetIndex = this.props.attendee.orderPos - 1;
        this.switchThisIndexWithIndex(targetIndex);
    }

    switchPositionWithHigherIndex() {
        let targetIndex = this.props.attendee.orderPos + 1;
        this.switchThisIndexWithIndex(targetIndex);
    }

    switchThisIndexWithIndex(targetIndex) {
        let thisAttendee = this.props.attendee.id;

        let attendees = this.props.attendees.attendees
        let attendeeKeys = Object.keys(attendees)
        let targetKey = attendeeKeys.find(x => attendees[x].orderPos === targetIndex)

        this
            .props
            .swapAttendeeOrderPosition(thisAttendee, targetKey)
    }

    render() {
        if (this.props.itemDisplaySize === "small") {
            return (
                <div
                    className="List-item"
                    style={(this.props.attendee.orderPos === this.props.state.selectedClipIndex)
                    ? this.styles.selected
                    : this.styles.notSelected}>

                    <p>{(this.props.attendee.audioLoaded)
                            ? "Loaded"
                            : "Downloading"}</p>
                    <p id="item-name">{this.props.attendee.name}</p>
                    <p id="item-id">{this.props.attendee.textA}</p>

                </div>
            )
        }

        return (
            <div
                className="List-item-small"
                style={(this.props.attendee.orderPos === this.props.state.selectedClipIndex)
                ? this.styles.selected
                : this.styles.notSelected}>

                <p>{this.props.attendee.orderPos + 1 + ". " + this.props.attendee.name + " (" + this.props.attendee.id + ")"
}</p>

                <button
                    onClick={this.switchPositionWithHigherIndex}
                    disabled={true/*this.props.attendee.orderPos === Object.keys(this.props.attendees.attendees).length-1*/}>
                    Shift Down
                </button>

                <button
                    onClick={this.switchPositionWithLowerIndex}
                    disabled={true/*this.props.attendee.orderPos === 0*/}>
                    Shift Up
                </button>

                <button onClick={this.setSelectedIndexAsSelf}>
                    Select
                </button>

            </div>

        );
    }

}

const mapStateToProps = state => {
    return {state: state.state, attendees: state.attendees}
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedClipIndex: newIndex => dispatch(stateActions.setSelectedClipIndex(newIndex)),
        swapAttendeeOrderPosition: (attendeeA_ID, attendeeB_ID) => dispatch(attendeeActions.swapAttendeeOrderPosition(attendeeA_ID, attendeeB_ID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClipListItem)
