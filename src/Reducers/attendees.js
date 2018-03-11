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

        default:
            {
                return state
            }

    }
}

export default attendees