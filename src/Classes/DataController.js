import Fire from './Fire'

class DataController {
    constructor () {
        this.localSource = "Project-Babel-Store";
        this.fireBaseSrc = Fire.database().ref('testDir')
        this.fireBaseAudioStore = Fire.storage().ref('testAudio')
        this.tempNewState;
    }

    String_To_Object = (string) => {
        var newObject = JSON.parse(string);
        newObject
            .audioClipArray
            .forEach(e => {
                this.fireBaseAudioStore.child(e.id + ".wav").getDownloadURL().then(function(url){
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

    Read_From_Store = () => {
        return this.String_To_Object(localStorage[this.localSource])
    }

    Write_To_Store = (object) => {
        localStorage[this.localSource] = this.Object_To_String(object)
    }

    Read_From_FireBase = (SetStateFunc) => {
        this.fireBaseSrc.once("value", function(snapshot){
            var newState = Data.String_To_Object(snapshot.val().json)
            SetStateFunc(newState)
        }) 
    }

    Write_To_FireBase = (object) => {
        var newString = this.Object_To_String(object)
        this.fireBaseSrc.set({json: newString})
    }

}

var Data = new DataController();
export default Data;