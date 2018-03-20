import Fire from '../Classes/Fire'
import { actions as audioActions } from 'redux-audio-fixed'

export function pullAttendee (listID, attendeeID) {
    return (dispatch, getState) => {
        if (listID === "" || attendeeID === "") {
            return;
        }
        console.log(listID+"/audioClips/"+attendeeID)
        Fire.database().ref(listID+"/audioClips/"+attendeeID).once("value", function(snapshot) {
            if (!snapshot.val()) {
                alert("The provided key is incorrect!")
                return;
            }

            Fire
            .storage()
            .ref("testAudio")
            .child(attendeeID + ".mp3")
            .getDownloadURL()
            .then(function (url){
                dispatch( {
                    type: "LOAD_IN_ATTENDEE",
                    audioSrc: url,
                    id: snapshot.val(),
                    name: snapshot.val().name,
                    orderPos: snapshot.val().orderPos,
                    textA: snapshot.val().textA,
                    textB: snapshot.val().textB
                })
                dispatch({
                    type: "SET_ATTENDEE_LOADED_STATUS",
                    bool: true
                })
                dispatch(audioActions.audioSrc(`audio-${attendeeID}`, url))
            }).catch(function(error) {
                dispatch( {
                    type: "LOAD_IN_ATTENDEE",
                    audioSrc: null,
                    id: snapshot.val(),
                    name: snapshot.val().name,
                    orderPos: snapshot.val().orderPos,
                    textA: snapshot.val().textA,
                    textB: snapshot.val().textB
                })
                dispatch({
                    type: "SET_ATTENDEE_LOADED_STATUS",
                    bool: true
                })
            })
        })
    }
}

export function setSingleAttendee (id, name, audioSrc, orderPos, textA, textB) {
    return {
        type: "LOAD_IN_ATTENDEE",
        id,
        name,
        audioSrc,
        orderPos,
        textA,
        textB
    }
}

export function setAttendeeLoadedStatus (bool) {
    return {
        type: "SET_ATTENDEE_LOADED_STATUS",
        bool
    }
}