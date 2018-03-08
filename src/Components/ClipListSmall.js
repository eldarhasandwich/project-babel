import React from 'react';
import './Styles/ClipListSmall.css';

import ClipListItemSmall from "./ClipListItemSmall";

const ClipListSmall = props => (
    <div className="Clip-list-small">

        {
            props.cliparray.map(
                (item, index) => 
                    <ClipListItemSmall
                        key={index} 
                        value={{values: item}}
                        position={index}
                    />
            )
        }

    </div>
);

export default ClipListSmall;
