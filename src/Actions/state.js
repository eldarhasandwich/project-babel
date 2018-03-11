export function setSelectedClipIndex (newIndex) {
    return {
        type: "SET_SELECTED_INDEX",
        newIndex
    }
}

export function incrementIndex () {
    return (dispatch, getState) => {
        let state = getState()
        if (state.state.selectedClipIndex 
            > Object.keys(state.attendees.attendees).length) {
                return null
        }
        return dispatch({type: "INCREMENT_INDEX"})
    }
}

export function decrementIndex () {
    return (dispatch, getState) => {
        let state = getState()
        if (state.state.selectedClipIndex < 1){
            return null
        }
        return dispatch({type: "DECREMENT_INDEX"})
    }
}