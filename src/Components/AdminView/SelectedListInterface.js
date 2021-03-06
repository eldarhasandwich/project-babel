import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Paper } from 'material-ui';
import PieChart from 'react-minimal-pie-chart'

import palette from '../../Resources/colorPalette.js'
import AddAttendeeDialog from './Dialogs/AddAttendeeDialog';

import FileUpload from 'material-ui/svg-icons/file/file-upload'
// import ActionDoneAll from 'material-ui/svg-icons/action/done-all'
import AvPlaylistPlay from 'material-ui/svg-icons/av/playlist-play'
import CommunicationContactMail from 'material-ui/svg-icons/communication/contact-mail'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'
import DeleteListDialog from './Dialogs/DeleteListDialog.js';
import AnnouncerModeDialog from './Dialogs/AnnouncerModeDialog.js';


class SelectedListInterface extends Component {

    constructor(props) {
        super(props)

        this.state = {
            addAttendeePopoverOpen: false,
            announcerModeDialogOpen: false,
            deleteListDialogOpen: false
        }
    }

    openAddAttendeeDialog = () => {
        this.setState({addAttendeePopoverOpen: true})
    }

    closeAddAttendeeDialog = () => {
        this.setState({addAttendeePopoverOpen: false})
    }

    openAnnouncerMode = () => {
        this.setState({announcerModeDialogOpen: true})
    }

    closeAnnouncerMode = () => {
        this.setState({announcerModeDialogOpen: false})
    }
    
    openDeleteListDialog = () => {
        this.setState({deleteListDialogOpen: true})
    }

    closeDeleteListDialog = () => {
        this.setState({deleteListDialogOpen: false})
    }

    getSelectedList = () => {
        if (this.props.userSession.selectedList === null) {
            return null
        }
        let selectedList = this.props.userSession.companyLists[this.props.userSession.selectedList]
        if (!selectedList) {
            return null
        }
        return selectedList
    }

    getListAttendees = () => {
        let selectedList = this.getSelectedList()
        if (!selectedList) {
            return 0
        }
        if (!selectedList._ATTENDEES) {
            return 0
        }
        return selectedList._ATTENDEES
    }

    getNumberOfRespondedAttendees = () => {
        let attendees = this.getListAttendees()
        console.log(attendees)
        let n = Object.keys(attendees).filter(x => attendees[x].audioStatus !== "No Audio").length
        // console.log(n)
        return n
    }

    getNumberOfReplacementNeededAttendees = () => {
        let attendees = this.getListAttendees()
        return Object.keys(attendees).filter(x => attendees[x].audioStatus === "Needs Replacement").length
    }

    getNumberOfVerifiedAttendees = () => {
        let attendees = this.getListAttendees()
        return Object.keys(attendees).filter(x => attendees[x].audioStatus === "Verified").length
    }

    getNumberOfAttendeesInList = () => {
        let n = Object.keys(this.getListAttendees()).length
        return n > 0 ? n : 1;
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
        width: "97%",
        marginLeft:"1.5%",
        marginTop: "10px",
        backgroundColor: palette.gray_dark
    }

    textStyle = {
        textAlign: "left",
        marginLeft: "20px",
        marginTop: "10px",
        width:"auto",
    }

    formatDate = date => {
        let d = new Date(date)
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    }

