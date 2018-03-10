import Data from '../Classes/DataController'
import Fire from '../Classes/Fire'

import { actions as audioActions } from 'redux-audio-fixed'

export function addAttendee (id, name, audioSrc, textA, textB, listKey) {
    return (dispatch, getState) => {
        Fire
            .storage()
            .ref(listKey)
            .child(id + ".mp3")
            .getDownloadURL()
            .then(function (url){
                dispatch( {
                    type: "ADD_ATTENDEE",
                    audioSrc: url,
                    id,
                    name,
                    textA,
                    textB
                })
                dispatch(audioActions.audioSrc(`audio-${id}`, url))
            })
    }
}

export function loadedAudio (attendeeID) { 
    return {
        type: "LOADED_AUDIO",
        id: attendeeID
    }
}

export function loadAttendees (listKey) {
    return (dispatch, getState) => {
        Fire.database().ref(listKey).once("value",function(snapshot) {
            if (!snapshot.val()) {
                return;
            }
            var objKeys = Object.keys(snapshot.val().audioClips)
            for (var i = 0; i < objKeys.length; i++) {
                dispatch(addAttendee(
                    objKeys[i],
                    snapshot.val().audioClips[objKeys[i]].name,
                    null,
                    snapshot.val().audioClips[objKeys[i]].textA,
                    snapshot.val().audioClips[objKeys[i]].textB,
                    listKey
                ))
            }
            
        })
    }
}