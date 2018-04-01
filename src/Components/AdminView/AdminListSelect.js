import React, {Component} from 'react';
import {connect} from 'react-redux'

import { Menu, MenuItem, Subheader} from 'material-ui'

import * as StateActions from '../../Actions/state';

class AdminListSelect extends Component {

    render () {

        return (
            <div style={{width: "100%"}}>

                <Subheader>Ceremonies</Subheader>
                <Menu>
                    <MenuItem>Item</MenuItem>
                    <MenuItem>Item</MenuItem>
                    <MenuItem style={{whiteSpace: 'normal'}}>ItemItem ItemItem Item Item Item Item Item</MenuItem>
                    <MenuItem>Item</MenuItem>
                    <MenuItem>Item</MenuItem>
                </Menu>

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

export default connect(mapStateToProps, mapDispatchToProps)(AdminListSelect)