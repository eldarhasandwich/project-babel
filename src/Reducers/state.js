const defaultState = {
    //EMCEE
    selectedClipIndex: 0,

    //ADMIN
    verifiedAttendeesVisible: true,
    unverifiedAttendeesVisible: true,
    attendeesWithAudioNeedingReplacementVisible: true,
    attendeesWithNoAudioVisible: true,

    fireBaseDataDirectory: "",
    fireBaseStorageDirectory: "testAudio"



}

const state = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_INDEX': {
            return {
                ...state,
                selectedClipIndex: action.newIndex
            }
        }

        case 'SET_FIREBASE_DATA_DIR': {
            return {
                ...state,
                fireBaseDataDirectory: action.newDir
            }
        }

        case 'SET_VERIFIED_ATTENDEE_VISIBILITY': {
            return {
                ...state,
                verifiedAttendeesVisible: action.boolean
            }
        }

        case 'SET_UNVERIFIED_ATTENDEE_VISIBILITY': {
            return {
                ...state,
                unverifiedAttendeesVisible: action.boolean
            }
        }

        case 'SET_ATTENDEES_NEEDING_AUDIO_REPLACEMENT_VISIBILITY': {
            return {
                ...state,
                attendeesWithAudioNeedingReplacementVisible: action.boolean
            }
        }

        case 'SET_NO_AUDIO_ATTENDEE_VISIBILITY': {
            return {
                ...state,
                attendeesWithNoAudioVisible: action.boolean
            }
        }

        // case 'SET_FIREBASE_STORE_DIR': {
        //     return {
        //         ...state,
        //         fireBaseStorageDirectory: action.newDir
        //     }
        // }

        default:
            {
                return state
            }

    }
}

export default state