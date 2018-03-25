const defaultState = {
    isLoggedIn: false
}


const userSession = (state = defaultState, action) => {
    switch (action.type) {

        case 'SET_USER_LOGGED_IN': {
            return {
                ...state,
                isLoggedIn: action.bool
            }
        }

        default: {
            return state
        }
    }
}

export default userSession