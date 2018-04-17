const functions = require('firebase-functions');
const admin = require('firebase-admin');
var aws = require('aws-sdk');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendEmail = functions.https.onRequest((request, response) => {
    let attName = request.attInfo.name;
    let attEmail = request.attInfo.email;
    let attAccessKey = request.attInfo.accessKey;

    let sender = "Vocalist Emailer <vocalist-no-reply@vocalist.online>";
    let charset = "UTF-8";
    let ses = new aws.SES();

    var params = {
        Source: sender,
        Destination: {
            ToAddresses: [attEmail]
        },
        Message: {
            Subject: {
                Data: "Do not reply to this Email",
                Charset: charset
            },
            Body: {
                Text: {
                    Data: `${attAccessKey}`,
                    Charset: charset
                },
                Html: {
                    Data: `${attAccessKey}`,
                    Charset: charset
                }
            }
        },
    };

    ses.sendEmail(params, (err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("email sent");
        }
    })

})

exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, snapshot.ref.toString());
    });
  });