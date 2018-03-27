const defaultState = {
    attendeeLoaded: false,
    showIncorrectKeyMsg: false,
    attendeeInfoIsLoading: false,
    singleAttendee: {    
        audioSrc: null,
        audioLoading: false,
        audioLoaded: false,
        audioNeedsReplacement: false,
        audioIsVerified: false,
        orderPos: 0,
        listID: "",
        id: "",
        name: "",
        textA: "",
        textB: ""
    },
    audioIsUploading: false,
    showUploadSuccessMessage: false
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

        case 'SET_INCORRECT_KEY_STATUS': {
            return {
                ...state,
                showIncorrectKeyMsg: action.bool
            }
        }

        case 'SET_ATTENDEE_INFO_LOADING': {
            return {
                ...state,
                attendeeInfoIsLoading: action.bool
            }
        }

        case 'SET_AUDIO_IS_UPLOADING': {
            return {
                ...state,
                audioIsUploading: action.bool
            }
        }

        case 'SET_UPLOAD_SUCCESS_MESSAGE': {
            return {
                ...state,
                showUploadSuccessMessage: action.bool
            }
        }

        default: {
            return state
        }
    }
}

export default singleAttendee