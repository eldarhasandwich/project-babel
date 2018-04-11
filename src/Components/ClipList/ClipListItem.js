// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import './ClipListItem.css';

// import * as stateActions from "../../Actions/state"
// import * as attendeeActions from "../../Actions/attendees"

// class ClipListItem extends Component {

//     constructor(props) {
//         super(props)
//         this.setSelectedIndexAsSelf = this
//             .setSelectedIndexAsSelf
//             .bind(this)
//         this.switchPositionWithLowerIndex = this
//             .switchPositionWithLowerIndex
//             .bind(this)
//         this.switchPositionWithHigherIndex = this
//             .switchPositionWithHigherIndex
//             .bind(this)
//         this.getThisItemStyle = this.getThisItemStyle.bind(this)
//     }

//     styles = {
//         base: {
//             backgroundColor: "white",
//             transition: "background-color 0.18s"
//         },
//         verified: {
//             backgroundColor: "lightgreen",
//         },
//         unverified: {
//             backgroundColor: "#EEE",
//         }, 
//         needsReplacement: {
//             backgroundColor: "#fffb23",
//         },
//         noAudio: {
//             backgroundColor: "lightcoral",
//         },
//         selected: {
//             filter: "brightness(85%)"
//         }
//     }

//     getThisItemStyle() {
//         let isSelected = (this.props.attendee.orderPos === this.props.state.selectedClipIndex)
//         let hasAudio = (this.props.attendee.audioSrc !== null)
//         let verified = (this.props.attendee.audioIsVerified)
//         let needsReplacement = (this.props.attendee.audioNeedsReplacement)

//         let thisStyle = this.styles.base
//         if (isSelected) {
//             thisStyle = {...thisStyle, ...this.styles.selected}
//         }

//         if (!hasAudio) {
//             thisStyle = {...thisStyle, ...this.styles.noAudio}
//         }

//         if (hasAudio && verified) {
//             thisStyle = {...thisStyle, ...this.styles.verified}
//         }

//         if (hasAudio && !verified && !needsReplacement) {
//             thisStyle = {...thisStyle, ...this.styles.unverified}
//         }

//         if (hasAudio && !verified && needsReplacement) {
//             thisStyle = {...thisStyle, ...this.styles.needsReplacement}
//         }

//         return thisStyle
//     }

//     setSelectedIndexAsSelf() {
//         this
//             .props
//             .setSelectedClipIndex(this.props.attendee.orderPos)
//     }

//     switchPositionWithLowerIndex() {
//         let targetIndex = this.props.attendee.orderPos - 1;
//         this.switchThisIndexWithIndex(targetIndex);
//     }

//     switchPositionWithHigherIndex() {
//         let targetIndex = this.props.attendee.orderPos + 1;
//         this.switchThisIndexWithIndex(targetIndex);
//     }

//     switchThisIndexWithIndex(targetIndex) {
//         let thisAttendee = this.props.attendee.id;

//         let attendees = this.props.attendees.attendees
//         let attendeeKeys = Object.keys(attendees)
//         let targetKey = attendeeKeys.find(x => attendees[x].orderPos === targetIndex)

//         this
//             .props
//             .swapAttendeeOrderPosition(thisAttendee, targetKey)
//     }

//     render() {
//         if (this.props.itemDisplaySize === "large") {
//             return (
//                 <LargeListItem
//                     style={this.getThisItemStyle()}
//                     attendee={this.props.attendee}
//                 />
//             )
//         }

//         return (
//             <SmallListItem
//                 style={this.getThisItemStyle()}
//                 attendee={this.props.attendee}
//                 attendees={this.props.attendees}

//                 switchPositionWithHigherIndex={this.switchPositionWithHigherIndex}
//                 switchPositionWithLowerIndex={this.switchPositionWithLowerIndex}
//                 setSelectedIndexAsSelf={this.setSelectedIndexAsSelf}

//                 verifyAttendeeAudio={this.props.verifyAttendeeAudio}
//                 markAttendeeAudioAsNeedsReplacement={this.props.markAttendeeAudioAsNeedsReplacement}
//             />
//         );
//     }

// }

// class LargeListItem extends Component {
//     render() {
//         return (

//             <div
//                 className="List-item"
//                 style={this.props.style}>

//                 <p>{(this.props.attendee.audioLoaded)
//                         ? "Loaded"
//                         : (this.props.attendee.audioSrc !== null)
//                             ? "Downloading"
//                             : "No Audio"}</p>
//                 <p id="item-name">{this.props.attendee.name}</p>
//                 <p id="item-id">{this.props.attendee.id}</p>
//             </div>

//         )
//     }
// }

// class SmallListItem extends Component {

//     verifyAudio = () => {
//         this.props.verifyAttendeeAudio(this.props.attendee.id)
//     }

//     markAudioAsNeedsReplacement = () => {
//         this.props.markAttendeeAudioAsNeedsReplacement(this.props.attendee.id)
//     }

//     render() {
//         return (
//             <div
//                 className="List-item-small"
//                 style={this.props.style}>

//                 <button
//                 onClick={this.verifyAudio}
//                 >Verify</button>
//                 <button
//                 onClick={this.markAudioAsNeedsReplacement}
//                 >Needs Replacement</button>

//                 <p>{this.props.attendee.orderPos + 1 + "."}</p>
//                 <p>{this.props.attendee.name}</p>
//                 <p>{"(" + this.props.attendee.id + ")"}</p>
                
//                 <button
//                     onClick={this.props.switchPositionWithHigherIndex}
//                     disabled={this.props.attendee.orderPos === Object
//                     .keys(this.props.attendees.attendees)
//                     .length - 1}>
//                     Shift Down
//                 </button>

//                 <button
//                     onClick={this.props.switchPositionWithLowerIndex}
//                     disabled={this.props.attendee.orderPos === 0}>
//                     Shift Up
//                 </button>

//                 <button onClick={this.props.setSelectedIndexAsSelf}>
//                     Select
//                 </button>

//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {state: state.state, attendees: state.attendees}
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         setSelectedClipIndex: newIndex => dispatch(stateActions.setSelectedClipIndex(newIndex)),
//         swapAttendeeOrderPosition: (attendeeA_ID, attendeeB_ID) => dispatch(attendeeActions.swapAttendeeOrderPosition(attendeeA_ID, attendeeB_ID)),
//         verifyAttendeeAudio: attendeeID => dispatch(attendeeActions.verifyAttendeeAudio(attendeeID)),
//         markAttendeeAudioAsNeedsReplacement: attendeeID => dispatch(attendeeActions.markAttendeeAudioAsNeedsReplacement(attendeeID))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ClipListItem)
