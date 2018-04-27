import React, {Component} from 'react';
import {connect} from 'react-redux'

// import * as userSessionActions from './../../Actions/userSession'


class InstitutionInfo extends Component {


    render() {
        return (

            <h1>{this.props.userSession.userCompanyName}</h1>

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
export default connect(mapStateToProps, mapDispatchToProps)(InstitutionInfo)
