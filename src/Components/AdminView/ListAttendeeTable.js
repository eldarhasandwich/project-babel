import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Paper, RaisedButton, /*TextField*/} from 'material-ui';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import AttendeeTableVisibilityDialog from './Dialogs/AttendeeTableVisibilityDialog';

import * as UserSessionActions from '../../Actions/userSession'
// import AddAttendeeDialog from './Dialogs/AddAttendeeDialog';
import ListAttendeeTableItem from './ListAttendeeTableItem'

import palette from '../../Resources/colorPalette.js'
import ActionLock from 'material-ui/svg-icons/action/lock'
import ActionUnlock from 'material-ui/svg-icons/action/lock-open'
import ActionList from 'material-ui/svg-icons/action/list'

class ListAttendeeTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visibilityDialogOpen: false,
            searchQuery: null
        }
    }

    openVisibilityDialog = () => {
        this.setState({visibilityDialogOpen: true})
    }

    closeVisibilityDialog = () => {
        this.setState({visibilityDialogOpen: false})
    }

    getSelectedListAttendees = () => {
        let selectedList = this.props.userSession.companyLists[this.props.userSession.selectedList]
        if (!selectedList) {
            return null
        }
        let attendees = selectedList._ATTENDEES
        if (!attendees) {
            return null
        }
        return attendees
    }

    filterAttendeeKeys = sortedAttendeeKeys => {
        let attendees = this.getSelectedListAttendees()
        let attendeeKeys = sortedAttendeeKeys

        if (!this.props.state.attendeesWithNoAudioVisible) {
            attendeeKeys = attendeeKeys.filter(key => {
                return attendees[key].audioStatus !== "No Audio"
            })
        }

        if (!this.props.state.unverifiedAttendeesVisible) {
            attendeeKeys = attendeeKeys.filter(key => {
                return attendees[key].audioStatus !== "Unverified"
            })
        }

        if (!this.props.state.attendeesWithAudioNeedingReplacementVisible) {
            attendeeKeys = attendeeKeys.filter(key => {
                return attendees[key].audioStatus !== "Needs Replacement"
            })
        }

        if (!this.props.state.verifiedAttendeesVisible) {
            attendeeKeys = attendeeKeys.filter(key => {
                return attendees[key].audioStatus !== "Verified"
            })
        }

        return attendeeKeys
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

        attendeeKeys = this.filterAttendeeKeys(attendeeKeys)

        return attendeeKeys
    }

    getListStyle = (isDraggingOver, draggingAllowed) => ({
        background: draggingAllowed ? "lightcoral" : palette.gray_light,
        padding: "6px",
        width: "100%",
        margin:"auto",
        transition: "0.2s",
    });

    getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        margin: `0 0 6px 0`,
        ...draggableStyle
    });

    onDragEnd = result => {
        // console.log(result)
        if (!result.destination) {
            return
        }
        let sourceIndex = result.source.index
        let destIndex = result.destination.index

        if (sourceIndex === destIndex) {
            return
        }

        let orderedAttendeeKeys = this.getSortedFilteredAttendees()
        let orderPosChanges = []

        var i;
        if (sourceIndex < destIndex) {
            for (i=0; i < destIndex-sourceIndex; i++) {
                orderPosChanges.push([orderedAttendeeKeys[sourceIndex+i+1],sourceIndex+i])
            }
            orderPosChanges.push([orderedAttendeeKeys[sourceIndex], destIndex])
        } else {
            for (i=0; i<sourceIndex-destIndex; i++) {
                orderPosChanges.push([orderedAttendeeKeys[sourceIndex-i-1], sourceIndex-i])
            }
            orderPosChanges.push([orderedAttendeeKeys[sourceIndex], destIndex])
        }
        this.props.applyOrderPosChanges(orderPosChanges)
    }
    
    allFiltersInactive = () => {
        let s = this.props.state
        return s.verifiedAttendeesVisible && s.unverifiedAttendeesVisible && s.attendeesWithAudioNeedingReplacementVisible && s.attendeesWithNoAudioVisible
    }

    toggleAttendeeSorting = () => {
        this.props.allowAttendeeSorting(!this.props.userSession.attendeeSortingAllowed)
    }

    getPaperStyle = () => ({
        overflow:"auto",
        height: "calc(100% - 10px)",
        width: "97%",
        marginLeft:"1.5%",
        marginTop: "10px",
        backgroundColor: this.props.userSession.attendeeSortingAllowed ? "lightcoral" : palette.gray_light,
        transition: "0.2s",
    })
    
    buttonStyle = {
        marginTop:"5px",
        marginRight:"5px",
        float:"right"
    }

    render() {

        let attendees = this.getSelectedListAttendees();

        if (!attendees) {
            return null
        }

        return (
            <div style={{height:"calc(95% - 200px)", width:"100%"}}>

                <Paper zDepth={2} style={this.getPaperStyle()}>

                <div style={{height:"50px"}}> 

                    {/* <TextField
                        style={{float:"left", marginLeft:"30px"}}
                        hintText={"Search..."}
                        disabled
                    /> */}

                    <RaisedButton
                        label={this.props.userSession.attendeeSortingAllowed ? "Lock Sorting" : "Unlock Sorting"}
                        labelPosition={"before"}
                        icon={this.props.userSession.attendeeSortingAllowed ? <ActionUnlock/> : <ActionLock/>}
                        disabled={!this.allFiltersInactive()}
                        secondary={this.props.userSession.attendeeSortingAllowed}
                        onClick={this.toggleAttendeeSorting}
                        style={this.buttonStyle}
                    />
                    <RaisedButton
                        label={"Attendee Filters"}
                        labelPosition={"before"}
                        icon={<ActionList/>}
                        secondary={!this.allFiltersInactive()}
                        disabled={this.props.userSession.attendeeSortingAllowed}
                        onClick={this.openVisibilityDialog}
                        style={this.buttonStyle}
                    />
                </div>

                <div style={{height:"calc(100% - 50px)", overflowX:"hidden"}}>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppable" isDropDisabled={!this.props.userSession.attendeeSortingAllowed}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver, this.props.userSession.attendeeSortingAllowed)}>
                                        {this
                                            .getSortedFilteredAttendees()
                                            .map((item, index) => (
                                                <Draggable key={item} draggableId={item} index={index} isDragDisabled={!this.props.userSession.attendeeSortingAllowed}>

                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                            
                                                            <ListAttendeeTableItem
                                                                itemKey={item}
                                                                attendees={attendees}
                                                                selectedAttendee={this.props.userSession.selectedAttendee}
                                                                isDragging={snapshot.isDragging}
                                                            />
                                                        </div>
                                                    )}

                                                </Draggable>
                                            ))
    }
                                        {provided.placeholder}
                                    </div>
                                )
    }
                            </Droppable>
                        </DragDropContext>
                    </div>
                </Paper>

                <AttendeeTableVisibilityDialog
                    isOpen={this.state.visibilityDialogOpen}
                    onRequestClose={this.closeVisibilityDialog}
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
        addNewAttendee: (newAttendeeName, newAttendeeEmail) => dispatch(UserSessionActions.addNewAttendee(newAttendeeName, newAttendeeEmail)),
        allowAttendeeSorting: bool => dispatch(UserSessionActions.allowAttendeeSorting(bool)),
        applyOrderPosChanges: newOrderPosSet => dispatch(UserSessionActions.applyOrderPosChanges(newOrderPosSet)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAttendeeTable)