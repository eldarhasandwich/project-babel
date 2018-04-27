import React, {Component} from 'react';
import {connect} from 'react-redux'
// import {Audio} from 'redux-audio-fixed'
import { RaisedButton, Toggle, Paper } from 'material-ui';

import * as UserSessionActions from '../../Actions/userSession'
import * as EmailActions from '../../Actions/emails'
import {actions as audioActions} from 'redux-audio-fixed'

import AttendeeTableVisibilityDialog from './Dialogs/AttendeeTableVisibilityDialog';

import palette from '../../Resources/colorPalette.js'

class SelectedListInterface extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visibilityPopoverOpen: false
        }
    }

    openVisibilityPopover = () => {
        this.setState({visibilityPopoverOpen: true})
    }

    closeVisibilityPopover = () => {
        this.setState({visibilityPopoverOpen: false})
    }

    getSelectedList = () => {
        if (this.props.userSession.selectedList === null) {
            return null
        }

        return this.props.userSession.companyLists[this.props.userSession.selectedList]
    }

    attendeeSortingAllowed = () => {
        let s = this.props.state
        return s.verifiedAttendeesVisible && s.unverifiedAttendeesVisible && s.attendeesWithAudioNeedingReplacementVisible && s.attendeesWithNoAudioVisible
    }

    toggleAttendeeSorting = () => {
        this.props.allowAttendeeSorting(!this.props.userSession.attendeeSortingAllowed)
    }

    paperStyle = {
        overflow:"auto",
        height: "100%",
        width: "98%",
        marginTop: "10px",
        
        backgroundColor: palette.gray_light
    }

    textStyle = {
        textAlign: "left",
        marginLeft: "40px",
        width:"auto",
        float:"left"
    }

    buttonStyle = {
        marginTop:"5px",
        marginRight:"5px",
        float:"right"
    }

    render() {

        let selectedList = this.getSelectedList()
        return ( 
            <div style={{height:"15%", width:"100%"}}>
                <Paper style={this.paperStyle}>
                    <h2 style={this.textStyle}>{selectedList ? selectedList.listName : ""}</h2>
                    <RaisedButton
                        label={this.props.userSession.attendeeSortingAllowed ? "Lock Sorting" : "Unlock Sorting"}
                        disabled={!this.attendeeSortingAllowed()}
                        secondary={this.props.userSession.attendeeSortingAllowed}
                        onClick={this.toggleAttendeeSorting}
                        style={this.buttonStyle}
                    />
                    <RaisedButton
                        label={"Attendee Filters"}
                        onClick={this.openVisibilityPopover}
                        style={this.buttonStyle}
                    />
                </Paper>

                <AttendeeTableVisibilityDialog
                    isOpen={this.state.visibilityPopoverOpen}
                    onRequestClose={this.closeVisibilityPopover}
                />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        allowAttendeeSorting: bool => dispatch(UserSessionActions.allowAttendeeSorting(bool)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedListInterface)