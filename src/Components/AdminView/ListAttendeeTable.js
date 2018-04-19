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
import {FlatButton, Dialog, TextField} from 'material-ui';

import * as UserSessionActions from '../../Actions/userSession'
import AddAttendeeDialog from './Dialogs/AddAttendeeDialog';

class ListAttendeeTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            addAttendeeDialogOpen: false
        }
    }

    openCreateAttendeeDialog = () => {
        this.setState({addAttendeeDialogOpen: true})
    }

    closeCreateAttendeeDialog = () => {
        this.setState({addAttendeeDialogOpen: false})
    }

    resetAttendeeCSV = () => {
        this.setState({
            attendeeCSVImport: {
                nameHeader: "",
                emailHeader: "",
                data: []
            }
        })
    }

    getSelectedListAttendees = () => {
        return this.props.userSession.companyLists[this.props.userSession.selectedList]._ATTENDEES
    }

    getSortedFilteredAttendees = () => {
        let attendees = this.getSelectedListAttendees()
        if (!attendees) {
            return []
        }

        let attendeeKeys = Object.keys(attendees)

        attendeeKeys.sort((a, b) => {
            return attendees[a].orderPos - attendees[b].orderPos
        })

        if (!this.props.state.attendeesWithNoAudioVisible){ 
            attendeeKeys = attendeeKeys.filter(key => {
                return attendees[key].audioStatus !== "No Audio"
            })
        }

        if (!this.props.state.unverifiedAttendeesVisible){ 
            attendeeKeys = attendeeKeys.filter(key => {
                return attendees[key].audioStatus !== "Unverified"
            })
        }

        if (!this.props.state.attendeesWithAudioNeedingReplacementVisible){ 
            attendeeKeys = attendeeKeys.filter(key => {
                return attendees[key].audioStatus !== "Needs Replacement"
            })
        }

        if (!this.props.state.verifiedAttendeesVisible){ 
            attendeeKeys = attendeeKeys.filter(key => {
                return attendees[key].audioStatus !== "Verified"
            })
        }

        return attendeeKeys
    }

    setSelectedAttendee = attendeeKey => {
        this
            .props
            .setSelectedAttendee(attendeeKey)
    }

    handleRowClick = index => {
        let attendees = this.getSortedFilteredAttendees()
        this.setSelectedAttendee(attendees[index[0]])
    }
    
    render() {
        return (
            <div >
                <Table onRowSelection={(index) => this.handleRowClick(index)} height={630}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn
                                style={{
                                textAlign: "center"
                            }}>Order Position</TableHeaderColumn>
                            <TableHeaderColumn
                                style={{
                                textAlign: "center"
                            }}>Name</TableHeaderColumn>
                            <TableHeaderColumn
                                style={{
                                textAlign: "center"
                            }}>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false} showRowHover={true}>
                        {this
                            .getSortedFilteredAttendees()
                            .map((row, index) => <ListAttendeeTableItem
                                itemKey={row}
                                selectedAttendee={this.props.userSession.selectedAttendee}
                                attendees={this.getSelectedListAttendees()}
                                key={this.props.userSession.selectedList + row}/>)
}
                    </TableBody>
                </Table>
                <FlatButton
                    style={{
                    marginTop: "5px"
                }}
                    label={"Add Attendees"}
                    fullWidth
                    onClick={this.openCreateAttendeeDialog}/>

                <AddAttendeeDialog
                    isOpen={this.state.addAttendeeDialogOpen}
                    onRequestClose={this.closeCreateAttendeeDialog}
                />
            </div>
        )
    }

}

class ListAttendeeTableItem extends Component {

    itemInfo = this.props.attendees[this.props.itemKey]

    render() {
        const {
            order,
            ...otherProps
        } = this.props;
        return (
            <TableRow
                { ...otherProps }
                selected={this.props.selectedAttendee === this.props.itemKey}>

                <TableRowColumn
                    style={{
                    textAlign: "center"
                }}>
                    {this.props.attendees[this.props.itemKey].orderPos + 1}
                </TableRowColumn>
                <TableRowColumn
                    style={{
                    textAlign: "center"
                }}>
                    {this.props.attendees[this.props.itemKey].name}
                </TableRowColumn>
                <TableRowColumn
                    style={{
                    textAlign: "center"
                }}>
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