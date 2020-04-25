export const UserMixin = {
    props: {
        authUser: { required: true }
    },

    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid);
        },
        isCreator() {
            if (this.authUser) {
                return this.photo.uid === this.authUser.uid;
            }
        }
    },

    methods: {
        login(){
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth()
                .signInWithPopup(provider)
                .then(function(result){
                    // gives you a Google Access Token
                    let token = result.credential.accessToken;

                    // check is the user is logging in for the first time
                    var isNewUser = result.additionalUserInfo.isNewUser;
                    if (isNewUser) {
                        // set up the new account
                        var theAccount = new Account();
                        theAccount.uid = result.user.uid;
                        theAccount.handle = result.user.displayName;
                        theAccount.name = result.user.displayName;
                        theAccount.email = result.user.email;
                        theAccount.photoURL = result.user.photoURL;
                        theAccount.created = new Date();

                        db.collection('accounts').doc(result.user.uid)
                            .set(theAccount)
                            .then(function () {
                                console.log('New account added');
                                router.push({ name: 'editaccount' });
                            })
                            .catch(function (error) {
                                console.log('Error adding details:', error);
                            });
                    }
                })
                .catch(function(error) {
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;

                    console.log(error);
                    // TODO: let the user know there was an error
                });
        },

        logout(){
            firebase.auth().signOut();
        },
    },
}