    formatTime = time => {
        let t = new Date(time)
        var hours = t.getHours();
        var minutes = t.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    
    render() {

        let selectedList = this.getSelectedList()

        if (!selectedList) {
            return null
        }

        return ( 
            <div style={{height:"200px", width:"100%"}}>

                <Paper zDepth={2} style={this.paperStyle}>

                    <div style={{float:"left", display:"inline-block"}}>
                        <h2 style={this.textStyle}>{selectedList ? selectedList.listName : ""}</h2>
                        <div style={{marginTop:"0", marginLeft:"30px"}}>
                            <StatusPie
                                title={"Responses"}
                                color={palette.status_green}
                                number={this.getNumberOfRespondedAttendees()}
                                total={this.getNumberOfAttendeesInList()}
                            />

                            <StatusPie
                                title={"Verified"}
                                color={palette.status_yellow}
                                number={this.getNumberOfVerifiedAttendees()}
                                total={this.getNumberOfAttendeesInList()}
                            />

                            <div style={{width:"100px", height:"100%", display:"inline-block", verticalAlign:"top"}}>
                                <h4 style={{fontWeight: "normal", margin: "0", textAlign: "center"}}>
                                    Reupload Flags
                                </h4>
                                <h3 style={{marginTop: "5px", textAlign: "center"}}>
                                    {this.getNumberOfReplacementNeededAttendees()}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div style={{float:"right", width:"25%", marginRight:"5px"}}>
                        <h4 style={{textAlign:"center", marginTop:"10px", marginBottom:"5px"}}>Action Center</h4>
                        <RaisedButton
                            label={"Import Attendees"}
                            labelPosition={"before"}
                            icon={<FileUpload/>}
                            onClick={this.openAddAttendeeDialog}
                            fullWidth
                            primary
                            style={{marginBottom:"2px"}}
                        />
                        <RaisedButton
                            label="Announcer Mode"
                            labelPosition={"before"}
                            icon={<AvPlaylistPlay/>}
                            fullWidth
                            primary
                            style={{marginBottom:"2px"}}
                            onClick={this.openAnnouncerMode}

                        />
                        <RaisedButton
                            label="Request Audio"
                            labelPosition={"before"}
                            icon={<CommunicationContactMail/>}
                            fullWidth
                            primary
                            style={{marginBottom:"2px"}}    
                            disabled
                        
                        />
                        <RaisedButton
                            label="Delete List"
                            labelPosition={"before"}
                            icon={<ActionDeleteForever/>}
                            fullWidth
                            secondary
                            style={{marginBottom:"2px"}}    
                            onClick={this.openDeleteListDialog}
                        
                        />
                    </div>


                    <div style={{float:"right", width:"25%", marginRight:"5px"}}>
                        <h4 style={{textAlign:"center", marginTop:"10px", marginBottom:"5px"}}>Event Details</h4>
                        <Paper style={{height:`${(4*(36+2))-2}px`, padding:"3px 5px"}} zDepth={0}>
                            <p style={{margin:"3px", textAlign:"left"}}>
                                {`Date: ${this.formatDate(selectedList.ceremonyDate)}`}
                            </p>
                            <p style={{margin:"3px", textAlign:"left"}}>
                                {`Time: ${this.formatTime(selectedList.ceremonyTime)}`}
                            </p>
                            <p style={{margin:"3px", textAlign:"left"}}>
                                {`Location: ${selectedList.ceremonyLocation}`}
                            </p>
                            <p style={{margin:"3px", textAlign:"left"}}>
                                {`Attendees: ${this.getNumberOfAttendeesInList()} expected`}
                            </p>
                            <p style={{margin:"3px", textAlign:"left"}}>
                                Notes: 
                            </p>
                        </Paper>
                    </div>


                </Paper>


                <AddAttendeeDialog
                    isOpen={this.state.addAttendeePopoverOpen}
                    onRequestClose={this.closeAddAttendeeDialog}                
                />

                <AnnouncerModeDialog
                    isOpen={this.state.announcerModeDialogOpen}
                    onRequestClose={this.closeAnnouncerMode}
                />

                <DeleteListDialog
                    isOpen={this.state.deleteListDialogOpen}
                    onRequestClose={this.closeDeleteListDialog}
                />
            </div>
        )
    }

}

class StatusPie extends Component {
    render () {
        const percent = Math.round(((this.props.number / this.props.total)*100)*10)/10
        return (
            <div style={{width:"100px", display:"inline-block"}}>
                <h4 style={{fontWeight: "normal", margin: "0", textAlign: "center"}}>
                    {this.props.title}
                </h4>
                <PieChart
                    style={{
                        height:"80px",
                        width:"100%",
                    }}
                    radius={40}
                    startAngle={90}
                    data={[
                        { value: percent, key: 1, color: this.props.color },
                        { value: 100-percent, key: 2, color: 'white' },
                        
                    ]}
                    />
                    <h4 style={{margin:"0", textAlign: "center"}}>
                        {`${percent}%`}
                    </h4>
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