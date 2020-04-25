<template>
    <div id="app">
        <Navigation :auth-user="authUser"></Navigation>
        <!-- <div id="nav">-->
        <!-- <router-link :to="{ name: 'home' }">Home</router-link>-->
        <!-- <router-link to="/about">About</router-link>-->
        <!-- </div>-->
        <router-view />
    </div>
</template>

<script>
import Navigation from "./components/Navigation";
import { App } from "./firebase/app";
import { Auth } from "./firebase/auth";
import { User } from "./models/UserModel";

export default {
    name: "app",
    components: {
        Navigation
    },
    data() {
        return {
            authUser: null
        };
    },

    created: function() {
        Auth.onAuthStateChanged(function(user) {
            if (user) {
                // user is signed in
                console.log("Signed in");
                App.authUser = new User(user);
            } else {
                // User is signed out.
                console.log("Not signed in.");
                App.authUser = null;
            }
        });
    }
};
</script>
