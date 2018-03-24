import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Audio} from 'redux-audio-fixed'
import AudioRecordingModal from './AudioRecordingModal'
import Loader from 'react-loader-spinner'

import './AttendeeView.css';

import * as SingleAttendeeActions from '../../Actions/singleAttendee';
import {actions as audioActions} from 'redux-audio-fixed'


class AttendeeView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            attendeeKey: "",
            modalIsOpen: false
            // showIncorrectCodeMessage: false
        }

        this.playAttendeeAudio = this.playAttendeeAudio.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }


    accessParamKey() {
        let search = this.props.location.search
        let params = new URLSearchParams(search)
        let attKey = params.get('_attKey')
        return attKey
    }   

    updateAttendeeKey (input) {
        this.setState({attendeeKey: input.target.value})
    }

    setAttendeeKey (newValue) {
        this.setState({attendeeKey: newValue})
    }

    submitAttendeeKey () {
        if (this.state.attendeeKey === null) {
            return;
        }
        let key = this.state.attendeeKey.split("_")
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
            preload={"auto"}
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

    componentWillMount () {
        let attendeeKey = this.accessParamKey()
        this.setAttendeeKey(attendeeKey)
    }

    componentDidMount () {
        window.history.replaceState(null, null, window.location.pathname);
        this.submitAttendeeKey()
    }

    render () {
        if (!this.props.singleAttendee.attendeeLoaded) {
            return (
                <div className="Attendee-key-form">
                    <p>Provide your Unique Attendee-Key:</p>

                    {(this.props.singleAttendee.attendeeInfoIsLoading)
                        ?(<LoaderWithText
                            loaderType="Bars"
                            loadingText="Loading this Key..."/>)

                        :(<AttendeeKeyInputField
                            value={this.state.attendeeKey}
                            updateAttendeeKey={this.updateAttendeeKey.bind(this)}
                            submitAttendeeKey={this.submitAttendeeKey.bind(this)}
                            showIncorrectKeyMsg={this.props.singleAttendee.showIncorrectKeyMsg}/>)
                    }
                </div>
            )
        }

        if (this.props.singleAttendee.audioIsUploading) {
            return (
                <LoaderWithText
                    loaderType="Bars"
                    loadingText="Uploading Voiceclip..."/>
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

class LoaderWithText extends Component {
    render() {
        return (<div>
            <Loader
                type={this.props.loaderType}
                color="#222"/>
            <p>{this.props.loadingText}</p>
        </div>)
    }
}

class AttendeeKeyInputField extends Component {
    render() {
        return (<div>
                <input
                    value={this.props.value}
                    onChange={this.props.updateAttendeeKey}/>
                <button
                    onClick={this.props.submitAttendeeKey}>
                        Enter</button>
                <p>
                    {(this.props.showIncorrectKeyMsg)
                        ? "The Attendee-Key you entered was Incorrect, Please try again."
                        : ""}
                </p>
            </div>
        )
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