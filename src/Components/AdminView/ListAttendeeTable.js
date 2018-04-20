import React, {Component} from 'react';
import {connect} from 'react-redux'

// import {
//     Table,
//     TableBody,
//     TableHeader,
//     TableHeaderColumn,
//     TableRow,
//     TableRowColumn
// } from 'material-ui/Table';
import {FlatButton, Paper} from 'material-ui';

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

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

    setSelectedAttendee = attendeeKey => {
        this
            .props
            .setSelectedAttendee(attendeeKey)
    }

    handleRowClick = index => {
        let attendees = this.getSortedFilteredAttendees()
        this.setSelectedAttendee(attendees[index[0]])
    }

    grid = 6

    getListStyle = isDraggingOver => ({
        background: "white",
        padding: this.grid,
        width: "96%",
        margin:"auto"
    });

    getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        margin: `0 0 ${this.grid}px 0`,
        ...draggableStyle
    });

    getPaperStyle = (isDragging) => ({
        padding: this.grid * 2,

    })

    onDragEnd = result => {
        // console.log(result)
        if (!result.destination) {
            console.log("wtf")
            return
        }
        let sourceIndex = result.source.index
        let destIndex = result.destination.index

        if (sourceIndex === destIndex) {
            return
        }

        let orderedAttendeeKeys = this.getSortedFilteredAttendees()

        let orderPosChanges = []

        //omae wa mou shindeiru 

        if (sourceIndex < destIndex) {
            for (var i=0; i < destIndex-sourceIndex; i++) {
                orderPosChanges.push([orderedAttendeeKeys[sourceIndex+i+1],sourceIndex+i])
            }
            orderPosChanges.push([orderedAttendeeKeys[sourceIndex], destIndex])
        } else {

            for (var i=0; i<sourceIndex-destIndex; i++) {
                orderPosChanges.push([orderedAttendeeKeys[sourceIndex-i-1], sourceIndex-i])
            }
            orderPosChanges.push([orderedAttendeeKeys[sourceIndex], destIndex])

        }

        console.log(orderPosChanges)

        this.props.applyOrderPosChanges(orderPosChanges)

    }

    render() {

        let attendees = this.getSelectedListAttendees();

        return (
            <div>
                <div
                    style={{
                    width: "100%",
                    height: "685px",
                    overflowX:"hidden",
                    overflowY:"auto"
                }}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}>
                                    {this
                                        .getSortedFilteredAttendees()
                                        .map((item, index) => (
                                            <Draggable key={item} draggableId={item} index={index}>

                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                        
                                                        <ListAttendeeTableItem
                                                            itemKey={item}
                                                            attendees={attendees}
                                                            isDragging={snapshot.isDragging}
                                                            onClick={this.setSelectedAttendee}
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
                    marginTop: "5px"
                }}
                    label={"Add Attendees"}
                    fullWidth
                    onClick={this.openCreateAttendeeDialog}/>

                <AddAttendeeDialog
                    isOpen={this.state.addAttendeeDialogOpen}
                    onRequestClose={this.closeCreateAttendeeDialog}/>

            </div>
        )
    }
}

class ListAttendeeTableItem extends Component {

    itemClicked = () => {
        // console.log(this.props.itemKey)
        this.props.onClick(this.props.itemKey)
    }

    itemInfo = this.props.attendees[this.props.itemKey]
    paperStyle = {
        padding: "12px",
        cursor: "pointer",
        overflow:"auto"
    }

    render() {

        return (
            <Paper 
                style={this.paperStyle} 
                zDepth={this.props.isDragging ? 3 : 1}
                onClick={this.itemClicked}
            >
                <p style={{float:"left", margin:"0 3px"}}>#{this.props.attendees[this.props.itemKey].orderPos + 1}</p>
                <p style={{float:"right", margin:"0 3px"}}>{this.itemInfo.name}</p>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        addNewAttendee: (newAttendeeName, newAttendeeEmail) => dispatch(UserSessionActions.addNewAttendee(newAttendeeName, newAttendeeEmail)),
        setSelectedAttendee: newAttendeeID => dispatch(UserSessionActions.setSelectedAttendee(newAttendeeID)),
        applyOrderPosChanges: newOrderPosSet => dispatch(UserSessionActions.applyOrderPosChanges(newOrderPosSet)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAttendeeTable)