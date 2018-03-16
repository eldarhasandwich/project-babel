import React, {Component} from 'react';
import {connect} from 'react-redux';

import './SaveLoadButtons.css'

import * as AttendeeActions from '../../Actions/attendees';

class SaveLoadButtons extends Component {

    loadFromFireBase() {
        this.props.loadAttendees(this.props.state.fireBaseDataDirectory)
    }

    render () {
        return (
            <div className="Save-load-buttons">
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
                    Load From Server
                </button>
                <button 
                    // onClick={}
                    disabled>
                    Save To Server
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