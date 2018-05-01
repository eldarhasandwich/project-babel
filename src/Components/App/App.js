import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom"
import {connect} from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

import InstitutionView from "../InstitutionView/InstitutionView"

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    
                    <AppRoutes/>
                    
                </div>
            </MuiThemeProvider>
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
                        component={InstitutionView}/>
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