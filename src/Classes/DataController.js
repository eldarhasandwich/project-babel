import Fire from './Fire'

class DataController {
    constructor () {
        this.localSource = "Project-Babel-Store";
        this.fireBaseSrc = Fire.database().ref('testDir')
        this.tempNewState;
    }

    String_To_Object = (string) => {
        var newObject = JSON.parse(string);
        newObject
            .audioClipArray
            .forEach(e => {
                e.audioSrc = new Audio(e.audioSrc)
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
        //console.log(firebase);
    }

    Read_From_FireBase = () => {
        this.fireBaseSrc.on("value", function(snapshot){
            console.log(snapshot.val().json)
            Data.tempNewState = Data.String_To_Object(snapshot.val().json)
        })
        //console.log(this.tempNewState) 

        //RETURN THE VAL OF SNAPSHOT HERE
    }

    Write_To_FireBase = (object) => {
        var newString = this.Object_To_String(object)
        this.fireBaseSrc.set({json: newString})
    }

}

var Data = new DataController();
export default Data;