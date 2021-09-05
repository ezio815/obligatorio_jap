const signOut = () => {
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      //console.log('User signed out.');
    });
}

const onLoad = () => {
  gapi.load('auth2', () => {
    gapi.auth2.init();
  });
}

const onSignIn = (googleUser) => {
  var profile = googleUser.getBasicProfile();
  /*
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  */
}