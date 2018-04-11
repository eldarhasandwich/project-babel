import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

import * as stateActions from "../../Actions/state"

class EmceeClipList extends Component {

    // constructor(props) {
    //     super(props)

    //     this.state = {}
    // }

    getSelectedListAttendees = () => {
        let selectedList = this.props.userSession.companyLists[this.props.userSession.selectedList]
        if (selectedList === null || selectedList === undefined) {
            return null
        }
        return selectedList._ATTENDEES
    }

    getSortedFilteredAttendees = () => {
        let attendees = this.getSelectedListAttendees()
        if (attendees === null || attendees === undefined) {
            return []
        }

        let attendeeKeys = Object.keys(attendees)
        
        attendeeKeys.sort((a, b) => {
            return attendees[a].orderPos - attendees[b].orderPos
        })
        console.log(attendeeKeys.length)
        return attendeeKeys
    }

    handleRowSelection = (selectedRow) => {
        console.log(selectedRow)
    }

    render() {
        let attendees = this.getSelectedListAttendees()

        return (
            <div>
                <Table height={"300px"} onRowSelection={this.handleRowSelection}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={{textAlign:"center"}}>Order Position</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true}>

                        {this
                            .getSortedFilteredAttendees()
                            .map((row, index) => (<EmceeClipListRow
                                props={this.props}
                                index={index}
                                content={attendees[row]}
                                selectedIndex={this.props.state.selectedClipIndex}/>))}

                    </TableBody>

                </Table>
            </div>
        )
    }
}

class EmceeClipListRow extends Component {

    render() {
        return (
            <TableRow
                key={this.props.index}
                selected={this.props.content.orderPos === this.props.selectedIndex}
            >
                <TableRowColumn style={{textAlign:"center"}}>{this.props.content.orderPos + 1}</TableRowColumn>
                <TableRowColumn style={{textAlign:"center"}}>{this.props.content.name}</TableRowColumn>
                <TableRowColumn style={{textAlign:"center"}}>{this.props.content.audioStatus}</TableRowColumn>
            </TableRow>
        )
    }
}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedClipIndex: newIndex => dispatch(stateActions.setSelectedClipIndex(newIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmceeClipList)