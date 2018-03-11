import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Styles/EmceeView.css';

import ClipList from "./ClipList";
import SelectedClipInterface from "./SelectedClipInterface";

import * as stateActions from "../Actions/state"

class EmceeView extends Component {

    canIncrementIndex() {
        return (this.props.state.selectedClipIndex < Object.keys(this.props.attendees.attendees).length - 1)
    }

    canDecrementIndex() {
        return (this.props.state.selectedClipIndex > 0)
    }

    incrementIndex() {
        console.log('current:', this.props.state.selectedClipIndex)
        this
            .props
            .setSelectedClipIndex(this.props.state.selectedClipIndex + 1)
    }

    decrementIndex() {
        this
            .props
            .setSelectedClipIndex(this.props.state.selectedClipIndex - 1)
    }

    render() {
        return (
            <div>
                <ClipList/>

                <SelectedClipInterface/>

                <div className="Interface-buttons">

                    <button
                        id="back-btn"
                        onClick={this
                        .decrementIndex
                        .bind(this)}
                        disabled={!this.canDecrementIndex.call(this)}>
                        Back
                    </button>

                    <button id="play-btn" onClick={this.props.playSelectedAudio}>
                        Play
                    </button>

                    <button
                        id="next-btn"
                        onClick={this
                        .incrementIndex
                        .bind(this)}
                        disabled={!this.canIncrementIndex.call(this)}>
                        Next
                    </button>

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
        setSelectedClipIndex: newIndex => dispatch(stateActions.setSelectedClipIndex(newIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmceeView)