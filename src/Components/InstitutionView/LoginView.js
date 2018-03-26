import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as userSessionActions from './../../Actions/userSession'

class LoginView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userID: "",
            password: ""
        }
    }

    attemptLogin () {
        if (true) {
            this.props.setUserLoggedIn(true)
        }
    }


    render() {
        return (
            <div>
                <p>This is a placeholder for the App's Admin Login Page.</p>
                <div>
                    <input/>
                </div>
                <div>
                    <input type="password"/>
                </div>
                <div>
                    <button
                        onClick={this.attemptLogin.bind(this)}>
                        Login
                    </button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setUserLoggedIn: bool => dispatch(userSessionActions.setUserLoggedIn(bool))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
