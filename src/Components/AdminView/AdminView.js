import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as StateActions from '../../Actions/state';

import AdminListSelect from './AdminListSelect'

import ListAttendeeTable from './ListAttendeeTable'
import SelectedListInterface from './SelectedListInterface'


class AdminView extends Component {

    setThisFirebaseDataDirectory(newDirectory) {
        this
            .props
            .setFirebaseDataDir(newDirectory.target.value)
    }

    adminViewStyle = {
        width: "100%",
        minWidth: "100%",
        height: (window.innerHeight - 150) + "px",
        maxHeight: (window.innerHeight - 150) + "px",
        overflow: "hidden",
        position: "relative"
    }

    listSelectStyle = {
        width: "25%",
        float: "left",
        height: "100%"

    }

    listInterfaceStyle = {
        width: "75%",
        float: "right",
        height: "100%"
    }


    render() {
        return (
            <div
                style={this.adminViewStyle}>

                <div style={{height:"100%", overflow: "hidden"}}>
                    <div style={this.listSelectStyle}>
                        <AdminListSelect
                            newListButton={true}
                        />
                    </div>
                    
                    {
                        (this.props.userSession.selectedList !== null)
                            ?   <div style={this.listInterfaceStyle}>
                                    <SelectedListInterface/>
                                    <ListAttendeeTable/>
                                </div>
                            : null
                    }

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