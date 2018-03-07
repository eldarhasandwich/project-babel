import React, {Component} from 'react';

class SaveLoadButtons extends Component {

    render () {
        return (
            <div>
                <button 
                    onClick={this.props.loadFromLocalStorage}>
                    Load From File
                </button>
                <button 
                    onClick={this.props.saveToLocalStorage}>
                    Save To File
                </button>
                <button 
                    onClick={this.props.loadFromFireBase}>
                    Load From Firebase
                </button>
                <button 
                    onClick={this.props.saveToFireBase}>
                    Save To Firebase
                </button>
            </div>
        );
    }
}

export default SaveLoadButtons;