
// import firebase from "https://www.gstatic.com/firebasejs/4.10.1/firebase.js"


// // Initialize Firebase
// var config = {
// apiKey: "AIzaSyCnSbKLiHhiH7_yLQwuaqUJQwDGItoILlk",
// authDomain: "project-babel-datastore.firebaseapp.com",
// databaseURL: "https://project-babel-datastore.firebaseio.com",
// projectId: "project-babel-datastore",
// storageBucket: "project-babel-datastore.appspot.com",
// messagingSenderId: "970549376509"
// };
// firebase.initializeApp(config);

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