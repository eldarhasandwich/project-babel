import React, {Component} from 'react';
import {connect} from 'react-redux'
// import { withRouter } from 'react-router-dom'

import * as StateActions from '../../Actions/state';

import AdminListSelect from './AdminListSelect'
import AdminListInterface from './AdminListInterface'

class AdminView extends Component {

    setThisFirebaseDataDirectory(newDirectory) {
        this
            .props
            .setFirebaseDataDir(newDirectory.target.value)
    }

    adminViewStyle = {
        width: "100%",
        minWidth: "100%",
        height: (window.innerHeight - 184) + "px",
        maxHeight: (window.innerHeight - 184) + "px",
        overflow: "auto",
        position: "relative"
    }

    listSelectStyle = {
        width: "279px",
        minWidth: "279px",
        float: "left",
        borderRight: "1px solid #BBB",
        height: "100%"

    }

    listInterfaceStyle = {
        width: "calc(100% - 280px)",
        float: "right",
        height: "100%"
    }

    componentDidMount () {
        if (!this.props.userSession.isLoggedIn) {
            console.log("Not logged in :( (compdidmount)")
            
        }
    }

    render() {
        if (!this.props.userSession.isLoggedIn) {
            console.log("Not logged in :( (render)")

            return (
                <h4>You are not logged in</h4>
            )
        }

        return (
            <div
                style={this.adminViewStyle}>

                <div style={this.listSelectStyle}>
                    <AdminListSelect/>
                </div>

                <div style={this.listInterfaceStyle}>
                    <AdminListInterface/>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminView)