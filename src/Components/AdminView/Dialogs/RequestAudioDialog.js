import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Button, Dialog } from 'material-ui';

import * as EmailActions from '../../../Actions/emails'

class RequestAudioDialog extends Component {


    render() {
        const dialogActions = [
            <Button variant="raised"
                primary
                label={"Return"}
                onClick={this.props.onRequestClose}
            />
        ]

        return (
            <Dialog
                title={`xyz`}
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
        // sendAudioRequestEmail: (listID, attID) => dispatch(EmailActions.sendAudioRequestEmail(listID, attID)),
        // sendAudioReplacementEmail: (l, a, message) => dispatch(EmailActions.sendAudioReplacementEmail(l, a, message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestAudioDialog)