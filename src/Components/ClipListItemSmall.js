import React, {Component} from 'react';
import './Styles/ClipListItemSmall.css';

class ClipListItemSmall extends Component {


  render() {
    return (
      <div className="List-item-small">

        <p>{
            this.props.position + 1
            + ". " +
            this.props.value.values.name 
            + " ("
            + this.props.value.values.id + ")"
        }</p>

        <button disabled>
          Select
        </button>

      </div>
    );
  }
}

export default ClipListItemSmall;
