import React, {Component} from 'react';
import './Styles/ClipListItemSmall.css';

class ClipListItemSmall extends Component {

  constructor(props) {
    super(props)
    this.setSelectedIndexAsSelf = this
      .setSelectedIndexAsSelf
      .bind(this)
  }

  styles = {
    selected: {
      backgroundColor: "lightblue"
    },
    notSelected: {}
  }

  setSelectedIndexAsSelf() {
    console.log(this.props.value.index)
    this.props.setSelectedIndex(this.props.value.index)
  }

  render() {
    return (
      <div
        className="List-item-small"
        style={(this.props.value.index === this.props.selectedIndex)
        ? this.styles.selected
        : this.styles.notSelected}>

        <p>{this.props.value.index + 1 + ". " + this.props.value.values.name + " (" + this.props.value.values.id + ")"
}</p>

        <button onClick={this.setSelectedIndexAsSelf}>
          Select
        </button>

      </div>
    );
  }
}

export default ClipListItemSmall;
