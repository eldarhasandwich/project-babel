import React, {Component} from 'react';
import {connect} from 'react-redux'

import {
    Dialog,
    TextField,
    RaisedButton,
    FlatButton
} from 'material-ui'

import {
    Step,
    Stepper,
    StepLabel
} from 'material-ui/Stepper'

import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

// import * as StateActions from '../../Actions/state';
import * as UserSessionActions from '../../../Actions/userSession'

class NewListDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            createListDialogOpen: false,
            newListName: "",
            newListDate: null,
            newListTime: null,
            newListLocation: "",
            
            stepIndex: 0
        }
    }

    permitNextStep = () => {
        switch(this.state.stepIndex) {
            case 0: return this.state.newListName.length >= 6
            case 1: return this.state.newListDate && this.state.newListTime
            case 2: return this.state.newListLocation.length >= 6
            default: return false
        }
    }

    handleNext = () => {
        if (!this.permitNextStep()) {
            return
        }
        this.setState({stepIndex: this.state.stepIndex + 1})
        console.log(this.state.stepIndex)
        if (this.state.stepIndex >= 2) {
            this.createNewList()
        }
    }

    handleBack = () => {
        if (this.state.stepIndex > 0) {
            this.setState({stepIndex: this.state.stepIndex - 1})
        }
    }

    setNewListName = newName => {
        this.setState({newListName: newName.target.value})
    }

    setNewListDate = (e, date) => {
        this.setState({newListDate: date})
    }

    setNewListTime = (e, time) => {
        this.setState({newListTime: time})        
    }

    setNewListLocation = newLoc => {
        this.setState({ newListLocation: newLoc.target.value})
    }

    resetState = () => {
        this.setState({
            newListName: "",
            newListDate: null,
            newListTime: null,
            newListLocation: "",
            stepIndex: 0
        })
    }

    newListIsValid = () => {
        return false
    }

    createNewList = () => {
        let state = this.state
        this.props.onRequestClose()
        this
            .props
            .createNewList(state.newListName, state.newListDate, state.newListTime, state.newListLocation)
        this.resetState()
    }
    
    formatDate = date => {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    dialogActions = [
        <RaisedButton
            label = {"Cancel"}
            secondary
            onClick = {this.props.onRequestClose}
        />
    ]
                                    
    render() {
        return (

            <Dialog
                title="Create a New List"
                actions={this.dialogActions}
                open={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}>

                <Stepper activeStep={this.state.stepIndex}>
                    <Step>
                        <StepLabel>Ceremony Name</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Date & Time</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Other</StepLabel>
                    </Step>
                </Stepper>

                <div style={{height:"200px", paddingLeft:"30px"}}>

                    {
                        this.state.stepIndex === 0
                            ? 
                            <div>
                                <TextField
                                    floatingLabelText={"Ceremony Name"}
                                    value={this.state.newListName}
                                    onChange={this.setNewListName}
                                />
                            </div>
                            : null
                    }

                    {
                        this.state.stepIndex === 1
                            ? 
                            <div>
                                <DatePicker
                                    floatingLabelText={"Ceremony Date"}
                                    onChange={this.setNewListDate}
                                    formatDate={this.formatDate}
                                    value={this.state.newListDate}
                                    mode="landscape"
                                />
                                <TimePicker
                                    floatingLabelText={"Ceremony Time"}
                                    onChange={this.setNewListTime}
                                    value={this.state.newListTime}
                                    minutesStep={5}
                                />
                            </div>
                            : null
                    }

                    {
                        this.state.stepIndex === 2
                            ? 
                            <div>
                                <TextField
                                    floatingLabelText={"Ceremony Location"}
                                    value={this.state.newListLocation}
                                    onChange={this.setNewListLocation}
                                />
                            </div>
                            : null
                    }

                </div>

                <div>
                    <FlatButton
                        label="Back"
                        disabled={this.state.stepIndex <= 0}
                        onClick={this.handleBack}
                        style={{marginRight:"5px"}}
                    />
                    <RaisedButton
                        label={this.state.stepIndex === 2 ? "Create List" : "Next"}
                        primary
                        disabled={!this.permitNextStep()}
                        onClick={this.handleNext}
                    />
                </div>


            </Dialog>

        );
    }
}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        createNewList: (name, date, time, location) => dispatch(UserSessionActions.createNewList(name, date, time, location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewListDialog)