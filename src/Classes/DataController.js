import Fire from './Fire'

class DataController {

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

    Read_From_Store = (source) => {
        return this.String_To_Object(localStorage[source])
    }

    Write_To_Store = (object, source) => {
        localStorage[source] = this.Object_To_String(object)
        //console.log(firebase);
    }

    Read_From_FireBase = () => {}

    Write_To_FireBase = (object) => {}

}
console.log(Fire)

var Data = new DataController();
export default Data;