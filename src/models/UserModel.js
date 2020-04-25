export var User = function(firebaseUser){
    let userdetails = {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
    };

    if (firebaseUser){
        userdetails.displayName = firebaseUser.displayName ? firebaseUser.displayName : "";
        userdetails.email = firebaseUser.email ? firebaseUser.email : "";
        userdetails.photoURL = firebaseUser.photoURL ? firebaseUser.photoURL : "";
        userdetails.uid = firebaseUser.uid ? firebaseUser.uid : "";
    }

    return userdetails;
};
