import React, {Component} from 'react';
import {connect} from 'react-redux'
import Modal from 'react-modal'
import {ReactMic} from 'react-mic';
import Loader from 'react-loader-spinner'

import './AudioRecordingModal.css'

import * as SingleAttendeeActions from '../../Actions/singleAttendee';

class AudioRecordingModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            audio: null,
            recording: false
        }
    }

    startRecording = () => {
        this.setState({recording: true})
    }

    stopRecording = () => {
        this.setState({recording: false})
    }

    previewRecording = () => {
        if (this.state.audio !== null) {
            let audio = document.getElementById("record-modal-audio-player")
            audio.src = this.state.audio.blobURL
            audio.play()
        }
    }

    submitRecording = () => {
        console.log("recording submitted!")
        this.props.uploadAudioBlobToFirebase(this.state.audio.blob)
        this.props.closeModal()
    }

    onData(recordedBlob) {
        // console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        
        this.setState({audio: recordedBlob})
    }

    render() {

        if (this.props.singleAttendee.audioIsUploading) {
            return (<div>
                <Loader
                    type="Bars"
                    color="#222"/>
                <p>Uploading Your Voiceclip</p>
            </div>)
        }

        return (
            <div>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.props.closeModal}
                    contentLabel="Example Modal">

                    <audio
                        id="record-modal-audio-player"/>

                    <div className="modal-div">
                        <button id="close-modal-btn" onClick={this.props.closeModal}>Close</button>
                        <h2>Upload Voiceclip</h2>
                        <h3>{this.props.thisAttendeeName}</h3>

                        <div className="oscilloscope">
                            <ReactMic
                                record={this.state.recording}
                                className="sound-wave"
                                onStop={this.onStop}
                                strokeColor="#FFF"
                                backgroundColor="#222"/>
                        </div>

                        <div className="modal-play-button">
                            <button 
                                disabled={this.state.audio === null || this.state.recording} 
                                onClick={this.previewRecording}>
                                Preview Recording
                            </button>
                        </div>

                        <div className="modal-btn-row">
                            <div>
                                <button
                                    disabled={this.state.recording}
                                    onClick={this.startRecording}
                                    id="modal-record-button">
                                    Record
                                </button>
                            </div>
                            <div>
                                <button
                                    disabled={!this.state.recording}
                                    onClick={this.stopRecording}
                                    id="modal-stop-record-button">
                                    Stop
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={this.state.audio === null || this.state.recording === true}
                            onClick={this.submitRecording}
                            id="modal-submit-clip-button">
                            Submit This Clip
                        </button>
                    </div>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {singleAttendee: state.singleAttendee}
}

const mapDispatchToProps = dispatch => {
    return {
        uploadAudioBlobToFirebase: blob => dispatch(SingleAttendeeActions.uploadAudioBlobToFirebase(blob))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioRecordingModal)