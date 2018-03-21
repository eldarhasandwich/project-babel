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

    submitRecording = () => {
        console.log("recording submitted!")
    }

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.props.closeModal}
                    contentLabel="Example Modal">
                    <div className="modal-div">
                        <h2>Upload AudioClip</h2>
                        <button onClick={this.props.closeModal}>close</button>

                        <div className="oscilloscope">
                            oscilloscope
                            <ReactMic
                                record={this.state.recording}
                                className="sound-wave"
                                onStop={this.onStop}
                                strokeColor="#FFF"
                                backgroundColor="#222"/>
                        </div>

                        <button disabled={this.state.audio === null} id="modal-play-button">
                            play btn
                        </button>

                        <div className="modal-btn-row">
                            <button
                                disabled={this.state.recording}
                                onClick={this.startRecording}
                                id="modal-record-button">
                                record btn
                            </button>
                            <button
                                disabled={!this.state.recording}
                                onClick={this.stopRecording}
                                id="modal-stop-record-button">
                                stop btn
                            </button>
                        </div>

                        <button
                            disabled={this.state.audio === null || this.state.recording === true}
                            onClick={this.submitRecording}
                            id="modal-submit-clip-button">
                            submit btn
                        </button>
                    </div>

                </Modal>
            </div>
        );
    }
}

export default AudioRecordingModal