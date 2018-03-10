import React, {Component} from 'react';
import './Styles/EmceeView.css';

import ClipList from "./ClipList";
import SelectedClipInterface from "./SelectedClipInterface";

class EmceeView extends Component {

    render () {
        return (
            <div>
                <ClipList
                    cliparray={this.props.state.audioClipArray}/>

                <SelectedClipInterface 
                    value={this.props.getSelectedClip()}
                />

                <div className="Interface-buttons">

                    <button
                        id="back-btn"
                        onClick={this.props.decrementIndex}
                        disabled={!this.props.boolCanDecrement()}>
                        Back
                    </button>

                    <button 
                        id="play-btn" 
                        onClick={this.props.playSelectedAudio}
                        disabled={
                            (this.props.getSelectedClip())
                                ? !this.props.getSelectedClip().canPlay
                                : true
                        }>
                        Play
                    </button>

                    <button
                        id="next-btn"
                        onClick={this.props.incrementIndex}
                        disabled={!this.props.boolCanIncrement()}>
                        Next
                    </button>

                </div>
            </div>
        );
    }
}

export default EmceeView;