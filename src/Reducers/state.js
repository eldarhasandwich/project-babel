const defaultState = {
    selectedClipIndex: 0
}

const state = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_INDEX': {
            return {
                ...state,
                selectedClipIndex: action.newIndex
            }
        }

        default:
            {
                return state
            }

    }
}

export default state