import React, {Component} from 'react';
import Modal from 'react-modal'

class AudioRecordingModal extends Component {

    render() {
        return (
          <div>
            <Modal
              isOpen={this.props.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.props.closeModal}
              contentLabel="Example Modal"
            >
     
              <h2>Upload AudioClip</h2>
              <button onClick={this.props.closeModal}>close</button>
              <div>I am a modal</div>
              <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
              </form>
            </Modal>
          </div>
        );
    }
}

export default AudioRecordingModal