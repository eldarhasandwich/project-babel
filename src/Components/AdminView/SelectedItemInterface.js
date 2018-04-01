import React, {Component} from 'react';
import {connect} from 'react-redux'

class SelectedItemInterface extends Component {



    render() {
        if (this.props.userSession.selectedAttendee === null) {
            return (
                <div>

                    This list

                </div>
            )
        }



        return (
            <div>

                This Attendee

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