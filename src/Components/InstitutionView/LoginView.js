import React, {Component} from 'react';
import {connect} from 'react-redux'
import Fire from '../../Classes/Fire'
import firebase from 'firebase';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebaseui from 'firebaseui'

import * as userSessionActions from './../../Actions/userSession'


const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccess: () => {
            
        }
    }
  };

class LoginView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userID: "",
            password: ""
        }
    }

    uiConfig = {
        // Popup signin flow rather than redirect flow.
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => {
                this.attemptLogin()
            }
        }
      };


    attemptLogin = () => {
        if (true) {
            this.props.setUserLoggedIn(true)
        }
    }

    render() {
        return (
            <div>

                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>

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
