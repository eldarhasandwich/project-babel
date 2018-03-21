import React, {Component} from 'react';
import Modal from 'react-modal'
import {ReactMic} from 'react-mic';

import './AudioRecordingModal.css'

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
            console.log("Playing Audio")
            let audio = document.getElementById("record-modal-audio-player")
            console.log(audio)
            audio.play()
        }
    }

    submitRecording = () => {
        console.log("recording submitted!")
    }

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        this.setState({audio: recordedBlob.blobURL})
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.props.closeModal}
                    contentLabel="Example Modal">

                    <audio
                        id="record-modal-audio-player"
                        src={this.state.audio}/>

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

                        <button 
                            disabled={this.state.audio === null} 
                            onClick={this.previewRecording}
                            id="modal-play-button">
                            Preview Recording
                        </button>

                        <div className="modal-btn-row">
                            <button
                                disabled={this.state.recording}
                                onClick={this.startRecording}
                                id="modal-record-button">
                                Record
                            </button>
                            <button
                                disabled={!this.state.recording}
                                onClick={this.stopRecording}
                                id="modal-stop-record-button">
                                Stop
                            </button>
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

export default AudioRecordingModal