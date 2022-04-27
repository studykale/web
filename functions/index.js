
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    // credential: admin.credential.cert(require('./key/admin.json')),
    // databaseURL: "https://studykale-4466b.firebaseio.com"
});
const paypal = require('paypal-rest-sdk');
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const { Stripe } = require("stripe")
sgMail.setApiKey(functions.config().sendgrid.key);
const stripe =  new Stripe(functions.config().stripe.secret, {
    apiVersion: "2020-03-02"
})


// To alert support of a new project using sendgrid the project id and name will be required.

if (process.env.NODE_ENV === 'development') {
    firebase.functions().useFunctionsEmulator('http://localhost:4000');
}

const app = express()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
app.use(cors({ origin: true }));
app.use(bodyparser.urlencoded({ extended: false }));

paypal.configure({
    mode: 'sandbox',
    client_id: functions.config().paypal.client_id,
    client_secret: functions.config().paypal.client_secret
})


exports.newUserSignUp = functions.auth.user().onCreate(async user => {
    

   return sgMail.send({
       to: 'studykale@gmail.com',
       from: 'support@studykale.com',
       templateId: "d-de53e79182b94d60b0a9f34a30b929dc",
       substitutionWrappers: ["{{", "}}"],
       substitutions: {
           "name": user.email
       },
       dynamicTemplateData: {
           name: user.email
       }
   })
    .then(() => {
        return admin.firestore().collection('email').add({
            status:"Sent",
            date: new Date.now(),
            type: "New User",
            description: "Email was sent successfully"
        })
    })
    .catch(error => {
        return admin.firestore().collection('email').add({
            status:"Not sent",
            date: new Date.now(),
            type: "New User",
            description: "Email was not sent successfully: "+error
        })
    })

})

exports.createPaymentProject = functions.firestore.document('projects/{documentId}').onCreate(async (event, context) => {
    let projectData = event.data();

   let userData = await admin.firestore().doc(`users/${projectData.creator}`)
    .get()

    console.log("userdata", userData)

    let { username, email } = userData.data();
    let userId = userData.id;

   return await stripe.charges.create({
    //    Uses cents have to multiply iy with 100
        amount: projectData.price * 100,
        currency: "AUD",
        description: `${projectData.name} - ${projectData.description}`,
        source: projectData.token,
    })
    .then(async (charge) => {
           return sgMail.send({
                to: 'studykale@gmail.com',
                from: 'support@studykale.com',
                templateId: 'd-51add76cab5b465b91e3b8e6107b5cb4',
                substitutionWrappers: ["{{", "}}"],
                dynamicTemplateData: {
                    project_id: context.params.documentId,
                    project_name: projectData.name,
                    price: projectData.price,
                    deadline: projectData.deadline.toDate(),
                    project_type: projectData.paperType,
                    pages: projectData.pages,
                    username,
                    user_email: email
                }
            })
    })
    .then(async () => {
        await admin.firestore().collection('email').add({
            status:"Sent successfully",
            date: new Date.now(),
            type: "New Project",
            description: "Email was sent successfully to " + projectData.name
        });
        
        await admin.firestore().collection("projects").doc(projectData.pid).set({ paid: true }, { merge: true })

        await admin.firestore().collection('notifications').add({
            name: "New Project",
            time: new Date.now(),
            read: false,
            description: `A new project was created with the name ${ projectData['name'] } and the price is ${ projectData['price'] }`
        })

       return admin.firestore().doc(`users/${projectData.creator}`)
        .get()
       
    })
    .then(async (result) => {
      return sgMail.send({
            to: result.data().email,
            from: "team@studykale.com",
            subject: "Project received",
            text: "Thank you. We have received your project. We will update you when we are done.",
            html: "<p>Thank you we have received your project and we will be done in no time. Thank you for trusting in us.</p><br><p>Studykale Team</p>"
        })
    })
    .then(async () => {
        await admin.firestore().collection('email').add({
            status:"Sent successfully",
            date: new Date.now(),
            type: "Project received",
            description: "Email on project " + projectData.name + " received successfully sent to " + username
        });

       return admin.firestore().collection("notifications").add({
            time: new Date.now(),
            read: false,
            rvr: userId,
            name: "Project received.",
            description: `Thank you ${username} we have received your task and will update you on completion.`
        })
    })
    .catch(async error => {
        console.log("failed terribly")
        await admin.firestore().collection(`notifications`).add({
            time: new Date.now(),
            read: false,
            rvr: userId,
            name: "Payment process failed",
            description: `Please check your payment information. We were unable to process payment.`
        })

        await sgMail.send({
            to: "studykale@gmail.com",
            from: "support@studykale.com",
            subject: "Payment failed",
            text: `Payment for a project failed. User - ${username} and email - ${email}.`,
            html: `<p>Payment for a project could not process successfully. It has therefore been deleted until successful payment is processed</p><br/><p>Studykale Support</p>`
        })

        await sgMail.send({
            to: email,
            from: "team@studykale.com",
            subject: "Payment process failed",
            text: "Please review the payment card used.",
            html: "<p>Please review your payment process. We could not receive the project if the payment does not complete. Please try again</p><br><p>Studykale Team</p>"
        })

        admin.firestore().collection('email').add({
            status:"Not sent",
            date: new Date.now(),
            type: "New Project",
            description: "Email was not sent successfully: The name is " + projectData.name +" : "+error
        })

        functions.logger.log(error);

        
        return await admin.firestore().collection("projects").doc(projectData.pid).delete();
    })

   

    
})


exports.completePayment = functions.https.onRequest(app)
 
