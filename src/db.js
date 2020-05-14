import firebase from "firebase/app";
import 'firebase/firestore';

console.log("store", JSON.stringify(config));
console.log("process", process.env)


let config = {
    projectId: process.env.VUE_APP_PROJECTID,
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseUrl: process.env.VUE_APP_DATABASEURL,
    storageBucket: process.env.VUE_APP_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_APPID
}

const db = firebase.initializeApp(config).firestore();

//  Firebase Utils.
const { Timestamp } = firebase.firestore
const auth = firebase.auth();
const currentUser = auth.currentUser;

// Firebase Collections.
const usersCollection = db.collection('users');
const projectsCollection = db.collection('projects');


export { Timestamp, auth, currentUser, usersCollection, projectsCollection };
export default db;
