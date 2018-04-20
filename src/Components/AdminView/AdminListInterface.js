import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as UserSessionActions from '../../Actions/userSession';

import {
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    RaisedButton,
    // Popover,
    // Menu,
    // MenuItem
} from 'material-ui';

import ListAttendeeTable from './ListAttendeeTable'
import SelectedItemInterface from './SelectedItemInterface'
import AttendeeTableVisibilityDialog from './Dialogs/AttendeeTableVisibilityDialog';

class AdminListInterface extends Component {

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

    getSelectedListName = () => {
        if (this.props.userSession.selectedList === null) {
            return "Select or Create a List"
        }
        return this.props.userSession.companyLists[this.props.userSession.selectedList].listName
    }

    showListInformation = () => {
        this
            .props
            .setSelectedAttendee(null)
    }

    attendeeSortingAllowed = () => {
        let s = this.props.state
        return s.verifiedAttendeesVisible && s.unverifiedAttendeesVisible && s.attendeesWithAudioNeedingReplacementVisible && s.attendeesWithNoAudioVisible
    }

    toggleAttendeeSorting = () => {
        this.props.allowAttendeeSorting(!this.props.userSession.attendeeSortingAllowed)
    }

    render() {
        return (
            <div>

                <Toolbar style={{paddingLeft:"0px"}}>
                    <ToolbarGroup>
                        <RaisedButton
                            label={this.props.userSession.attendeeSortingAllowed ? "Lock Sorting" : "Unlock Sorting"}
                            disabled={!this.attendeeSortingAllowed()}
                            secondary={this.props.userSession.attendeeSortingAllowed}
                            onClick={this.toggleAttendeeSorting}
                        />
                        <ToolbarTitle text={this.getSelectedListName()}/>
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <RaisedButton
                            label={"View List"}
                            disabled={this.props.userSession.selectedAttendee === null}
                            onClick={this.showListInformation}
                            style={{marginRight:"3px"}}
                        />

                        <RaisedButton
                            label={"Attendee Filters"}
                            onClick={this.openVisibilityPopover}
                            style={{marginLeft:"3px"}}
                        />

                    </ToolbarGroup>
                </Toolbar>

                <AttendeeTableVisibilityDialog
                    isOpen={this.state.visibilityPopoverOpen}
                    onRequestClose={this.closeVisibilityPopover}
                />

                {(this.props.userSession.selectedList !== null)
                    ? <AdminListInterfaceChild/>
                    : null}
            </div>
        );
    }
}

class AdminListInterfaceChild extends Component {

    listAttendeeTable = {
        height: "100%",
        width: "50%",
        float: "left",
        borderRight: "1px solid #BBB"
    }

    itemInterfaceStyle = {
        width: "calc(50% - 1px)",
        float: "right"
    }

    render() {
        return (
            <div
                style={{
                height: "calc(100% - 64px)",
                overflow: "auto"
            }}>
                <div style={this.listAttendeeTable}>
                    <ListAttendeeTable/>
                </div>
                <div style={this.itemInterfaceStyle}>
                    <SelectedItemInterface/>
                </div>
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
        setSelectedAttendee: attID => dispatch(UserSessionActions.setSelectedAttendee(attID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminListInterface)