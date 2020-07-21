import firebase from "firebase/app";
import { Auth } from "../firebase/auth";
import { DB } from "../firebase/db";
import { Account } from "../models/AccountModel";

export const UserMixin = {
    props: {
        authUser: { required: true }
    },
    data() {
        return {
            account: {}
        };
    },
    firestore() {
        return {
            account: DB.collection("accounts").doc(this.authUser.uid)
        };
    },
    computed: {
        loggedIn() {
            return this.authUser && this.authUser.uid;
        },
        isCreator() {
            if (this.authUser) {
                return this.photo.uid === this.authUser.uid;
            }
        },
        isCritiqueAuthor() {
            if (this.authUser) {
                return this.critique.uid === this.authUser.uid;
            }
        },
        isModerator() {
            if (this.authUser) {
                return this.account.role === "admin" || "moderator";
            }
        },
        isAdmin() {
            if (this.authUser) {
                return this.account.role === "admin";
            }
        }
    },
    methods: {
        login() {
            let provider = new firebase.auth.GoogleAuthProvider();
            Auth.signInWithPopup(provider)
                .then(function(result) {
                    // gives you a Google Access Token
                    let token = result.credential.accessToken;
                    console.log("Google token:", token);

                    // check is the user is logging in for the first time
                    let isNewUser = result.additionalUserInfo.isNewUser;
                    if (isNewUser) {
                        // set up the new account
                        let theAccount = new Account();
                        theAccount.uid = result.user.uid;
                        theAccount.handle = result.user.displayName;
                        theAccount.name = result.user.displayName;
                        theAccount.email = result.user.email;
                        theAccount.photoURL = result.user.photoURL;
                        theAccount.created = new Date();

                        DB.collection("accounts")
                            .doc(result.user.uid)
                            .set(theAccount)
                            .then(function() {
                                console.log("New account added");
                                this.$router.push({ name: "editaccount" });
                            })
                            .catch(function(error) {
                                console.log("Error adding details:", error);
                            });
                    }
                })
                .catch(function(error) {
                    // Handle Errors here.
                    // let errorCode = error.code;
                    // let errorMessage = error.message;

                    console.log(error);
                    // TODO: let the user know there was an error
                });
        },

        logout() {
            Auth.signOut();
        }
    }
};
