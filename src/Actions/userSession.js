import Fire from '../Classes/Fire'
import DatabaseHandler from '../Classes/DatabaseHandler'
import { actions as audioActions } from 'redux-audio-fixed'

export function setUserSessionLoading (bool) {
    return {
        type: "SET_USER_SESSION_LOADING",
        bool
    }
}

export function setUserLoggedIn (bool, token) {
    if (!bool) {
        document.cookie = "userAuth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }

    return {
        type: "SET_USER_LOGGED_IN",
        bool,
        token
    }
}

export function allowAttendeeSorting (bool) {
    return dispatch => {
        dispatch(setSelectedAttendee(null))
        dispatch({
            type: "ALLOW_ATTENDEE_SORTING",
            bool
        })
    }
}


export function setUserCompanyName (newName) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userCompanyID
        
        Fire
            .database()
            .ref("_COMPANIES/" + userID)
            .set(
                {companyName: newName}
            )

    }
}

export function setUserCompany () {
    return (dispatch, getState) => {
        // let state = getState()
        Fire
            .database()
            .ref("_COMPANIES/" + Fire.auth().currentUser.uid)
            .on("value", function(snapshot) {
                // console.log(snapshot.val())

                dispatch(setUserSessionLoading(false))

                if (!snapshot.val()) {
                    dispatch({
                        type: "SET_USER_COMPANY",
                        companyID: Fire.auth().currentUser.uid,
                        companyName: null,
                        companyLists: {}
                    })
                    return 
                }

                dispatch({
                    type: "SET_USER_COMPANY",
                    companyID: Fire.auth().currentUser.uid,
                    companyName: snapshot.val().companyName,
                    companyLists: snapshot.val()._LISTS
                })
                
            }, function(error) {
                console.log("couldn't get company name")
                dispatch(setUserSessionLoading(false))
            })
    }
}

export function createNewList (newListName, newListDate, newListTime, newListLocation) {
    return (dispatch, getState) => {
        let state = getState()
        let companyID = state.userSession.userCompanyID
        let newList = DatabaseHandler.createNewList(newListName, newListDate.toString(), newListTime.toString(), "", newListLocation)
        
        Fire
            .database()
            .ref("_COMPANIES/" + companyID + "/_LISTS")
            .push()
            .set(
                newList
            )
    }
}

export function deleteList (listID) {
    return (dispatch, getState) => {
        let state = getState()
        let companyID = state.userSession.userCompanyID
        
        Fire
            .database()
            .ref(`_COMPANIES/${companyID}/_LISTS/${listID}`)
            .remove()
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

export function applyOrderPosChanges (newOrderPosSet) {
    return (dispatch, getState) => {
        let state = getState()
        let companyID = state.userSession.userCompanyID
        let selectedList = state.userSession.selectedList

        // console.log(newOrderPosSet)
        let updateObj = {}
        newOrderPosSet.forEach(item => {
            updateObj["_ATTENDEES/" + item[0] + "/orderPos"] = item[1]
        })
        // console.log(updateObj)

        Fire
            .database()
            .ref(`_COMPANIES/${companyID}/_LISTS/${selectedList}`)
            .update(updateObj)

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
    return (dispatch, getState) => {        
        dispatch({type: "SET_SELECTED_LIST", newSelectedList: newListID})

        let state = getState()
        let companyID = state.userSession.userCompanyID
        let selectedList = state.userSession.selectedList
        let attendees = state.userSession.companyLists[selectedList]._ATTENDEES || {}
        let attendeeKeys = Object.keys(attendees)
        console.log(attendees)

        for (var i = 0; i < attendeeKeys.length; i++) {
            if (attendees[attendeeKeys[i]].audioStatus !== "No Audio") {
                dispatch(pullAttendeeAudioFromStorage(companyID, selectedList, attendeeKeys[i]))
            }
        }

    }
}

export function setSelectedAttendee (newAttendeeID) {
    return {
        type: "SET_SELECTED_ATTENDEE",
        newSelectedAttendee: newAttendeeID
    }
}

export function pullAttendeeAudioFromStorage (compID, listID, attID) {
    return (dispatch, getState) => {
        // let state = getState()

        Fire
            .storage()
            .ref(compID + "/" + listID)
            .child(attID + ".mp3")
            .getDownloadURL()
            .then(function (url) {
                dispatch(audioActions.audioSrc(`audio-${compID}~${listID}~${attID}`, url))
            }, function (error) {
                //this audio file isnt stored
            })

        }
    }