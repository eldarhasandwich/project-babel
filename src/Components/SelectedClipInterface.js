import React, {Component} from 'react';
import './Styles/SelectedClipInterface.css';

class SelectedClipInterface extends Component {
    
    render() {
        return (
            <div className="Selected-clip-view">

                <p id="person-name">
                    {(this.props.value) ? this.props.value.name : "No Names Loaded"}
                </p>

                <div 
                    className="Selected-clip-view-col"
                    id="col-A">
                    
                    <p id="person-id">
                        {(this.props.value) ? this.props.value.id : "---"}
                    </p>
                    <p id="custom-text-A">
                        {(this.props.value) ? this.props.value.textA : "---"}
                    </p>

                </div>

                <div 
                    className="Selected-clip-view-col"
                    id="col-B">

                    <p id="custom-text-B">
                        {(this.props.value) ? this.props.value.textB : "---"}
                    </p>

                </div>
            </div>
        );
    }

}

export default SelectedClipInterface;
