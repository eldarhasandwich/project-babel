
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

export function addNewAttendee (newAttendeeName, newAttendeeEmail) {
    return (dispatch, getState) => {
        let state = getState()
        let companyID = state.userSession.userCompanyID
        let selectedList = state.userSession.selectedList

        let attendees = state.userSession.companyLists[selectedList]._ATTENDEES
        let attendeeCount = 0
        if (attendees !== null && attendees !== undefined) {
            attendeeCount = Object.keys(state.userSession.companyLists[selectedList]._ATTENDEES).length
        }
        // let nextOrderPos = state.userSession.companyLists[selectedList].nextOrderPos
        let newAttendee = DatabaseHandler.createNewAttendee(newAttendeeName, newAttendeeEmail, attendeeCount)

        Fire
            .database()
            .ref("_COMPANIES/" + companyID + "/_LISTS/" + selectedList)
            .update({nextOrderPos: attendeeCount+1})

        Fire
            .database()
            .ref("_COMPANIES/" + companyID + "/_LISTS/" + selectedList + "/_ATTENDEES")
            .push()
            .set(
                newAttendee
            )
    }
}

export function updateAttendeeAudioStatus (newAudioStatus) {
    return (dispatch, getState) => {
        let state = getState()
        let companyID = state.userSession.userCompanyID
        let selectedList = state.userSession.selectedList
        let selectedAttendee = state.userSession.selectedAttendee

        Fire
            .database()
            .ref("_COMPANIES/" + companyID + "/_LISTS/" + selectedList + "/_ATTENDEES/" + selectedAttendee)
            .update({audioStatus: newAudioStatus})
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