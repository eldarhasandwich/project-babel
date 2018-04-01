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
import { FlatButton } from 'material-ui';

import * as UserSessionActions from '../../Actions/userSession'

class ListAttendeeTable extends Component {

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
        this.props.addNewAttendee("John Smith")
    }

    render () {
        return (
            <div>
            <Table>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}>
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
                label={"Add new Attendee"}
                onClick={this.addNewAttendee}/>
            </div>
        )
    }

}

class ListAttendeeTableItem extends Component {

    itemInfo = this.props.attendees[this.props.itemKey]

    render () {
        return (
            <TableRow>
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