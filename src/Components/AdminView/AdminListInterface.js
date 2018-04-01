import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as StateActions from '../../Actions/state';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';

import ListAttendeeTable from './ListAttendeeTable'

class AdminListInterface extends Component {

    getSelectedListName = () => {
        if (this.props.userSession.selectedList === null) {
            return "Please select a List"
        }
        return this.props.userSession.companyLists[this.props.userSession.selectedList].listName
    }

    render () {
        return (
            <div>

                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={this.getSelectedListName()}/>
                    </ToolbarGroup>
                </Toolbar>

                {(this.props.userSession.selectedList !== null)
                    ?<AdminListInterfaceChild/>:null}
            </div>
        );
    }
}

class AdminListInterfaceChild extends Component {

    render () {
        return (
            <div>
                <div style={{width: "50%", float: "left"}}>
                    <ListAttendeeTable/>
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setFirebaseDataDir: (newDir) => dispatch(StateActions.setFirebaseDataDirectory(newDir))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminListInterface)