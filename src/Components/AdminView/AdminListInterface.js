import React, {Component} from 'react';
import {connect} from 'react-redux'

import ListAttendeeTable from './ListAttendeeTable'
import SelectedListInterface from './SelectedListInterface'

class AdminListInterface extends Component {

    divStyle = {
        width:"95%",
        height:"95%",
        margin:"10px auto",
        overflow:"hidden"
    }

    listInterfaceStyle = {
        height:"200px",
        width:"100%"
    }

    listAttendeeTable = {
        height: "calc(100% - 200px)",
        width:"100%",
        overflow:"hidden"
    }

    render() {
        if (this.props.userSession.selectedList === null) {
            return null;
        }

        return (
            <div style={this.divStyle}>

                <div style={this.listInterfaceStyle}>
                    <SelectedListInterface/>
                </div>
                <div style={this.listAttendeeTable}>
                    <ListAttendeeTable/>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminListInterface)