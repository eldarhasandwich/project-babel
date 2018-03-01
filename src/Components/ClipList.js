import React from 'react';
import './Styles/ClipList.css';

import ClipListItem from "./ClipListItem";

const ClipList = props => (
    <div className="Clip-list">

        {
            props.cliparray.map(
                (item, index) => 
                    <ClipListItem 
                        key={index} 
                        value={{values: item, index: index}}
                        selectedIndex={props.selectedIndex}
                    />
            )
        }

    </div>
);

export default ClipList;
