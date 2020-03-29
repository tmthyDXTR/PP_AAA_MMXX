
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
    document.getElementById("behindert").checked = behindert;
    document.getElementById("anmerkung").value = anmerkung;
    document.getElementById("essen").value = essen;
    document.getElementById("ordner").checked = ordner;
    document.getElementById("fahrer").checked = fahrer;
    document.getElementById("tshirt").value = tshirt;
    document.getElementById("pulli").value = pulli;

  })

  // Load team data
  firebase.database().ref('users/' + uid + '/teams').once('value').then(function (snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var teamName = childSnapshot.val();
      document.getElementById(teamName).checked = true;
    });
  })  

  // Load Pre-Week Start Times
  firebase.database().ref('users/' + uid + '/aufbau').once('value').then(function (snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var dayKey = childSnapshot.key;
      var dayValue = childSnapshot.val();
      document.getElementById(dayKey).value = dayValue;
    });
  })
  // Load Festival-Weekend Start Times
  firebase.database().ref('users/' + uid + '/fest').once('value').then(function (snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var dayKey = childSnapshot.key;
      var dayValue = childSnapshot.val();
      document.getElementById(dayKey).value = dayValue;
    });
  })

  // Load Post-Week Start Times
  firebase.database().ref('users/' + uid + '/abbau').once('value').then(function (snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var dayKey = childSnapshot.key;
      var dayValue = childSnapshot.val();
      document.getElementById(dayKey).value = dayValue;
    });
  })

    console.log("User data retrieved");  
}


function updateUserData() {
  var fb = firebase.database().ref('users/' + userID);
  
  var email = uEmail;
  var vorname = document.getElementById("vorname").value;
  var nachname = document.getElementById("nachname").value;
  var spitzname = document.getElementById("spitzname").value;

  var xMalDabei = document.getElementById("xMalDabei").value;
  var behindert = document.getElementById("behindert").checked;
  var anmerkung = document.getElementById("anmerkung").value;
  var essen = document.getElementById("essen").value;
  var ordner = document.getElementById("ordner").checked;
  var fahrer = document.getElementById("fahrer").checked;
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


  // Checking the team checkboxes
  fb = firebase.database().ref('users/' + userID + '/teams');
  fb.remove();
  teamdata = getCheckedCheckboxesFor("team");
  fb.update(teamdata);


  // Checking the time boxes for Aufbau_Woche
  fb = firebase.database().ref('users/' + userID + '/aufbau');
  setNumbersByName(fb, "aufbauBegin");

  // Checking the time boxes for Festival_Wochenende
  fb = firebase.database().ref('users/' + userID + '/fest');
  setNumbersByName(fb, "festBegin");

  // Checking the time boxes for Abbau_Woche
  fb = firebase.database().ref('users/' + userID + '/abbau');
  setNumbersByName(fb, "abbauBegin");


  console.log("Data updated");
  alert("Deine Daten wurden aktualisiert");
}


function getCheckedCheckboxesFor(checkboxName) {
  var checkboxes = document.getElementsByName(checkboxName);
  var selected = [];
  for (var i=0; i<checkboxes.length; i++) {
    if (checkboxes[i].checked) {
        selected.push(checkboxes[i].id);
    }
  } 
  return selected;
}

function setNumbersByName(ref, numberBoxName) {
  var numBoxes = document.getElementsByName(numberBoxName);
  for (var i=0; i<numBoxes.length; i++) {
        // set each child (day) to the value (time) of the number box  
        if (numBoxes[i].value.length == 0) {
          numBoxes[i].value = 0;
        }
        ref.child(numBoxes[i].id).set(numBoxes[i].value);
  } 
}


// Accordion Buttons

var accordions = document.getElementsByClassName("accordion")
for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function() {
    // Get the next element ("accordion-content")
    var content = this.nextElementSibling;

    if(content.style.maxHeight) {
      // Accordion is open, we need to close it
      content.style.maxHeight = null;
    } else {
      // Accordion is closed, we need to open it
      content.style.maxHeight = content.scrollHeight + "px";
    }

  }
  
}