import React, {Component} from 'react';
import './Styles/ClipListItemSmall.css';

class ClipListItemSmall extends Component {


  render() {
    return (
      <div className="List-item-small">

        <p>{
            this.props.value.values.name 
            + " ("
            + this.props.value.values.id + ")"
        }</p>

      </div>
    );
  }
}

export default ClipListItemSmall;
