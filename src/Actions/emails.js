import SESHandler from '../Classes/SES'
// import firebase from 'firebase'

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

        console.log(attInfo.accessKey)

        let emailText = `Hello ${attInfo.name}! Follow this link to access your upload portal: upload.vocalist.online/?k=${attInfo.accessKey}`
        let emailHTML = `Hello ${attInfo.name}! Follow this link to access your upload portal: <a href="upload.vocalist.online/?k=${attInfo.accessKey}">Click here!</a>`

        SESHandler.sendEmail(attInfo.email, "Do not reply to this Email", emailText, emailHTML)

    }
}
