import React, {Component} from 'react';
import './Styles/App.css';
import Data from "../Classes/DataController"

import AppHeader from "./AppHeader";
import ClipList from "./ClipList";
import SelectedClipInterface from "./SelectedClipInterface";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedClipIndex: 0,
            audioClipArray: [
                {
                    audioSrc: new Audio("https://freewavesamples.com/files/E-Mu-Proteus-FX-Wacky-Snare.wav"),
                    id: "00000001",
                    name: "Mr Snare",
                    textA: "Bachelor of Arts",
                    textB: "N/A"
                }, {
                    audioSrc: new Audio("https://freewavesamples.com/files/Alesis-Fusion-Acoustic-Bass-C2.wav"),
                    id: "00000002",
                    name: "Miss Acoustic",
                    textA: "Bachelor of Engineering",
                    textB: "N/A"
                }, {
                    audioSrc: new Audio("https://freewavesamples.com/files/Alesis-Fusion-Bass-C3.wav"),
                    id: "00000003",
                    name: "Mrs Bass",
                    textA: "Bachelor of Medicine",
                    textB: "N/A"
                }
            ]
        };

        this.saveToLocalStorage = this
            .saveToLocalStorage
            .bind(this)
        this.loadFromLocalStorage = this
            .loadFromLocalStorage
            .bind(this)

        this.incrementIndex = this
            .incrementIndex
            .bind(this);
        this.decrementIndex = this
            .decrementIndex
            .bind(this);
        this.getSelectedClip = this
            .getSelectedClip
            .bind(this);
        this.playSelectedAudio = this
            .playSelectedAudio
            .bind(this);

    }

    loadFromLocalStorage() {
        var newState = Data.Read_From_Store("Project-Babel-Store");
        this.setState(newState);
        alert("Data Loaded From File!")
    }

    saveToLocalStorage() {
        Data.Write_To_Store(this.state, "Project-Babel-Store");
        alert("Data Saved To File!")
    }

    addNewClip(object) {
        // TODO: clipObjectVerification
        this.setState(prevState => ({
            audioClipArray: [
                ...prevState.audioClipArray,
                object
            ]
        }))
    }

    getSelectedClip() {
        return this.state.audioClipArray[this.state.selectedClipIndex] || null
    }

    boolCanDecrement() {
        if (this.state.selectedClipIndex < 1) {
            return false;
        }
        return true;
    }

    decrementIndex() {
        if (!this.boolCanDecrement()) {
            return;
        }
        this.setState(prevState => ({
            selectedClipIndex: prevState.selectedClipIndex - 1
        }));
    }

    boolCanIncrement() {
        if (this.state.selectedClipIndex > this.state.audioClipArray.length - 2) {
            return false;
        }
        return true;
    }

    incrementIndex() {
        if (!this.boolCanIncrement()) {
            return;
        }
        this.setState(prevState => ({
            selectedClipIndex: prevState.selectedClipIndex + 1
        }));
    }

    playSelectedAudio() {
        if (this.getSelectedClip() == null) {
            console.log("Selected Clip does not exist?");
            return;
        }
        var audio = this
        .getSelectedClip()
        .audioSrc;
        if (audio == null) {
            console.log("Audio does not exist?");
            return;
        }
        //console.log(audio.src)
        audio.play();
    }

    render() {
        return (
            <div className="App">

                <AppHeader/>

                <button onClick={this.loadFromLocalStorage}>
                    Load From File
                </button>
                <button onClick={this.saveToLocalStorage}>
                    Save To File
                </button>

                <ClipList
                    cliparray={this.state.audioClipArray}
                    selectedIndex={this.state.selectedClipIndex}/>

                <SelectedClipInterface value={this.getSelectedClip()}/>

                <div className="Interface-buttons">

                    <button
                        id="back-btn"
                        onClick={this.decrementIndex}
                        disabled={!this.boolCanDecrement()}>
                        Back
                    </button>

                    <button id="play-btn" onClick={this.playSelectedAudio}>
                        Play
                    </button>

                    <button
                        id="next-btn"
                        onClick={this.incrementIndex}
                        disabled={!this.boolCanIncrement()}>
                        Next
                    </button>

                </div>

            </div>
        );
    }
}

export default App;
