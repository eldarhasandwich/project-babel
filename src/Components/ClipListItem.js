import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Styles/ClipListItem.css';

import * as stateActions from "../Actions/state"
//import ClipList from './ClipList';

class ClipListItem extends Component {
    styles = {
        selected: {
            backgroundColor: "lightblue"
        },
        notSelected: {}
    }

    render() {
        return (
            <div
                className="List-item"
                style={(this.props.index === this.props.state.selectedClipIndex)
                ? this.styles.selected
                : this.styles.notSelected}>

                <p>{(this.props.attendee.audioLoaded)
                        ? "Loaded"
                        : "Downloading"}</p>
                <p id="item-name">{this.props.attendee.name}</p>
                <p id="item-id">{this.props.attendee.id}</p>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state.state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedClipIndex: newIndex => dispatch(stateActions.setSelectedClipIndex(newIndex))
    }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ClipListItem)
