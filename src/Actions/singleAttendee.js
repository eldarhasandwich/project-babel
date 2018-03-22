import Fire from '../Classes/Fire'
import { actions as audioActions } from 'redux-audio-fixed'

export function pullAttendee (listID, attendeeID) {
    return (dispatch, getState) => {
        dispatch(setAttendeeInfoLoading(true))
        if (listID === "" || attendeeID === "") {
            return;
        }
        console.log(listID+"/audioClips/"+attendeeID)
        Fire.database().ref(listID+"/audioClips/"+attendeeID).once("value", function(snapshot) {
            if (!snapshot.val()) {
                // alert("The provided key is incorrect!")
                dispatch(setIncorrectKeyStatus(true))
                dispatch(setAttendeeInfoLoading(false))
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
                    listID: listID,
                    id: attendeeID,
                    name: snapshot.val().name,
                    orderPos: snapshot.val().orderPos,
                    textA: snapshot.val().textA,
                    textB: snapshot.val().textB
                })
                dispatch(setAttendeeLoadedStatus(true))
                dispatch(setIncorrectKeyStatus(false))
                dispatch(setAttendeeInfoLoading(false))
                dispatch(audioActions.audioSrc(`audio-${attendeeID}`, url))
            }).catch(function(error) {
                dispatch( {
                    type: "LOAD_IN_ATTENDEE",
                    audioSrc: null,
                    listID: listID,
                    id: attendeeID,
                    name: snapshot.val().name,
                    orderPos: snapshot.val().orderPos,
                    textA: snapshot.val().textA,
                    textB: snapshot.val().textB
                })
                dispatch(setAttendeeLoadedStatus(true))
                dispatch(setIncorrectKeyStatus(false))
                dispatch(setAttendeeInfoLoading(false))
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

export function setIncorrectKeyStatus (bool) {
    return {
        type: "SET_INCORRECT_KEY_STATUS",
        bool
    }
}

export function setAttendeeInfoLoading (bool) {
    return {
        type: "SET_ATTENDEE_INFO_LOADING",
        bool
    }
}

export function setAudioIsUploading (bool) {
    return {
        type: "SET_AUDIO_IS_UPLOADING",
        bool
    }
}

export function setUploadSuccessMessage (bool) {
    return {
        type: "SET_UPLOAD_SUCCESS_MESSAGE",
        bool
    }
}

export function uploadAudioBlobToFirebase (blob) {
    return (dispatch, getState) => {
        dispatch(setAudioIsUploading(true))
        let state = getState()
        let thisAttendeeID = state.singleAttendee.singleAttendee.id
        let thisAttendeeListID = state.singleAttendee.singleAttendee.listID

        Fire.storage()
            .ref("testAudio/" + thisAttendeeID + ".mp3")
            .put(blob)
            .then(function(snapshot){
                // dispatch(setAttendeeLoadedStatus(false))

                dispatch(pullAttendee(thisAttendeeListID, thisAttendeeID))
                dispatch(setAudioIsUploading(false))
        })

    }
}

// state.singleAttendee.singleAttendee.id