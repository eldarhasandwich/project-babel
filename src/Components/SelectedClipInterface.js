import React, {Component} from 'react';
import './Styles/SelectedClipInterface.css';

class SelectedClipInterface extends Component {
    
    render() {
        return (
            <div>

                <div className="Selected-clip-view">
                    <div className="Selected-clip-view-row">

                        <p id="person-name">
                            {(this.props.value) ? this.props.value.name : "No Names Loaded"}
                        </p>
                        <p id="person-id">
                            {(this.props.value) ? this.props.value.id : "---"}
                        </p>

                    </div>
                    <div className="Selected-clip-view-row">

                        <p id="custom-text">
                            {(this.props.value) ? this.props.value.textA : "---"}
                        </p>
                        <p id="custom-text">
                            {(this.props.value) ? this.props.value.textB : "---"}
                        </p>

                    </div>
                </div>
                
            </div>
        );
    }

}

export default SelectedClipInterface;
