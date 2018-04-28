import React, {Component} from 'react';
import {connect} from 'react-redux'
// import {Audio} from 'redux-audio-fixed'
import { RaisedButton, Paper } from 'material-ui';

import * as UserSessionActions from '../../Actions/userSession'
// import * as EmailActions from '../../Actions/emails'
// import {actions as audioActions} from 'redux-audio-fixed'

import AttendeeTableVisibilityDialog from './Dialogs/AttendeeTableVisibilityDialog';

import palette from '../../Resources/colorPalette.js'
import AddAttendeeDialog from './Dialogs/AddAttendeeDialog';

class SelectedListInterface extends Component {

    constructor(props) {
        super(props)

        this.state = {
            addAttendeePopoverOpen: false
        }
    }

    openAddAttendeeDialog = () => {
        this.setState({addAttendeePopoverOpen: true})
    }

    closeAddAttendeeDialog = () => {
        this.setState({addAttendeePopoverOpen: false})
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
        backgroundColor: palette.gray_dark
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
                        label={"Import Attendees"}
                        onClick={this.openAddAttendeeDialog}
                        style={this.buttonStyle}
                    />

                </Paper>


                <AddAttendeeDialog
                    isOpen={this.state.addAttendeePopoverOpen}
                    onRequestClose={this.closeAddAttendeeDialog}                
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedListInterface)