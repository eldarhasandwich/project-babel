import React, {Component} from 'react';
import {connect} from 'react-redux'
import firebase from 'firebase';
import * as request from 'superagent'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebaseui from 'firebaseui'

import * as userSessionActions from './../../Actions/userSession'

import config from '../../config'


class LoginView extends Component {

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
                console.log(firebase.auth().currentUser)
                window.firebase = firebase.auth()

            }
        }
    };


    attemptLogin = () => {
        if (true) {
            firebase.auth().currentUser.getIdToken(true).then(
                token => {
                    this.props.setUserLoggedIn(true, token)
                    this.props.setUserCompany()              
                }
            ).catch(console.error.bind(console))
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
        setUserLoggedIn: (bool, token) => dispatch(userSessionActions.setUserLoggedIn(bool, token)),
        setUserCompany: () => dispatch(userSessionActions.setUserCompany())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
