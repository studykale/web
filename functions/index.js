
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
sgMail.setApiKey(functions.config().sendgrid.key);

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
            date: new Date(),
            type: "New User",
            description: "Email was sent successfully"
        })
    })
    .catch(error => {
        return admin.firestore().collection('email').add({
            status:"Not sent",
            date: new Date(),
            type: "New User",
            description: "Email was not sent successfully: "+error
        })
    })

})

exports.createPaymentProject = functions.firestore.document('projects/{documentId}').onCreate((event, context) => {
    var projectData = event.data();

    console.log("created", projectData)

    sgMail.send({
        to: 'studykale@gmail.com',
        from: 'support@studykale.com',
        templateId: 'd-3180cda4570345b5821f97b9615fe547',
        substitutionWrappers: ["{{", "}}"],
        dynamicTemplateData: {
            project_id: context.params.documentId,
            project_name: projectData.name,
            price: projectData.price,
            deadline: projectData.deadline.toDate(),
            project_type: projectData.paperType,
            pages: projectData.pages
        }
    })
    .then(async () => {
        await admin.firestore().collection('email').add({
            status:"Sent successfully",
            date: new Date(),
            type: "New Project",
            description: "Email was sent successfully to " + projectData.name
        });

        await admin.firestore().collection('notifications').add({
            name: "New Project",
            time: new Date(),
            read: false,
            description: `A new project was created with the name ${ projectData['name'] } and the price is ${ projectData['price'] }`
        })

       return admin.firestore().doc(`users/${projectData.creator}`)
        .get()
        .then(async result => {
            let userId = result.id;
          return sgMail.send({
                to: result.data().email,
                from: "team@studykale.com",
                subject: "Project received",
                text: "Thank you. We have received your project. We will update you when we are done.",
                html: "<p>Thank you we have received your project and we will be done in no time. Thank you for trusting in us.</p><br><p>Studykale Team</p>"
            })
            .then(async () => {
                await admin.firestore().collection('email').add({
                    status:"Sent successfully",
                    date: new Date(),
                    type: "Project received",
                    description: "Email on project received successfully sent to " + result.data().username
                });

               return admin.firestore().doc(`notifications/${userId}`).set({
                    time: new Date(),
                    read: false,
                    rvr: `${userId}`,
                    name: "Project received.",
                    description: `Thank you ${result.data().username} we have received your task and will update you on completion.`
                })
            })
            .catch(error => {
                admin.firestore().collection('email').add({
                    status:"Email Send failed",
                    date: new Date(),
                    type: "Project received",
                    description: "Email was not sent successfully to " + result.data().username + " with email " + result.data().email + ". The error is "+error
                });
            })
        })
        .catch(error => {
            console.log("error on getting user data", error)
        })

       
    })
    .catch(error => {
        admin.firestore().collection('email').add({
            status:"Not sent",
            date: new Date(),
            type: "New Project",
            description: "Email was not sent successfully: The name is " + projectData.name +" : "+error
        })
    })
})


app.post('/paymentsComplete', (req, res) => {

    admin.firestore().collection('payments').add(
        {
            payment_time: req.body.create_time,
            summary: req.body.summary,
            amount: req.body.resource.purchase_units[0].amount.value,
            payment: {
                id: req.body.resource.purchase_units[0].payments.captures[0].id,
                status: req.body.resource.purchase_units[0].payments.captures[0].status,
                fee: req.body.resource.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee,
                received_after_deduction: req.body.resource.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount
            },
            payer: req.body.resource.payer.name.given_name,
            email: req.body.resource.payer.email_address
        }
    )
    res.end();
})


exports.completePayment = functions.https.onRequest(app)
 
