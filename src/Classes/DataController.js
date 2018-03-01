
class DataController {

    Read_From_JSON = (source) => {
        var string = localStorage[source];
        return JSON.parse(string);
    }

    Write_To_JSON = (object, source) => {
        var string = JSON.stringify(object);
        localStorage[source] = string;
    }

    Read_From_FireBase = () => {

    }

    Write_To_FireBase = () => {

    }

}

var Data = new DataController();

export default Data;