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
import {Tab, Tabs} from 'material-ui'
import Dropzone from 'react-dropzone'

import * as UserSessionActions from '../../Actions/userSession'
import CSVtoArray from '../../Classes/CSVOperations'

class ListAttendeeTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            addAttendeeDialogOpen: false,
            attendeeName: "",
            attendeeEmail: "",
            attendeeCSVImport: {
                nameHeader: "",
                emailHeader: "",
                data: []
            }
        }
    }

    openCreateAttendeeDialog = () => {
        this.setState({addAttendeeDialogOpen: true})
    }

    closeCreateAttendeeDialog = () => {
        this.setState({addAttendeeDialogOpen: false})
    }

    setNewAttendeeName = newName => {
        this.setState({attendeeName: newName.target.value})
    }

    setNewAttendeeEmail = newEmail => {
        this.setState({attendeeEmail: newEmail.target.value})
    }

    resetNewAttendee = () => {
        this.setState({attendeeName: "", attendeeEmail: ""})
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
        if (attendees === undefined || attendees === null) {
            return []
        }

        let attendeeKeys = Object.keys(attendees)

        attendeeKeys.sort((a, b) => {
            return attendees[a].orderPos - attendees[b].orderPos
        })

        return attendeeKeys
    }

    submitAttendeeInfo = () => {
        if (this.state.attendeeName === "" || this.state.attendeeEmail === "") {
            return;
        }

        this.closeCreateAttendeeDialog()
        this
            .props
            .addNewAttendee(this.state.attendeeName, this.state.attendeeEmail)
        this.resetNewAttendee()
    }

    submitAttendeeCSV = () => {
        console.log("Import CSV button")

        this.closeCreateAttendeeDialog()
        // this.props.addNewAttendee(this.state.attendeeName, this.state.attendeeEmail)

        this.state.attendeeCSVImport.data.forEach(
            x => {
                this.props.addNewAttendee(x[0], x[1])
            }
        )

        this.resetAttendeeCSV()
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

    onCSVDrop = (acceptedFiles, rejectedFiles) => {
        // console.log(acceptedFiles) console.log("rejected file: " + rejectedFiles)
        if (acceptedFiles === []) {
            return;
        }

        console.log(acceptedFiles[acceptedFiles.length - 1])

        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            let CSVdat = CSVtoArray(fileAsBinaryString)
            console.log(CSVdat)

            this.setState({
                attendeeCSVImport: {
                    nameHeader: CSVdat.nameHeader,
                    emailHeader: CSVdat.emailHeader,
                    data: CSVdat.data
                }
            })

            console.log(this.state)

        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(acceptedFiles[acceptedFiles.length - 1]);
    }

    csvImportDescription = () => {
        if (this.state.attendeeCSVImport.data.length === 0) {
            return `Please select a CSV file`
        }

        return `The CSV file you are attempting to import uses "${this.state.attendeeCSVImport.nameHeader}" as the name field and "${this.state.attendeeCSVImport.emailHeader}" as the email field. This file has information for ${this.state.attendeeCSVImport.data.length} attendees.`
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

                <Dialog
                    title={"Add new Attendees to " + this.props.userSession.companyLists[this.props.userSession.selectedList].listName}
                    onRequestClose={this.closeCreateAttendeeDialog}open={this.state.addAttendeeDialogOpen} >
                    <Tabs>
                        <Tab
                            label="Single Attendee"
                            style={{
                            backgroundColor: "white",
                            color: "#222"
                        }}>
                            <div>
                                <TextField
                                    floatingLabelText={"Attendee Name"}
                                    value={this.state.newAttendeeName}
                                    onChange={this.setNewAttendeeName}/>
                            </div>
                            <div>
                                <TextField
                                    floatingLabelText={"Contact Email"}
                                    value={this.state.newAttendeeEmail}
                                    onChange={this.setNewAttendeeEmail}/>
                            </div>
                            <div
                                style={{
                                float: "right"
                            }}>
                                <FlatButton label={"Add Attendee"} primary onClick={this.submitAttendeeInfo}/>
                            </div>
                        </Tab>
                        <Tab
                            label="Import CSV"
                            style={{
                            backgroundColor: "white",
                            color: "#222"
                        }}>

                            <div
                                style={{
                                width: "100%",
                                overflow: "auto"
                            }}>

                                <div
                                    style={{
                                    marginTop: "20px",
                                    marginLeft: "30px",
                                    float: "left"
                                }}>
                                    <Dropzone accept="text/csv, application/vnd.ms-excel" onDrop={this.onCSVDrop}>
                                        <p
                                            style={{
                                            margin: "15px"
                                        }}>
                                            Drag a CSV file here or click to select one.
                                        </p>
                                    </Dropzone>
                                </div>

                                <p
                                    style={{
                                    marginTop: "20px",
                                    marginLeft: "15px",
                                    float: "left",
                                    width: "90%"
                                }}>
                                    {this.csvImportDescription()}
                                </p>

                            </div>

                            <div
                                style={{
                                width: "100%",
                                overflow: "auto"
                            }}>
                                <FlatButton
                                    style={{
                                    float: "right"
                                }}
                                    label={"Import List"}
                                    primary
                                    onClick={this.submitAttendeeCSV}/>
                            </div>

                        </Tab>
                        <Tab
                            label="Import Excel"
                            style={{
                            backgroundColor: "white",
                            color: "#222"
                        }}>
                            Theres nothing here! (yet)
                        </Tab>
                    </Tabs>

                </Dialog>
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