$(document).ready(function() {
  $('.modal').modal();
  $('#register').on('click', function() {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  });
  $('#login').on('click', function() {
    var email2 = $('#email2').val();
    var password2 = $('#password2').val();
    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
  });
  $('#login').on('click', function() {
    firebase.auth().getRedirectResult(perfil());
  });
  function watcher() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        appears();
        console.log('existe usuario activo');
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        alert('usuario no registrado');
      }
    });
  }
  watcher();
  function appears() {
    var content = $('.content');
    content.html('<p>Bienvenido<p/><button id="logout">Cerrar Sesión</button>');
    $('#logout').on('click', function() {
      firebase.auth().signOut()
        .then(function() {
          $(location).attr('href', 'signup.html');
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  function perfil() {
    $(location).attr('href', 'view-3.html');
  }
});