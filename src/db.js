import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import store from "./store"

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
db.enablePersistence({ synchronizeTabs: true })

// const currentUser = auth.currentUser;
// For storing project extra files.
const storageRef = firebase.storage().ref();
const { TaskEvent, TaskState } = firebase.storage
// Firebase Collections.
const projectsCollection = db.collection('projects');
const draftsCollection = db.collection('drafts');
const currentUser = auth.currentUser;
const newUser = uid => db.collection('users').doc(`${uid}`)
const users = db.collection('users');
const chats = db.collection('chats');
const userPayments = uid => db.collection('users').doc(uid).collection('payments');
const notifications = db.collection('notifications');
const reviews = db.collection('reviews')


auth.onAuthStateChanged((user) => {
    store.dispatch('user/fetchUser', user, { root: true })
})

export { 
    Timestamp, 
    auth, 
    newUser, 
    users, 
    notifications, 
    userPayments, 
    currentUser, 
    chats, 
    projectsCollection, 
    draftsCollection, 
    storageRef, 
    TaskEvent, 
    TaskState, 
    config,
    reviews
};

export default db;

