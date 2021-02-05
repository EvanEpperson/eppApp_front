
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

  let app;

  if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  }else {
    app = firebase.app()
  }




  const db = app.firestore()
  const auth = firebase.auth()

  export {db, auth};