import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as StateActions from '../../Actions/state';
import { Toolbar } from 'material-ui';

class AdminListInterface extends Component {

    render () {

        return (
            <div>

                <Toolbar/>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setFirebaseDataDir: (newDir) => dispatch(StateActions.setFirebaseDataDirectory(newDir))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminListInterface)