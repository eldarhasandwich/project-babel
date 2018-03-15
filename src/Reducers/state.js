const defaultState = {
    selectedClipIndex: 0,
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