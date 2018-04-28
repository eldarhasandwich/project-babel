import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Toggle, Dialog } from 'material-ui';

class AttendeeEmailDialog extends Component {


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
                title={"Emails"}
                open={this.props.isOpen}
                actions={dialogActions}
                onRequestClose={this.props.onRequestClose}
            >


            </Dialog>
        )
    }

}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeEmailDialog)