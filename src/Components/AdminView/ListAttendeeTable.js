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
            attendeeName: ""
        }
    }

    openCreateAttendeeDialog = () => {
        this.setState({addAttendeeDialogOpen: true})
    }

    closeCreateAttendeeDialog = () => {
        this.setState({addAttendeeDialogOpen: false})
    }

    setNewAttendeeName = newName => {
        console.log(newName.target.value)
        this.setState({attendeeName: newName.target.value})
    }

    resetNewAttendeeName = () => {
        this.setState({attendeeName: ""})
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
    
    addNewAttendee = newAttendeeName => {
        this.closeCreateAttendeeDialog()
        this.props.addNewAttendee(this.state.attendeeName)
        this.resetNewAttendeeName()
    }

    dialogActions = [
        <FlatButton
            label={"Add Attendee"}
            primary
            onClick={this.addNewAttendee}
        />
    ]

    render () {
        return (
            <div>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn style={{textAlign:"center"}}>Order Position</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {   
                            this.getSortedFilteredAttendees().map(
                                (row, index) => <ListAttendeeTableItem 
                                    itemKey={row} 
                                    attendees={this.getSelectedListAttendees()}
                                    key={this.props.userSession.selectedList + row}/>
                            )
                        }
                    </TableBody>
                </Table>
                <FlatButton
                    style={{marginTop: "5px"}}
                    label={"Add new Attendee"}
                    onClick={this.openCreateAttendeeDialog}/>
                <Dialog
                    title="Add a New Attendee to this List"
                    actions={this.dialogActions}
                    open={this.state.addAttendeeDialogOpen}
                    onRequestClose={this.closeCreateAttendeeDialog}
                >
                    <TextField
                        floatingLabelText={"Attendee Name"}
                        value={this.state.newAttendeeName}
                        onChange={this.setNewAttendeeName}
                    />
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
            <TableRow { ...otherProps }>
                {otherProps.children[0] /* checkbox passed down from Table-Body*/}
                <TableRowColumn style={{textAlign:"center"}}>{this.itemInfo.orderPos + 1}</TableRowColumn>
                <TableRowColumn style={{textAlign:"center"}}>{this.itemInfo.name}</TableRowColumn>
                <TableRowColumn style={{textAlign:"center"}}>---</TableRowColumn>
            </TableRow>
        )
    }
}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        addNewAttendee: newAttendeeName => dispatch(UserSessionActions.addNewAttendee(newAttendeeName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAttendeeTable)