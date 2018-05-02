import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Dialog, TextField } from 'material-ui';

import * as UserSessionActions from '../../../Actions/userSession'

class DeleteListDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            textInput: ""
        }
    }

    setTextInput = newText => {
        this.setState({textInput: newText.target.value})
    }

    getSelectedList = () => {
        if (this.props.userSession.selectedList === null) {
            return null
        }
        return this.props.userSession.companyLists[this.props.userSession.selectedList]
    }

    deleteThisList = () => {
        if (this.state.textInput !== this.getSelectedList().listName) {
            return
        }
        this.props.deleteList(this.props.userSession.selectedList)
        this.props.onRequestClose()
        this.setState({textInput: ""})
    }

    render() {
        const dialogActions = [
            <RaisedButton
                primary
                label={"Return"}
                onClick={this.props.onRequestClose}
            />
        ]

        return (
            <Dialog
                title={`Delete "${this.getSelectedList().listName}"`}
                open={this.props.isOpen}
                actions={dialogActions}
                onRequestClose={this.props.onRequestClose}
            >

                <p>To prevent accidental deletions, type the name of this list to delete it.</p>

                <TextField
                    hintText={"Name of List"}
                    value={this.state.textInput}
                    onChange={this.setTextInput}
                    fullWidth
                />
                <RaisedButton
                    style={{marginTop:"20px"}}
                    label={"Delete List!"}
                    secondary
                    disabled={this.state.textInput !== this.getSelectedList().listName}
                    onClick={this.deleteThisList}
                />
            </Dialog>
        )
    }

}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        deleteList: listID => dispatch(UserSessionActions.deleteList(listID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteListDialog)