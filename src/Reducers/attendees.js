const defaultState = {
    attendees: {}
}

const defaultAttendeeState = {
    audioSrc: null,
    audioLoading: false,
    audioLoaded: false,
    audioNeedsReplacement: false,
    audioIsVerified: false,
    orderPos: 0,
    id: "",
    name: "",
    textA: "",
    textB: ""
}

const attendees = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ATTENDEE': {
            return {
                ...state,
                attendees: {
                    ...state.attendees,
                    [action.id]: {
                        ...defaultAttendeeState,
                        ...action
                    }
                }
            }
        }

        case 'LOADING_AUDIO': {
            return {
                ...state,
                attendees: {
                    ...state.attendees,
                    [action.id]: {
                        ...state.attendees[action.id],
                        audioLoading: true,
                    }
                }
            }
        } 

        case 'LOADED_AUDIO': {
            return {
                ...state,
                attendees: {
                    ...state.attendees,
                    [action.id]: {
                        ...state.attendees[action.id],
                        audioLoading: false,
                        audioLoaded: true
                    }
                }
            }
        }

        case 'SWAP_ORDER_POSITION': {
            return {
                ...state,
                attendees:{
                    ...state.attendees,
                    [action.id_A]: {
                        ...state.attendees[action.id_A],
                        orderPos: state.attendees[action.id_B].orderPos
                    },
                    [action.id_B]: {
                        ...state.attendees[action.id_B],
                        orderPos: state.attendees[action.id_A].orderPos
                    }
                }
            }
        }

        case 'UPDATE_ATTRIBUTE': {
            return {
                ...state,
                attendees:{
                    ...state.attendees,
                    [action.attendeeID]: {
                        ...state.attendees[action.attendeeID],
                        [action.targetField] : action.newValue
                    }
                }
            }
        }
        
        case 'CLEAR_ATTENDEE_LIST': {
            return {
                ...state,
                attendees: {}
            }
        }

        case 'VERIFY_ATTENDEE_AUDIO': {
            return {
                ...state,
                attendees:{
                    ...state.attendees,
                    [action.attendeeID]: {
                        ...state.attendees[action.attendeeID],
                        audioNeedsReplacement: false,
                        audioIsVerified: true
                    }
                }
            }
        }

        case 'MARK_ATTENDEE_AUDIO_AS_NEEDS_REPLACEMENT': {
            return {
                ...state,
                attendees:{
                    ...state.attendees,
                    [action.attendeeID]: {
                        ...state.attendees[action.attendeeID],
                        audioNeedsReplacement: true,
                        audioIsVerified: false
                    }
                }
            }
        }

        default:
            {
                return state
            }

    }
}

export default attendees