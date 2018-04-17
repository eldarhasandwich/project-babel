import SESHandler from '../Classes/SES'
import firebase from 'firebase'

export function sendAudioRequestEmail(compID, listID, attID) {
    return (dispatch, getState) => {
        let state = getState()
        let attendeeObj = state.userSession.companyLists[listID]._ATTENDEES[attID]
        let attName = attendeeObj.name
        let attEmail = attendeeObj.contactEmail

        if (!attName || !attEmail) {
            console.log("This attendee either has no name or email")
            return
        }

        var attInfo = {
            name: attName,
            email: attEmail,
            accessKey: `${compID}~${listID}~${attID}`
        }

        let emailText = attInfo.accessKey
        let emailHTML = '<p>' + attInfo.accessKey + '</p>'

        SESHandler.sendEmail(attInfo.email, "Do not reply to this Email", emailText, emailHTML)

    }
}
