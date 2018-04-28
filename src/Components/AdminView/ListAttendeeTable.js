import React, {Component} from 'react';
import {connect} from 'react-redux'

import {FlatButton, Paper} from 'material-ui';

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import * as UserSessionActions from '../../Actions/userSession'
import AddAttendeeDialog from './Dialogs/AddAttendeeDialog';
import ListAttendeeTableItem from './ListAttendeeTableItem'

import palette from '../../Resources/colorPalette.js'

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

    // setSelectedAttendee = attendeeKey => {
    //     this
    //         .props
    //         .setSelectedAttendee(attendeeKey)
    // }

    getListStyle = (isDraggingOver, draggingAllowed) => ({
        background: draggingAllowed ? "lightcoral" : "white",
        padding: "6px",
        width: "100%",
        margin:"auto",
        transition: "0.4s",
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

    paperStyle = {
        overflow:"auto",
        height: "calc(100% - 10px)",
        width: "98%",
        marginTop: "10px",
        backgroundColor: palette.gray_light
    }

    render() {

        let attendees = this.getSelectedListAttendees();

        return (
            <div style={{height:"85%", width:"100%"}}>

                <Paper style={this.paperStyle}>

                <div style={{height:"85%", overflowX:"hidden"}}>
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

                <FlatButton
                    style={{
                    height:"15%",
                }}
                    label={"Add Attendees"}
                    fullWidth
                    onClick={this.openCreateAttendeeDialog}/>

                </Paper>

                <AddAttendeeDialog
                    isOpen={this.state.addAttendeeDialogOpen}
                    onRequestClose={this.closeCreateAttendeeDialog}/>

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
        // setSelectedAttendee: newAttendeeID => dispatch(UserSessionActions.setSelectedAttendee(newAttendeeID)),
        applyOrderPosChanges: newOrderPosSet => dispatch(UserSessionActions.applyOrderPosChanges(newOrderPosSet)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAttendeeTable)