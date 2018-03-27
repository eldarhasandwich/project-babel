import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import LoginView from './LoginView'
import AdminView from '../AdminView/AdminView'
import EmceeView from '../EmceeView/EmceeView'

// import * as userSessionActions from './../../Actions/userSession'

class InstitutionView extends Component {

    render() {

        if (!this.props.userSession.isLoggedIn) {
            return (<LoginView/>)
        }

        return (
            <BrowserRouter>
                <div>
                    <p>
                        <Link to="/admin">Admin View</Link>
                    </p>
                    <p>
                        <Link to="/emcee">Emcee View</Link>
                    </p>

                    <Route path='/admin' component={AdminView}/>
                    <Route path='/emcee' component={EmceeView}/>

                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(InstitutionView)
