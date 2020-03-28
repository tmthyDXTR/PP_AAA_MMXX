
var firebase = app_fireBase;

var uid = null;
var userID = null;
var uEmail = null;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // var nickname = user.displayName;
      uEmail = user.email;
      var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      uid = user.uid;
      loadUserData(uid);
      userID = uid;
    } else {
      // User is signed out.
      uid = null;
      window.location.replace('/login.html');
    }
  });

function logOut() {
    firebase.auth().signOut();
}


function loadUserData(uid) {
  // Firebase data retrieval function
  firebase.database().ref('users/' + uid).once('value').then(function (snapshot) {
    // Here we get the data
    var vorname = snapshot.val().vorname;
    var nachname = snapshot.val().nachname;
    var spitzname = snapshot.val().spitzname;
    var xMalDabei = snapshot.val().xMalDabei;
    var behindert = snapshot.val().behindert;
    var anmerkung = snapshot.val().anmerkung;
    var essen = snapshot.val().essen;
    var ordner = snapshot.val().ordner;
    var fahrer = snapshot.val().fahrer;
    var tshirt = snapshot.val().tshirt;
    var pulli = snapshot.val().pulli;

    // Now we can use the data variables in the html
    document.getElementById("vorname").value = vorname;
    document.getElementById("nachname").value = nachname;
    document.getElementById("spitzname").value = spitzname;

    document.getElementById("xMalDabei").value = xMalDabei;
    // document.getElementById("behindert").checked = behindert;
    document.getElementById("anmerkung").value = anmerkung;
    document.getElementById("essen").value = essen;
    // document.getElementById("ordner").checked = ordner;
    // document.getElementById("fahrer").checked = fahrer;
    document.getElementById("tshirt").value = tshirt;
    document.getElementById("pulli").value = pulli;

    console.log("User data retrieved");
  })
}


function updateUserData() {
  const fb = firebase.database().ref('users/' + userID)
  
  var email = uEmail;
  var vorname = document.getElementById("vorname").value;
  var nachname = document.getElementById("nachname").value;
  var spitzname = document.getElementById("spitzname").value;

  var xMalDabei = document.getElementById("xMalDabei").value;
  // var behindert = document.getElementById("behindert").checked;
  var anmerkung = document.getElementById("anmerkung").value;
  var essen = document.getElementById("essen").value;
  // var ordner = document.getElementById("ordner").checked;
  // var fahrer = document.getElementById("fahrer").checked;
  var tshirt = document.getElementById("tshirt").value;
  var pulli = document.getElementById("pulli").value;


  data = {
    email,
    vorname,
    nachname,
    spitzname,
    xMalDabei,
    behindert,
    anmerkung,
    essen,  
    ordner,
    fahrer,
    tshirt,
    pulli,
  }
  fb.update(data);
  console.log("Data updated");
  alert("Deine Daten wurden aktualisiert");
}

