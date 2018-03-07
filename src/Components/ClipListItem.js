import React, {Component} from 'react';
import './Styles/ClipListItem.css';

class ClipListItem extends Component {
  styles = {
    selected: {backgroundColor: "lightblue"},
    notSelected: {}
  }

  render() {
    return (
      <div className="List-item" 
        style={
          (this.props.value.index===this.props.selectedIndex) 
            ? this.styles.selected 
            : this.styles.notSelected
        }>

        <p>{ (this.props.value.values.canPlay) ? "Done" : "Downloading" }</p>
        <p id="item-name">{this.props.value.values.name}</p>
        <p id="item-id">{this.props.value.values.id}</p>

      </div>
    );
  }
}

export default ClipListItem;
