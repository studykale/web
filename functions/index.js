const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('./key/admin.json')),
    databaseURL: "https://studykale-4466b.firebaseio.com"
})
const express = require('express');
const cors = require('cors');
const app = express()
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


app.use(cors({ origin: true }))


app.post('/:projectId', (req, res) => {
    let projectId = req.params.projectId;
    
    if(req.query.cancelled) {
        res.redirect(301, `https://studykale.com/project-pay/${projectId}/cancelled`)
    } else {
        let ref = req.query.flwref;
        res.redirect(301, `https://studykale.com/project-pay/${projectId}/successful?PayRef=${ref}`)
    }
})

exports.redirectToProject = functions.https.onRequest(app)
 
