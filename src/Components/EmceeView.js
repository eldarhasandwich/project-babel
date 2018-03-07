import React, {Component} from 'react';
import './Styles/EmceeView.css';

import ClipList from "./ClipList";
import SelectedClipInterface from "./SelectedClipInterface";

class EmceeView extends Component {

    render () {
        return (
            <div>
                <button 
                    onClick={this.props.loadFromLocalStorage}>
                    Load From File
                </button>
                <button 
                    onClick={this.props.saveToLocalStorage}>
                    Save To File
                </button>
                <button 
                    onClick={this.props.loadFromFireBase}>
                    Load From Firebase
                </button>
                <button 
                    onClick={this.props.saveToFireBase}>
                    Save To Firebase
                </button>

                <ClipList
                    cliparray={this.props.state.audioClipArray}
                    selectedIndex={this.props.state.selectedClipIndex}/>

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