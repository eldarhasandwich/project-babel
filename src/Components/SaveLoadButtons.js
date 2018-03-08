import React, {Component} from 'react';

class SaveLoadButtons extends Component {

    render () {
        return (
            <div>
                <button 
                    onClick={this.props.loadFromLocalStorage}
                    disabled>
                    Load From File
                </button>
                <button 
                    onClick={this.props.saveToLocalStorage}
                    disabled>
                    Save To File
                </button>
                <button 
                    onClick={this.props.loadFromFireBase}>
                    Load From Firebase
                </button>
                <button 
                    onClick={this.props.saveToFireBase}
                    disabled>
                    Save To Firebase
                </button>
            </div>
        );
    }
}

export default SaveLoadButtons;