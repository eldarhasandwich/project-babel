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

    constructor(props) {
        super(props)

        this.state = {}
    }

    getSortedFilteredAttendees = () => {
        let attendees = this.props.attendees.attendees
        let attendeeKeys = Object.keys(attendees)

        attendeeKeys.sort((a, b) => {
            return attendees[a].orderPos - attendees[b].orderPos
        })

        return attendeeKeys
    }

    handleRowSelection = (selectedRow) => {
        console.log(selectedRow)
    }

    render() {
        return (
            <div>
                <Table height={"300px"} onRowSelection={this.handleRowSelection}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Order Position</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true}>

                        {this
                            .getSortedFilteredAttendees()
                            .map((row, index) => (<EmceeClipListRow
                                props={this.props}
                                index={index}
                                content={this.props.attendees.attendees[row]}
                                selectedIndex={this.props.state.selectedClipIndex}/>))}

                    </TableBody>

                </Table>
            </div>
        )
    }
}

class EmceeClipListRow extends Component {

    getThisAttendeeStatus() {
        let hasAudio = (this.props.content.audioSrc !== null)
        let audioIsDownloading = (!this.props.content.audioLoaded)
        let verified = (this.props.content.audioIsVerified)
        let needsReplacement = (this.props.content.audioNeedsReplacement)

        if (!hasAudio) {
            return "No Audio"
        }

        if (audioIsDownloading) {
            return "Downloading Audio"
        }

        if (hasAudio && verified) {
            return "Verified"
        }

        if (hasAudio && !verified && !needsReplacement) {
            return "Unverified"
        }

        if (hasAudio && !verified && needsReplacement) {
            return "Needs Replacement"
        }
    }

    render() {
        return (
            <TableRow
                key={this.props.index}
                selected={this.props.content.orderPos === this.props.selectedIndex}
            >
                <TableRowColumn>{this.props.content.orderPos + 1}</TableRowColumn>
                <TableRowColumn>{this.props.content.name}</TableRowColumn>
                <TableRowColumn>{this.getThisAttendeeStatus()}</TableRowColumn>
            </TableRow>
        )
    }
}

const mapStateToProps = state => {
    return {state: state.state, attendees: state.attendees}
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedClipIndex: newIndex => dispatch(stateActions.setSelectedClipIndex(newIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmceeClipList)