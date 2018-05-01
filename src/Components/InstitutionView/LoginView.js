import React, {Component} from 'react';
import {connect} from 'react-redux'
import firebase from 'firebase';
// import * as request from 'superagent'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebaseui from 'firebaseui'

import * as userSessionActions from './../../Actions/userSession'

// import config from '../../config'

import LoginBG from '../../Resources/Images/LoginBG.png'
import titlelogo from '../../Resources/Images/titlelogo.png'
import { Checkbox } from 'material-ui';

class LoginView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rememberLogin: false
        }
    }

    toggleRememberLogin = () => {
        this.setState({rememberLogin: !this.state.rememberLogin})
    }

    uiConfig = {
        // Popup signin flow rather than redirect flow.
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            
            signInSuccess: () => {
                if (this.state.rememberLogin) {
                    document.cookie = `userAuth=true`
                }

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
            )
        }
    }

    backgroundStyle = {
        backgroundImage: `url(${LoginBG})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        height:"100vh"
    }

    logoStyle = {
        height: "100px",
        marginTop:"10%",
        marginBottom:"30px"
    }

    componentWillMount = () => {
        if (!document.cookie) {
            return
        }
        const that = this;
            firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                that.attemptLogin()
            }
        });
    }

    render() {
        return (
            <div style={this.backgroundStyle}>

                <img src={titlelogo} style={this.logoStyle} alt=""/>
                <StyledFirebaseAuth /*uiCallback={ui => console.log(ui)}*/ uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                <Checkbox
                    style={{width:"200px", margin:"10px auto"}}
                    label={"Remember Me!"}
                    checked={this.state.rememberLogin}
                    onCheck={this.toggleRememberLogin}
                />
                <p style={{fontWeight:"bold", color:"red"}}>{this.state.rememberLogin ? "Do not enable this on a shared Computer." : null}</p>

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
