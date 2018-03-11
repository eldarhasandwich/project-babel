import React, {Component} from 'react';
import './Styles/ClipListSmall.css';
import {connect} from 'react-redux'
import ClipListItemSmall from "./ClipListItemSmall";

class ClipListSmall extends Component {
    render() {
        return (
            <div className="Clip-list-small">

                {Object
                    .keys(this.props.attendees.attendees)
                    .map((item, index) => <ClipListItemSmall
                        key={index}
                        attendee={this.props.attendees.attendees[item]}
                        index={index}/>)
}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {attendees: state.attendees}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClipListSmall)
