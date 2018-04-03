import React, {Component} from 'react';
import {connect} from 'react-redux'

class SelectedItemInterface extends Component {


    getSelectedList = () => {
        if (this.props.userSession.selectedList === null) {
            return null
        }

        return this.props.userSession.companyLists[this.props.userSession.selectedList]
    }

    getSelectedAttendee = () => {
        if (this.props.userSession.selectedAttendee === null) {
            return null
        }

        return this.props.userSession
            .companyLists[this.props.userSession.selectedList]
            ._ATTENDEES[this.props.userSession.selectedAttendee]
    }

    render() {

        let selectedList = this.getSelectedList()
        if (this.props.userSession.selectedAttendee === null) {
            return (
                <div>
                    <h1>{selectedList.listName}</h1>
                    

                </div>
            )
        }

        let selectedAttendee = this.getSelectedAttendee()
        return (
            <div>
                <h1>{selectedAttendee.name}</h1>
                <h4>{"Order in Ceremony: " + (selectedAttendee.orderPos + 1)}</h4>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectedItemInterface)