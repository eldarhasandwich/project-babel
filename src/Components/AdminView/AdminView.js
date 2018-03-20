import React, {Component} from 'react';
import {connect} from 'react-redux'
import './AdminView.css';

// import Data from "../../Classes/DataController"
import SaveLoadButtons from "./SaveLoadButtons"
import ClipList from '../ClipList/ClipList';
import SelectedClipAttributeEdit from './SelectedClipAttributeEdit';

import * as StateActions from '../../Actions/state';

class AdminView extends Component {

    setThisFirebaseDataDirectory (newDirectory) {
        this.props.setFirebaseDataDir(newDirectory.target.value)
    }

    render () {
        return (
            <div className="Admin-view">
                
                <p>List Key:</p>
                <input
                    id="admin-view-list-key"
                    value={this.props.state.fireBaseDataDirectory}
                    onChange={this.setThisFirebaseDataDirectory.bind(this)}
                />

                <SaveLoadButtons/>

                <ClipList
                    itemDisplaySize={"small"}
                />

                <SelectedClipAttributeEdit/>

                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {state: state.state}
}

const mapDispatchToProps = dispatch => {
    return {
        setFirebaseDataDir: (newDir) => dispatch(StateActions.setFirebaseDataDirectory(newDir))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView)