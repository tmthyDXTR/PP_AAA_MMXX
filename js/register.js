var firebase = app_fireBase;

function handleSignUp() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    var nameField = document.getElementById('inputName').value;
    var surnameField = document.getElementById('inputNachname').value;
    var nicknameField = document.getElementById('inputNickname').value;
    if (email.length < 2) {
        alert('Please enter an email address.');
        return;
    }
    // if (name.length < 2) {
    //     alert('Please enter a name.');
    //     return;
    // }
    // if (surname.length < 2) {
    //     alert('Please enter a surname.');
    //     return;
    // }
    // if (nickname.length < 2) {
    //     alert('Please enter a nickname.');
    //     return;
    // }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Create user with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {        
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
        } else {
        alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]        
    });    
    // [END createwithemail]      
    
    
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) { 
        var uid = user.uid;
        writeUserData(uid);
        sendEmailVerification();
        firebase.auth().signOut()
            .then(function () {
                // Sign-out successful.
                
            }).catch(function (error) {
                // An error happened.
            });       
    }
});

function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Wir haben eine Bestätigungsmail an deine Email gesendet!');
      window.location.replace('/login.html');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
}

function writeUserData(uid) {
    firebase.database().ref('users/' + uid).set({
        vorname: document.getElementById('inputName').value,
        nachname: document.getElementById('inputNachname').value,
        spitzname: document.getElementById('inputNickname').value,
        email: document.getElementById('inputEmail').value,
    });
}