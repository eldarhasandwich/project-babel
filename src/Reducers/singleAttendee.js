const defaultState = {
    attendeeLoaded: false,
    singleAttendee: {    
        audioSrc: null,
        audioLoading: false,
        audioLoaded: false,
        orderPos: 0,
        id: "",
        name: "",
        textA: "",
        textB: ""
    }
}

const singleAttendee = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_IN_ATTENDEE': {
            return {
                ...state,
                singleAttendee:{
                    ...action
                }
            }
        }

        case 'SET_ATTENDEE_LOADED_STATUS': {
            return {
                ...state,
                attendeeLoaded: action.bool
            }
        }

        default: {
            return state
        }
    }
}

export default singleAttendee