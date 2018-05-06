import * as request from 'superagent'
import config from '../config'

export function sendAudioRequestEmail(listID, attID) {
    return (dispatch, getState) => {
        let state = getState()

        request
            .post(config.api + "/email/send")
            .set("Authorization", state.userSession.firebaseToken)
            .send({
                listID: listID,
                userIDs: attID
            })
            .end(function(a){})
    }

}

export function sendAudioReplacementEmail(listID, attID, message) {
    return (dispatch, getState) => {
        let state = getState()

        request
            .post(config.api + "/email/send")
            .set("Authorization", state.userSession.firebaseToken)
            .send({
                listID: listID,
                userIDs: attID,
                message: message
            })
            .end(function(a){})
    }

}
