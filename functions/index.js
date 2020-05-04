const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.getData = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.end();
 } else {

   const docName = req.body.username;
   const docRef = db.collection('sites').doc(docName);
   const getDoc = docRef.get()
     .then(doc => {
       if (!doc.exists) {
         console.log('No such document!');
         return res.send(400, {'status':'Not Found'});
       } 
         return res.send(200, doc.data());
     })
     .catch(err => {
       console.log('Error getting document', err);
     });
 }

  });


exports.insertData = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.end();
 } else {
   
   const docName = req.body.username;
   db.collection("sites").doc(req.body.username).set({
       name: req.body.name,
       phone: req.body.phone,
       email: req.body.email,
       headline: req.body.headline,
       description: req.body.description,
       information_paragraph: req.body.information_paragraph,
       information_title: req.body.information_title,
       color: req.body.color,
   })
   .then(function() {
       console.log("Document successfully written!");
       return res.send(200, 'success');
   })
   .catch(function(error) {
       console.error("Error writing document: ", error);
       return res.send(500, 'insert error');
   });
 }

 });
    
exports.getComments = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.end();
 } else {
   var arr = [];
   while(arr.length < 3){
       var r = Math.floor(Math.random() * 9);
       if(arr.indexOf(r) === -1) arr.push(r);
   }
   
   console.log(arr);
   
   var commentValues = []
  
   const docRef1 = db.collection('comments').doc(String(arr[0]));
   const getDoc1 = docRef1.get()
     .then(doc => {
       if (!doc.exists) {
         console.log('No such document!');
         return res.send(500, 'Not Found');
       } 
       commentValues.push(doc.data());
       const docRef2 = db.collection('comments').doc(String(arr[1]));
       const getDoc2 = docRef2.get()
         .then(doc => {
           if (!doc.exists) {
             console.log('No such document!');
             return res.send(500, 'Not Found');
           } 
           commentValues.push(doc.data());
           const docRef3 = db.collection('comments').doc(String(arr[2]));
           const getDoc3 = docRef3.get()
             .then(doc => {
               if (!doc.exists) {
                 console.log('No such document!');
                 return res.send(500, 'Not Found');
               } 
               commentValues.push(doc.data());
               return res.send(200, {"commentValues": commentValues});
  
             })
             .catch(err => {
               console.log('Error getting document', err);
             });
         
         })
         .catch(err => {
           console.log('Error getting document', err);
         });
     
     })
     .catch(err => {
       console.log('Error getting document', err);
     });
 }




});
