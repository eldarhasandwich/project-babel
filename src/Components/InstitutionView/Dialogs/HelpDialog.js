import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Dialog } from 'material-ui';
import HelpInformation from '../HelpInformation';

class AttendeeEmailDialog extends Component {

   
    render() {
        const dialogActions = [
            <RaisedButton
                secondary
                label={"Close Help"}
                onClick={this.props.onRequestClose}
            />
        ]

        return (
            <Dialog
                title={`Help Documentation`}
                open={this.props.isOpen}
                actions={dialogActions}
                onRequestClose={this.props.onRequestClose}
                modal
                contentStyle={{overflow:"auto"}}
                autoScrollBodyContent={true}
            >

                <HelpInformation
                    companyName={this.props.userSession.userCompanyName}
                />

            </Dialog>
        )
    }

}


const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeEmailDialog)