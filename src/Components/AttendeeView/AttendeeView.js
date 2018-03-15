import React, {Component} from 'react';
//import './Styles/AttendeeView.css';

import Data from "../Classes/DataController"
//import SaveLoadButtons from "./SaveLoadButtons"
//import ClipListSmall from './ClipListSmall';

class AttendeeView extends Component {

    render () {
        return (
            <div className="Attendee-view">
                
                <p>List Key:</p>
                <input
                    id="attendee-view-list-key"
                    onChange={Data.Set_This_DatabaseDir}
                />
 


            </div>
        );
    }
}

export default AttendeeView;
