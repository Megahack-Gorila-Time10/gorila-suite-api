const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.getData = functions.https.onRequest((req, res) => {
    const docName = req.body.username;
    const docRef = db.collection('sites').doc(docName);
    const getDoc = docRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          return res.send('Not Found')
        } 
          console.log(doc.data());
          return res.send(doc.data());
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   });

exports.insertData = functions.https.onRequest((req, res) => {
    const docName = req.body.username;
    const docRef = db.collection('sites').doc(docName);

    db.collection("sites").doc(req.body.username).set({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        headline: req.body.headline,
        description: req.body.description,
        information_paragraph:req.body.information_paragraph,
        information_title:req.body.information_title,
        color:req.body.color
    })
    .then(function() {
        console.log("Document successfully written!");
        return res.send(200, 'success')
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        return res.send(500, 'insert error')
    });
   });