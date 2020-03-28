var firebase = app_fireBase;

function toggleSignIn() {
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {
      var email = document.getElementById('inputEmail').value;
      var password = document.getElementById('inputPassword').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('btnLogin').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authwithemail]


    }
    document.getElementById('btnLogin').disabled = true;
    
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User email is signed in.
        if (user.emailVerified) {
            window.location.replace('/main.html');
        }
        else {
            firebase.auth().signOut();
            alert('Bestätige erst deine Emailadresse');
            
        }

    } else {
        // User is signed out.
    }
});