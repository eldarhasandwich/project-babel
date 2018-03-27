import Fire from '../Classes/Fire'
import { actions as audioActions } from 'redux-audio-fixed'

export function addAttendee (id, name, audioSrc, orderPos, textA, textB, audioNeedsReplacement, audioIsVerified) {
    return (dispatch, getState) => {
        Fire
            .storage()
            .ref("testAudio")
            .child(id + ".mp3")
            .getDownloadURL()
            .then(function (url){
                dispatch( {
                    type: "ADD_ATTENDEE",
                    audioSrc: url,
                    orderPos,
                    id,
                    name,
                    textA,
                    textB,
                    audioNeedsReplacement,
                    audioIsVerified
                })
                dispatch(audioActions.audioSrc(`audio-${id}`, url))
            }).catch(function(error) { // Storage does not have an audiofile for this Attendee
                dispatch( {
                    type: "ADD_ATTENDEE",
                    audioSrc: null,
                    orderPos,
                    id,
                    name,
                    textA,
                    textB
                })
            })
    }
}

export function loadedAudio (attendeeID) { 
    return {
        type: "LOADED_AUDIO",
        id: attendeeID
    }
}

export function swapAttendeeOrderPosition (attendeeA_ID, attendeeB_ID) {
    return {
        type: "SWAP_ORDER_POSITION",
        id_A: attendeeA_ID,
        id_B: attendeeB_ID
    }
}

export function updateAttendeeAttribute (attendeeID, targetField, newValue) {
    if (attendeeID !== null) {
        return {
            type: "UPDATE_ATTRIBUTE",
            attendeeID,
            targetField,
            newValue
        }
    } return {
        type: "UPDATE_ATTRIBUTE_FAILED",
        reason: "Invalid Field"
    }
}

export function clearAttendeeList () {
    return {
        type: "CLEAR_ATTENDEE_LIST"
    }
}

export function verifyAttendeeAudio (attendeeID) {
    return {
        type: "VERIFY_ATTENDEE_AUDIO",
        attendeeID
    }
}

export function markAttendeeAudioAsNeedsReplacement (attendeeID) {
    return {
        type: "MARK_ATTENDEE_AUDIO_AS_NEEDS_REPLACEMENT",
        attendeeID
    }
}

export function loadAttendees (listKey) {
    return (dispatch, getState) => {
        if (listKey === "") {
            alert("Please enter a list ID")
            return;
        }
        Fire.database().ref(listKey).once("value",function(snapshot) {
            if (!snapshot.val()) {
                alert("No list with this ID!")
                return;
            }

            dispatch(clearAttendeeList())

            var objKeys = Object.keys(snapshot.val().audioClips)
            for (var i = 0; i < objKeys.length; i++) {
                dispatch(addAttendee(
                    objKeys[i],
                    snapshot.val().audioClips[objKeys[i]].name,
                    null,
                    snapshot.val().audioClips[objKeys[i]].orderPos,
                    snapshot.val().audioClips[objKeys[i]].textA,
                    snapshot.val().audioClips[objKeys[i]].textB,
                    snapshot.val().audioClips[objKeys[i]].audioNeedsReplacement,
                    snapshot.val().audioClips[objKeys[i]].audioIsVerified
                ))
            }
            
        })
    }
}