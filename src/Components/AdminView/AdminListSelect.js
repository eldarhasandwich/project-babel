import React, {Component} from 'react';
import {connect} from 'react-redux'

import { Menu, MenuItem, Subheader, Divider, FlatButton, Dialog, TextField } from 'material-ui'

// import * as StateActions from '../../Actions/state';
import * as UserSessionActions from '../../Actions/userSession'

class AdminListSelect extends Component {

    constructor(props) {
        super(props)

        this.setSelectedList = this.setSelectedList.bind(this)

        this.state = {
            createListDialogOpen: false,
            newListName: ""
        }
    }

    openCreateListDialog = () => {
        this.setState({createListDialogOpen: true})
    }

    closeCreateListDialog = () => {
        this.setState({createListDialogOpen: false})
    }

    setNewListName = newName => {
        this.setState({newListName: newName.target.value})
    }

    resetNewListName = () => {
        this.setState({newListName: ""})
    }

    newListNameIsValid = () => {
        return this.state.newListName.length >= 6
    }

    getCompanyListKeys = () => {
        let lists = this.props.userSession.companyLists
        if (lists === undefined || lists === null) {
            return []
        }
        return Object.keys(lists)
    }

    setSelectedList (newListID) {
        return () => {
            this.props.setSelectedList(newListID)
        }
    }

    createNewList = () => {
        this.closeCreateListDialog()
        this.props.createNewList(this.state.newListName)
        this.resetNewListName()
    }

    dialogActions = [
        <FlatButton
            label={"Create List"}
            disabled={!this.newListNameIsValid}
            primary
            onClick={this.createNewList}
        />
    ]

    createNewListStyle = {
        width: "100%",
        position:"absolute",
        bottom:"0"
    }

    render () {
        return (
            <div style={{width: "100%", height: "100%", maxHeight: "100%", position: "relative"}}>

                <Subheader style={{paddingLeft:"0px"}}>Ceremonies</Subheader>
                <Menu style={{width: "100%", height: "685px"}}>
                    
                    <div style={{overflow: "auto", height: "685px"}}>
                    <Divider/>
                    {this.getCompanyListKeys().map(
                        x => <AdminListSelectItem
                            key={x}
                            itemKey={x}
                            itemName={this.props.userSession.companyLists[x].listName}
                            setSelectedList={this.setSelectedList}/>
                    )}
                    </div>

                </Menu>

                <div style={this.createNewListStyle}>
                    <FlatButton
                        label={"Create new List"}
                        fullWidth
                        onClick={
                            this.openCreateListDialog
                        }
                    />
                    <Dialog
                        title="Create a New List"
                        actions={this.dialogActions}
                        open={this.state.createListDialogOpen}
                        onRequestClose={this.closeCreateListDialog}
                    >
                        <TextField
                            floatingLabelText={"New List Name"}
                            value={this.state.newListName}
                            onChange={this.setNewListName}
                        />
                    </Dialog>
                </div>
            </div>
        );
    }
}

class AdminListSelectItem extends Component {

    menuItemStyle = {whiteSpace: 'normal'}

    render() {
        return (
            <div>
                <MenuItem 
                    style={this.menuItemStyle}
                    onClick={this.props.setSelectedList(this.props.itemKey)}
                >
                    {this.props.itemName}
                </MenuItem>
                <Divider/>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedList: newListID => dispatch(UserSessionActions.setSelectedList(newListID)),
        createNewList: newListName => dispatch(UserSessionActions.createNewList(newListName)),
        // addNewAttendee: newAttendeeName => dispatch(UserSessionActions.addNewAttendee(newAttendeeName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminListSelect)