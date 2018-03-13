const defaultState = {
    attendees: {}
}

const defaultAttendeeState = {
    audioSrc: null,
    audioLoading: false,
    audioLoaded: false,
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
                        orderPos: state.attendees[action.id_B]
                    },
                    [action.id_B]: {
                        orderPos: state.attendees[action.id_A]
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

        default:
            {
                return state
            }

    }
}

export default attendees