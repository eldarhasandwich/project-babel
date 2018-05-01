import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Paper } from 'material-ui';
import PieChart from 'react-minimal-pie-chart'

import palette from '../../Resources/colorPalette.js'
import AddAttendeeDialog from './Dialogs/AddAttendeeDialog';

import FileUpload from 'material-ui/svg-icons/file/file-upload'
import ActionDoneAll from 'material-ui/svg-icons/action/done-all'
import AvPlaylistPlay from 'material-ui/svg-icons/av/playlist-play'
import CommunicationContactMail from 'material-ui/svg-icons/communication/contact-mail'


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
        return Object.keys(this.getListAttendees()).length
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
        marginLeft: "20px",
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
        return ( 
            <div style={{height:"25%", width:"100%"}}>
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
                        <h4 style={{textAlign:"center", margin:"5px"}}>Action Center</h4>
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
                            label="Verification Mode"
                            labelPosition={"before"}
                            icon={<ActionDoneAll/>}
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
                        />
                        <RaisedButton
                            label="Request Attendee Audio"
                            labelPosition={"before"}
                            icon={<CommunicationContactMail/>}
                            fullWidth
                            primary
                            style={{marginBottom:"2px"}}                            
                        />
                    </div>


                    <div style={{float:"right", width:"25%", marginRight:"5px"}}>
                        <h4 style={{textAlign:"center", margin:"5px"}}>Event Details</h4>
                        <Paper style={{height:`${(4*(36+2))-2}px`, padding:"3px 5px"}} zDepth={0}>
                            <p style={{margin:"3px"}}>
                                {`Date: ${this.formatDate(this.getSelectedList().ceremonyDate)}`}
                            </p>
                            <p style={{margin:"3px"}}>
                                {`Time: ${this.formatTime(this.getSelectedList().ceremonyTime)}`}
                            </p>
                            <p style={{margin:"3px"}}>
                                {`Location: ${this.getSelectedList().ceremonyLocation}`}
                            </p>
                            <p style={{margin:"3px"}}>
                                {`Attendees: ${this.getNumberOfAttendeesInList()} expected`}
                            </p>
                            <p style={{margin:"3px"}}>
                                Notes: 
                            </p>
                        </Paper>
                    </div>


                </Paper>


                <AddAttendeeDialog
                    isOpen={this.state.addAttendeePopoverOpen}
                    onRequestClose={this.closeAddAttendeeDialog}                
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