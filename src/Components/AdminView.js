import React, {Component} from 'react';
import './Styles/AdminView.css';

import Data from "../Classes/DataController"
import SaveLoadButtons from "./SaveLoadButtons"
import ClipList from './ClipList';
import SelectedClipAttributeEdit from './SelectedClipAttributeEdit';

class AdminView extends Component {

    render () {
        return (
            <div className="Admin-view">
                
                <p>List Key:</p>
                <input
                    id="admin-view-list-key"
                    onChange={Data.Set_This_DatabaseDir}
                />

                <SaveLoadButtons
                    loadFromLocalStorage={this.props.loadFromLocalStorage}
                    saveToLocalStorage={this.props.saveToLocalStorage}
                    loadFromFireBase={this.props.loadFromFireBase}
                    saveToFireBase={this.props.saveToFireBase}
                />

                <ClipList
                    itemDisplaySize={"large"}
                />

                <SelectedClipAttributeEdit/>

                {this.props.children}
            </div>
        );
    }
}

export default AdminView;