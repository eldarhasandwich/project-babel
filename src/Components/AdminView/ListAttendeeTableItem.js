import React, {Component} from 'react';
import {connect} from 'react-redux'

import {Paper} from 'material-ui';

import * as UserSessionActions from '../../Actions/userSession'
import * as EmailActions from '../../Actions/emails'
import {actions as audioActions} from 'redux-audio-fixed'

import SelectedItemInterface from './SelectedItemInterface'
import palette from '../../Resources/colorPalette';

// import palette from '../../Resources/colorPalette.js'

class ListAttendeeTableItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hovered: false
        }
    }

    setHovered = () => {
        this.setState({hovered: true})
    }

    setNotHovered = () => {
        this.setState({hovered: false})
    }

    setSelectedAttendee = () => {
        if (this.props.userSession.attendeeSortingAllowed) {
            return;
        }
        this
            .props
            .setSelectedAttendee(this.props.itemKey)
    }

    isSelected = () => {
        return this.props.selectedAttendee === this.props.itemKey
    }

    itemInfo = this.props.attendees[this.props.itemKey]

    getPaperStyle = () => { 
        return {  
            width: "95%",
            margin: "auto",
            padding: "12px",
            cursor: this.isSelected() || this.props.userSession.attendeeSortingAllowed ? null : "pointer",
            overflow:"hidden",
            background: this.isSelected() ? palette.green_dark : this.state.hovered ? "lightblue" : "white",
            height: this.isSelected() ? "450px" : "45px"
        }
    }

    render() {

        return (
            <Paper 
                style={this.getPaperStyle()} 
                zDepth={this.props.isDragging ? 5 : 1}
                onClick={this.setSelectedAttendee}
                onMouseEnter={this.setHovered}
                onMouseLeave={this.setNotHovered}
            >
                {
                    !this.isSelected()
                        ? <CondensedAttendeeView
                                itemKey={this.props.itemKey}
                                itemInfo={this.props.attendees[this.props.itemKey]}/>
                        : <SelectedItemInterface/>
                }



            </Paper>
        )
    }
}

class CondensedAttendeeView extends Component {
    render () {
        return (
            <div>
                <p style={{float:"left", margin:"0 3px"}}>{`${this.props.itemInfo.orderPos + 1}: ${this.props.itemInfo.name}`}</p>
                <p style={{float:"right", margin:"0 3px"}}>{this.props.itemInfo.audioStatus}</p>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedAttendee: attendeeKey => dispatch(UserSessionActions.setSelectedAttendee(attendeeKey)),
        updateAttendeeAudioStatus: newStatus => dispatch(UserSessionActions.updateAttendeeAudioStatus(newStatus)),
        playAudio: audioID => dispatch(audioActions.audioPlay(audioID)),
        sendAudioRequestEmail: (compID, listID, attID) => dispatch(EmailActions.sendAudioRequestEmail(compID, listID, attID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAttendeeTableItem)