export function setSelectedClipIndex (newIndex) {
    return {
        type: "SET_SELECTED_INDEX",
        newIndex
    }
}

export function setFirebaseDataDirectory (newDir) {
    return {
        type: "SET_FIREBASE_DATA_DIR",
        newDir
    }
}

// export function setFirebaseStorageDirectory (newDir) {
//     return {
//         type: "SET_FIREBASE_STORE_DIR",
//         newDir
//     }
// }

export function incrementIndex () {
    return (dispatch, getState) => {
        let state = getState()
        if (state.state.selectedClipIndex 
            > Object.keys(state.attendees.attendees).length) {
                return;
        }
        return dispatch({type: "INCREMENT_INDEX"})
    }
}

export function decrementIndex () {
    return (dispatch, getState) => {
        let state = getState()
        if (state.state.selectedClipIndex < 1){
            return;
        }
        return dispatch({type: "DECREMENT_INDEX"})
    }
}

export function setVerifiedAttendeesVisible (boolean) {
    return {
        type: "SET_VERIFIED_ATTENDEE_VISIBILITY",
        boolean
    }
}

export function setUnverifiedAttendeesVisible (boolean) {
    return {
        type: "SET_UNVERIFIED_ATTENDEE_VISIBILITY",
        boolean
    }
}

export function setAttendeesWithAudioNeedingReplacementVisible (boolean) {
    return {
        type: "SET_ATTENDEES_NEEDING_AUDIO_REPLACEMENT_VISIBILITY",
        boolean
    }
}

export function setAttendeesWithNoAudioVisible (boolean) {
    return {
        type: "SET_NO_AUDIO_ATTENDEE_VISIBILITY",
        boolean
    }
}