import React, {Component} from 'react';
import {connect} from 'react-redux';

// import Data from "../../Classes/DataController";

import * as AttendeeActions from '../../Actions/attendees';

class SaveLoadButtons extends Component {

    loadFromFireBase() {
        this.props.loadAttendees(this.props.state.fireBaseDataDirectory)
    }

    render () {
        return (
            <div>
                <button 
                    // onClick={}
                    disabled>
                    Load From File
                </button>
                <button 
                    // onClick={"}
                    disabled>
                    Save To File
                </button>
                <button 
                    onClick={this.loadFromFireBase.bind(this)}>
                    Load From Firebase
                </button>
                <button 
                    // onClick={}
                    disabled>
                    Save To Firebase
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {attendees: state.attendees, state: state.state}
}

const mapDispatchToProps = dispatch => {
    return {
        loadAttendees: (listKey) => dispatch(AttendeeActions.loadAttendees(listKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveLoadButtons)