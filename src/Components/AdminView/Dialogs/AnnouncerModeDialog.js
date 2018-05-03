import React, {Component} from 'react';
import {connect} from 'react-redux'
import { RaisedButton, Dialog } from 'material-ui';

import MaterialEmceeView from '../../EmceeView/MaterialEmceeView'

import NavigationClose from 'material-ui/svg-icons/navigation/close'

class AnnouncerModeDialog extends Component {

    getSelectedList = () => {
        if (this.props.userSession.selectedList === null) {
            return null
        }
        return this.props.userSession.companyLists[this.props.userSession.selectedList]
    }

    render() {
        const dialogActions = [
            <RaisedButton
                secondary
                label={"Close Announcer Mode"}
                onClick={this.props.onRequestClose}
                icon={<NavigationClose/>}
            />
        ]

        return (
            <Dialog
                modal={true}
                title={`${this.getSelectedList().listName}`}
                open={this.props.isOpen}
                actions={dialogActions}
                onRequestClose={this.props.onRequestClose}
                contentStyle={  {width: '90%',
                maxWidth: 'none',}}
            >

                <MaterialEmceeView/>

            </Dialog>
        )
    }

}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncerModeDialog)