import React, {Component} from 'react';
import {connect} from 'react-redux'

// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Paper, TextField, RaisedButton } from 'material-ui'


import * as userSessionActions from './../../Actions/userSession'

class NewAccountView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newInstName: "",
            invalidNameError: false
        }
    }

    setNewInstName = newName => {
        this.setState({newInstName: newName.target.value})
    }

    submitInstName = () => {
        console.log(this.state.newInstName)
        if (this.state.newInstName === "") {
            this.setState({invalidNameError: true})
            return
        }

        this.props.setUserCompanyName(this.state.newInstName)

    }

    paperStyle = {
        width: "600px",
        margin: "30px auto",
        padding: "5px"
    }

    render() {
        return (
            <div>

                <Paper style={this.paperStyle}>
                    <p>Please enter the name of your Institution. This will be visible to the Attendees and can be changed later.</p>

                    <TextField
                        floatingLabelText="Institution Name"
                        errorText={(this.state.invalidNameError) ? "This cannot be empty" : null}
                        value={this.state.newInstName}
                        onChange={this.setNewInstName}
                    />
                    <RaisedButton
                        style={{marginLeft: "30px"}}
                        primary
                        label="Submit Name"
                        onClick={this.submitInstName}
                    />
                </Paper>
                

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setUserCompanyName: newName => dispatch(userSessionActions.setUserCompanyName(newName))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewAccountView)
