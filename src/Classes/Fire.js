import firebase from 'firebase'
//Initialize Firebase 
var config = { 
    apiKey: "AIzaSyCnSbKLiHhiH7_yLQwuaqUJQwDGItoILlk",
    authDomain: "project-babel-datastore.firebaseapp.com", 
    databaseURL: "https://project-babel-datastore.firebaseio.com", 
    projectId: "project-babel-datastore", 
    storageBucket: "project-babel-datastore.appspot.com", 
    messagingSenderId: "970549376509"
};

var Fire = firebase.initializeApp(config);
export default Fire;