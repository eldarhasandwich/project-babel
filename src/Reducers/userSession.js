const defaultState = {
    isLoggedIn: false,
    userCompanyID: null,
    userCompanyName: "",
    companyLists: {},
    selectedList: null,
    selectedAttendee: null,
    attendeeSortingAllowed: false
}


const userSession = (state = defaultState, action) => {
    switch (action.type) {

        case 'SET_USER_LOGGED_IN': {
            return {
                ...state,
                isLoggedIn: action.bool
            }
        }

        case 'SET_USER_COMPANY': {
            return {
                ...state,
                userCompanyID: action.companyID,
                userCompanyName: action.companyName,
                companyLists: action.companyLists
            }
        }

        case 'SET_SELECTED_LIST': {
            return {
                ...state,
                selectedList: action.newSelectedList,
                selectedAttendee: null
            }
        }

        case 'SET_SELECTED_ATTENDEE': {
            return {
                ...state,
                selectedAttendee: action.newSelectedAttendee
            }
        }

        case 'ALLOW_ATTENDEE_SORTING': {
            return {
                ...state,
                attendeeSortingAllowed: action.bool
            }
        }

        default: {
            return state
        }
    }
}

export default userSession