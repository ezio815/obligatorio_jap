const signOut = () => {
    var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log('User signed out.');
      });
  }
  
  const onLoad = () => {
    gapi.load('auth2', () => {
      gapi.auth2.init();
    });
  }