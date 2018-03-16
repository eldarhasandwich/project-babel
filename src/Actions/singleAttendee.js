import Fire from '../Classes/Fire'

// import { actions as audioActions } from 'redux-audio-fixed'

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
            dispatch(setSingleAttendee(
                snapshot.val().id,
                snapshot.val().name,
                snapshot.val().orderPos,
                snapshot.val().textA,
                snapshot.val().textB,
            ))

            dispatch({
                type: "SET_ATTENDEE_LOADED_STATUS",
                bool: true
            })

        })
    }
}

export function setSingleAttendee (id, name, orderPos, textA, textB) {
    return {
        type: "LOAD_IN_ATTENDEE",
        id,
        name,
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