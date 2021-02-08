
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";




  var firebaseConfig = {
    apiKey: "AIzaSyB7t1HpPUolF1HWAs7d-6OmxGQnYPvD5Z8",
    authDomain: "epp-messaging.firebaseapp.com",
    projectId: "epp-messaging",
    storageBucket: "epp-messaging.appspot.com",
    messagingSenderId: "966725075871",
    appId: "1:966725075871:web:d258154f250ec50b5e73aa",
    measurementId: "G-3P2L2B760R"
  };


  // var firebaseConfig = {
  //   apiKey: "AIzaSyB7t1HpPUolF1HWAs7d-6OmxGQnYPvD5Z8",
  //   authDomain: "epp-messaging.firebaseapp.com",
  //   // For databases not in the us-central1 location, databaseURL will be of the
  //   // form https://[databaseName].[region].firebasedatabase.app.
  //   // For example, https://your-database-123.europe-west1.firebasedatabase.app
  //   databaseURL: "https://epp-messaging-default-rtdb.firebaseio.com/",
  //   storageBucket: "bucket.appspot.com",
  // };
  // firebase.initializeApp(firebaseConfig);


  let app;

  if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  }else {
    app = firebase.app()
  }

// var connectedRef = firebase.database().ref(".info/connected");
// connectedRef.on("value", function (snap) {
//   if (snap.val() === true) {
//     alert("connected");
//   } else {
//     alert("not connected");
//   }
// });



  const db = app.firestore();
  // var database = firebase.database()
  // const db = firebase.database();
  const auth = firebase.auth()

  export {db, auth};