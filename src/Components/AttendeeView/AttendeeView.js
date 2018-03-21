import React, {Component} from 'react';
import {connect} from 'react-redux'
import './AttendeeView.css';
import {Audio} from 'redux-audio-fixed'
import AudioRecordingModal from './AudioRecordingModal'

import * as SingleAttendeeActions from '../../Actions/singleAttendee';
import {actions as audioActions} from 'redux-audio-fixed'


class AttendeeView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            attendeeKey: "",
            modalIsOpen: false
        }

        this.playAttendeeAudio = this.playAttendeeAudio.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
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
            default : {}
        }
        return "Ceremony Order Position: " + orderInt + ordinalInidcator
    }

    getAttendeeAudio() {
        // console.log("generating audio")
        let url = this.props.singleAttendee.singleAttendee.audioSrc
        console.log(url)
        return <Audio
            src={url}
            autoPlay={false}
            controls={false}
            command='none'
            preload={true}
            uniqueId={`attendeeView-Audio`}/>
    }

    playAttendeeAudio() {
        // console.log("playing audio")
        this.props.playAudio('attendeeView-Audio')
    }

    openModal() {
        this.setState({modalIsOpen: true})
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    render () {

        if (!this.props.singleAttendee.attendeeLoaded) {
            return (
                <div className="Attendee-key-form">
                    <h4>If you find this without Eldar's permission please go back (please)</h4>
                    <p>Provide your Unique Attendee-Key:</p>
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
                {this.getAttendeeAudio()}

                <button
                    onClick={this.unloadAttendee.bind(this)}>Back</button>
                <div id="Attendee-view-body">
                    <div id="attendee-information">
                        <p id="attendee-name">{this.props.singleAttendee.singleAttendee.name}</p>
                        <p id="attendee-textA">{this.props.singleAttendee.singleAttendee.textA}</p>
                        <p id="attendee-textB">{this.props.singleAttendee.singleAttendee.textB}</p>
                        <p id="attendee-orderPos">{this.giveOrderPosString.call(this)}</p>
                    </div>                

                    <div id="attendee-buttons">
                        <button
                            onClick={this.playAttendeeAudio}
                            disabled={this.props.singleAttendee.singleAttendee.audioSrc === null}
                            id="Review-audio-btn">
                                Review Audio</button>
                        <button
                            onClick={this.openModal} 
                            id="Upload-audio-btn">Upload Audio</button>
                    </div>

                <AudioRecordingModal
                    thisAttendeeName={this.props.singleAttendee.singleAttendee.name}
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}/>

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
        setLoadedStatus: bool => dispatch(SingleAttendeeActions.setAttendeeLoadedStatus(bool)),
        playAudio: (audioId) => dispatch(audioActions.audioPlay(audioId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeView)