const defaultState = {
    attendees: {}
}

const defaultAttendeeState = {
    audioSrc: null,
    loading: false,
    loaded: false,
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
                        loading: true,
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
                        loading: false,
                        loaded: true
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