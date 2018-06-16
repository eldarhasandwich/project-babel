import firebase from 'firebase'
require("firebase/functions");

//Initialize Firebase 
var config = require("../config/firebase.json")

var Fire = firebase.initializeApp(config);
// let functions = firebase.functions()
export default Fire;