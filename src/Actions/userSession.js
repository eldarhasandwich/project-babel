
import Fire from '../Classes/Fire'
import DatabaseHandler from '../Classes/DatabaseHandler'

export function setUserLoggedIn (bool) {
    return {
        type: "SET_USER_LOGGED_IN",
        bool
    }
}

export function setUserCompany () {
    return (dispatch, getState) => {
        let state = getState()
        Fire
            .database()
            .ref("_COMPANIES/" + state.userSession.userCompanyID)
            .on("value", function(snapshot) {
                dispatch({
                    type: "SET_USER_COMPANY",
                    companyID: state.userSession.userCompanyID,
                    companyName: snapshot.val().companyName,
                    companyLists: snapshot.val()._LISTS
                })
            }, function(error) {
                console.log("couldn't get company name")
            })
    }
}

export function createNewList (newListName) {
    return (dispatch, getState) => {
        let state = getState()
        let companyID = state.userSession.userCompanyID
        let newList = DatabaseHandler.createNewList(newListName)
        
        Fire
            .database()
            .ref("_COMPANIES/" + companyID + "/_LISTS")
            .push()
            .set(
                newList
            )
    }
}

export function addNewAttendee (newAttendeeName) {
    return (dispatch, getState) => {
        let state = getState()
        let companyID = state.userSession.userCompanyID
        let selectedList = state.userSession.selectedList
        let nextOrderPos = state.userSession.companyLists[selectedList].nextOrderPos
        let newAttendee = DatabaseHandler.createNewAttendee(newAttendeeName, nextOrderPos)

        Fire
            .database()
            .ref("_COMPANIES/" + companyID + "/_LISTS/" + selectedList)
            .update({nextOrderPos: nextOrderPos + 1})

        Fire
            .database()
            .ref("_COMPANIES/" + companyID + "/_LISTS/" + selectedList + "/_ATTENDEES")
            .push()
            .set(
                newAttendee
            )
    }
}

export function setSelectedList (newListID) {
    return {
        type: "SET_SELECTED_LIST",
        newSelectedList: newListID
    }
}

export function setSelectedAttendee (newAttendeeID) {
    return {
        type: "SET_SELECTED_ATTENDEE",
        newSelectedAttendee: newAttendeeID
    }
}