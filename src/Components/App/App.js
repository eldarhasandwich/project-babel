import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom"
import {connect} from 'react-redux'

import './App.css';

import AppHeader from "./AppHeader";
import InstitutionView from "../InstitutionView/InstitutionView"
import LandingPage from "../HomePage/LandingPage"

import AttendeeView from '../AttendeeView/AttendeeView';

class App extends Component {
    render() {
        return (
            <div className="App">

                <AppHeader/>
                <AppRoutes/>
                
            </div>
        );
    }
}

class AppRoutes extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route
                        exact path={process.env.PUBLIC_URL +'/'}
                        component={LandingPage}/>

                    <Route
                        path={process.env.PUBLIC_URL +'/institution'}
                        component={InstitutionView}/>

                    <Route
                        path={process.env.PUBLIC_URL +'/attendee'}
                        component={AttendeeView}/>

                </Switch>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {attendees: state.attendees, state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(App)