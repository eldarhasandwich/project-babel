import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Styles/ClipListItem.css';

import * as stateActions from "../Actions/state"
//import ClipList from './ClipList';

class ClipListItem extends Component {

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
        this
            .props
            .setSelectedClipIndex(this.props.attendee.orderPos)
    }

    render() {
        if (this.props.itemDisplaySize === "small") {
            return (
                <div
                    className="List-item"
                    style={(this.props.attendee.orderPos === this.props.state.selectedClipIndex)
                    ? this.styles.selected
                    : this.styles.notSelected}>

                    <p>{(this.props.attendee.audioLoaded)
                            ? "Loaded"
                            : "Downloading"}</p>
                    <p id="item-name">{this.props.attendee.name}</p>
                    <p id="item-id">{this.props.attendee.id}</p>

                </div>
            )
        }

        return (
            <div
                className="List-item-small"
                style={(this.props.attendee.orderPos === this.props.state.selectedClipIndex)
                ? this.styles.selected
                : this.styles.notSelected}>

                <p>{this.props.attendee.orderPos + 1 + ". " + this.props.attendee.name + " (" + this.props.attendee.id + ")"
}</p>

                <button onClick={this.setSelectedIndexAsSelf}>
                    Select
                </button>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {state: state.state}
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedClipIndex: newIndex => dispatch(stateActions.setSelectedClipIndex(newIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClipListItem)
