import SESHandler from '../Classes/SES'

function pullAttendeeNameEmail (compID, listID, attID) {
    return (dispatch, getState) => {
        let state = getState()
        let attendeeObj = state.userSession.companyLists[compID]._ATTENDEES[attID]
        let attName = attendeeObj.name
        let attEmail = attendeeObj.email

        if (attName === null || attName === undefined || attEmail === null || attEmail === undefined) {
            return null
        }

        return {
            name: attName,
            email: attEmail,
            accessKey: `${compID}~${listID}~${attID}`
        }
    }
}

export function sendAudioRequestEmail(compID, listID, attID) {
    return (dispatch, getState) => {
        let attInfo = pullAttendeeNameEmail(compID, listID, attID)
        if (attInfo === null) {
            console.log("This attendee either has no name or email")
            return
        }



    }
}


export function sendAudioReplacementRequestEmail(compID, listID, attID){
    return (dispatch, getState) => {
        let attInfo = pullAttendeeNameEmail(compID, listID, attID)
        if (attInfo === null) {
            console.log("This attendee either has no name or email")
            return
        }


    }
}