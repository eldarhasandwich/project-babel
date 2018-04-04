import React, {Component} from 'react';
import {connect} from 'react-redux'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { FlatButton, Dialog, TextField } from 'material-ui';

import * as UserSessionActions from '../../Actions/userSession'

class ListAttendeeTable extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            addAttendeeDialogOpen: false,
            attendeeName: "",
            attendeeEmail: ""
        }
    }

    openCreateAttendeeDialog = () => {
        this.setState({addAttendeeDialogOpen: true})
    }

    closeCreateAttendeeDialog = () => {
        this.setState({addAttendeeDialogOpen: false})
    }

    setNewAttendeeName = newName => {
        this.setState({attendeeName: newName.target.value})
    }

    setNewAttendeeEmail = newEmail => {
        this.setState({attendeeEmail: newEmail.target.value})
    }

    resetNewAttendee = () => {
        this.setState({attendeeName: "", attendeeEmail: ""})
    }

    getSelectedListAttendees = () => {
        return this.props.userSession.companyLists[this.props.userSession.selectedList]._ATTENDEES
    }

    getSortedFilteredAttendees = () => {
        let attendees = this.getSelectedListAttendees()
        if (attendees === undefined || attendees === null) {
            return []
        }

        let attendeeKeys = Object.keys(attendees)

        attendeeKeys.sort((a, b) => {
            return attendees[a].orderPos - attendees[b].orderPos
        })

        return attendeeKeys
    }
    
    submitAttendeeInfo = () => {
        if (this.state.attendeeName === "" || this.state.attendeeEmail === "") {
            return;
        }

        this.closeCreateAttendeeDialog()
        this.props.addNewAttendee(this.state.attendeeName, this.state.attendeeEmail)
        this.resetNewAttendee()
    }

    setSelectedAttendee = attendeeKey => {
        this.props.setSelectedAttendee(attendeeKey)
    }

    handleRowClick = index => {
        let attendees = this.getSortedFilteredAttendees()
        this.setSelectedAttendee(attendees[index[0]])
    }

    dialogActions = [
        <FlatButton
            label={"Add Attendee"}
            primary
            onClick={this.submitAttendeeInfo}
        />
    ]

    render () {
        return (
            <div >
                <Table
                    onRowSelection={(index) => this.handleRowClick(index)}
                    height={630}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn style={{textAlign:"center"}}>Order Position</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={false}
                        showRowHover={true}
                        >
                        {   
                            this.getSortedFilteredAttendees().map(
                                (row, index) => <ListAttendeeTableItem 
                                    itemKey={row}
                                    selectedAttendee={this.props.userSession.selectedAttendee}
                                    attendees={this.getSelectedListAttendees()}
                                    key={this.props.userSession.selectedList + row}/>
                            )
                        }
                    </TableBody>
                </Table>
                <FlatButton
                    style={{marginTop: "5px"}}
                    label={"Add new Attendee"}
                    fullWidth
                    onClick={this.openCreateAttendeeDialog}/>
                <Dialog
                    title={"Add a new Attendee to " + this.props.userSession.companyLists[this.props.userSession.selectedList].listName}
                    actions={this.dialogActions}
                    open={this.state.addAttendeeDialogOpen}
                    onRequestClose={this.closeCreateAttendeeDialog}
                >
                <div>
                    <TextField
                        floatingLabelText={"Attendee Name"}
                        value={this.state.newAttendeeName}
                        onChange={this.setNewAttendeeName}
                    />
                </div>    
                <div>
                    <TextField
                        floatingLabelText={"Contact Email"}
                        value={this.state.newAttendeeEmail}
                        onChange={this.setNewAttendeeEmail}
                    />
                </div>
                </Dialog>
            </div>
        )
    }

}

class ListAttendeeTableItem extends Component {

    itemInfo = this.props.attendees[this.props.itemKey]

    render () {
        const { order, ...otherProps } = this.props;
        return (
            <TableRow 
                { ...otherProps }
                selected={this.props.selectedAttendee === this.props.itemKey}
            >

                <TableRowColumn style={{textAlign:"center"}}>
                    {this.props.attendees[this.props.itemKey].orderPos + 1}
                </TableRowColumn>
                <TableRowColumn style={{textAlign:"center"}}>
                    {this.props.attendees[this.props.itemKey].name}
                </TableRowColumn>
                <TableRowColumn style={{textAlign:"center"}}>
                    {this.props.attendees[this.props.itemKey].audioStatus}
                </TableRowColumn>
                
            </TableRow>
        )
    }
}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        addNewAttendee: (newAttendeeName, newAttendeeEmail) => dispatch(UserSessionActions.addNewAttendee(newAttendeeName, newAttendeeEmail)),
        setSelectedAttendee: newAttendeeID => dispatch(UserSessionActions.setSelectedAttendee(newAttendeeID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAttendeeTable)