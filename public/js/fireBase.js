var app_fireBase = {};
(function() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCF2TyIA5_nUV1ASpq7pg0RjpInP-rRDz8",
      authDomain: "aaa-mmxx-9637b.firebaseapp.com",
      databaseURL: "https://aaa-mmxx-9637b.firebaseio.com",
      projectId: "aaa-mmxx-9637b",
      storageBucket: "aaa-mmxx-9637b.appspot.com",
      messagingSenderId: "394889106690",
      appId: "1:394889106690:web:131f1fce446c6345a25e1b",
      measurementId: "G-Q4KZL2GE4X"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    app_fireBase = firebase;

    console.log("FireBase initialized");
})()