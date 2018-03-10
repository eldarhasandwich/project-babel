import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Styles/ClipListItemSmall.css';

import * as stateActions from "../Actions/state"

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
        //console.log(this.props.value.index)
        this
            .props
            .setSelectedClipIndex(this.props.value.index)
    }

    render() {
        return (
            <div
                className="List-item-small"
                style={(this.props.value.index === this.props.state.selectedClipIndex)
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
)(ClipListItemSmall)
