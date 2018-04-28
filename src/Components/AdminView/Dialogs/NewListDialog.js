import React, {Component} from 'react';
import {connect} from 'react-redux'

import {
    Dialog,
    TextField,
    FlatButton
} from 'material-ui'

// import * as StateActions from '../../Actions/state';
import * as UserSessionActions from '../../../Actions/userSession'

class NewListDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            createListDialogOpen: false,
            newListName: ""
        }
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

    createNewList = () => {
        this.props.onRequestClose()
        this
            .props
            .createNewList(this.state.newListName)
        this.resetNewListName()
    }

    dialogActions = [< FlatButton label = {
            "Create List"
        }
        disabled = {
            !this.newListNameIsValid
        }
        primary onClick = {
            this.createNewList
        } />]

    render() {
        return (

            <Dialog
                title="Create a New List"
                actions={this.dialogActions}
                open={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}>
                <TextField
                    floatingLabelText={"New List Name"}
                    value={this.state.newListName}
                    onChange={this.setNewListName}/>
            </Dialog>

        );
    }
}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        createNewList: newListName => dispatch(UserSessionActions.createNewList(newListName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewListDialog)