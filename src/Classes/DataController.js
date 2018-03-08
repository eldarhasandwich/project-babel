import Fire from './Fire'

class DataController {
    constructor() {
        this.localSource = "Project-Babel-Store";

        this.databaseDir = "testDir";
        this.storageDir = "testAudio";
    }

    Set_This_DatabaseDir = (newDir) => {
        this.databaseDir = newDir.target.value;
    }

    String_To_Object = (string) => {
        var newObject = JSON.parse(string);
        newObject
            .audioClipArray
            .forEach(e => {
                Fire
                    .storage()
                    .ref(this.storageDir)
                    .child(e.id + ".mp3")
                    .getDownloadURL()
                    .then(function (url) {
                        e.audioSrc = new Audio(url)
                    })
            });
        return newObject;
    }

    Object_To_String = (object) => {
        var saveState = Object.assign({}, object) // ouch :(
        saveState
            .audioClipArray
            .forEach(e => {
                e.audioSrc = e.audioSrc.src
            });
        var newString = JSON.stringify(saveState);
        // this loop shouldn't need to be here but it is because JS pointers are stupid
        // as hell
        object
            .audioClipArray
            .forEach(e => {
                e.audioSrc = new Audio(e.audioSrc)
            });
        return newString;
    }

    State_Obj_To_FireBase_Obj = (stateObject) => {
        var firebaseObject = {
            audioClips: {}
        }
        //firebaseObject.selectedClipIndex = stateObject.selectedClipIndex;
        for (var i = 0; i < stateObject.audioClipArray.length; i++) {
            firebaseObject.audioClips[stateObject.audioClipArray[i].id] = {
                name: stateObject.audioClipArray[i].name,
                textA: stateObject.audioClipArray[i].textA,
                textB: stateObject.audioClipArray[i].textB
            }
        }
        console.log(firebaseObject)
        return firebaseObject
    }

    FireBase_Obj_To_State_Obj = (firebaseObject, SetStateFunc) => {
        var stateObject = {}
        stateObject.selectedClipIndex = 0;
        stateObject.audioClipArray = []
        var objKeys = Object.keys(firebaseObject.audioClips)
        for (var i = 0; i < objKeys.length; i++) {
            var audioClip = {
                id: objKeys[i],
                name: firebaseObject.audioClips[objKeys[i]].name,
                textA: firebaseObject.audioClips[objKeys[i]].textA,
                textB: firebaseObject.audioClips[objKeys[i]].textB,
                canPlay: false
            }
            stateObject
                .audioClipArray
                .push(audioClip)
        }

        stateObject
            .audioClipArray
            .forEach(e => {
                Fire
                    .storage()
                    .ref(this.storageDir)
                    .child(e.id + ".mp3")
                    .getDownloadURL()
                    .then(function (url) {
                        e.audioSrc = new Audio(url)
                        e.audioSrc.oncanplaythrough = function () {
                            //console.log("loaded media")
                            e.canPlay = true;
                            SetStateFunc(prevState => prevState)
                        }
                    })
            })

        console.log(stateObject)
        return stateObject;
    }

    Read_From_Store = () => {
        return this.String_To_Object(localStorage[this.localSource])
    }

    Write_To_Store = (object) => {
        localStorage[this.localSource] = this.Object_To_String(object)
    }

    Read_From_FireBase = (SetStateFunc) => {
        Fire
            .database()
            .ref(this.databaseDir)
            .once("value", function (snapshot) {
                if (snapshot.val() === null) {
                    alert("List key " + snapshot.key + " does not exist!");
                    return;
                }

                var newState = Data.FireBase_Obj_To_State_Obj(snapshot.val(), SetStateFunc)
                SetStateFunc(newState)
            })
    }

    Write_To_FireBase = (object) => {
        var firebaseObject = this.State_Obj_To_FireBase_Obj(object)
        Fire
            .database()
            .ref(this.databaseDir)
            .set(firebaseObject)
    }

}

var Data = new DataController();
export default Data;