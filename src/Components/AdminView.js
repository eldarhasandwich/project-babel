import React, {Component} from 'react';
//import './Styles/EmceeView.css';

import SaveLoadButtons from "./SaveLoadButtons"
import ClipListSmall from './ClipListSmall';

class AdminView extends Component {

    render () {
        return (
            <div>
                <SaveLoadButtons
                    loadFromLocalStorage={this.props.loadFromLocalStorage}
                    saveToLocalStorage={this.props.saveToLocalStorage}
                    loadFromFireBase={this.props.loadFromFireBase}
                    saveToFireBase={this.props.saveToFireBase}
                />

                <ClipListSmall
                    cliparray={this.props.state.audioClipArray}
                    setSelectedIndex={this.props.setSelectedIndex}
                />
            </div>
        );
    }
}

export default AdminView;