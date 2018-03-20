import React, {Component} from 'react';
import Modal from 'react-modal'

import './AudioRecordingModal.css'

class AudioRecordingModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            audio: null,
            recording: false
        }
    }

    startRecording() {
        this.setState({recording: true})
    }

    stopRecording() {
        this.setState({recording: false})
    }

    submitRecording() {
        console.log("recording submitted!")
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
                        </div>

                        <button
                            disabled={this.state.audio === null} 
                            id="modal-play-button">
                            play btn
                        </button>

                        <div className="modal-btn-row">
                            <button
                                disabled={this.state.recording}
                                onClick={this.startRecording.bind(this)} 
                                id="modal-record-button">
                                record btn
                            </button>
                            <button
                                disabled={!this.state.recording}
                                onClick={this.stopRecording.bind(this)}
                                id="modal-stop-record-button">
                                stop btn
                            </button>
                        </div>

                        <button
                            disabled={this.state.audio === null}
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