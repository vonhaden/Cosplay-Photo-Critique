<template>
    <div id="app">
        <AuthNavigation :auth-user="authUser" v-if="authUser"></AuthNavigation>
        <Navigation :auth-user="authUser" v-else></Navigation>
        <!-- <div id="nav">-->
        <!-- <router-link :to="{ name: 'home' }">Home</router-link>-->
        <!-- <router-link to="/about">About</router-link>-->
        <!-- </div>-->
        <router-view />
    </div>
</template>

<script>
import Navigation from "./components/Navigation";
import AuthNavigation from "./components/AuthNavigation";
import { Auth } from "./firebase/auth";
import { User } from "./models/UserModel";

export default {
    name: "app",
    components: {
        Navigation,
        AuthNavigation
    },
    data() {
        return {
            authUser: null
        };
    },

    created: function() {
        Auth.onAuthStateChanged(user => {
            if (user) {
                // user is signed in
                console.log("Signed in");
                this.authUser = new User(user);
            } else {
                // User is signed out.
                console.log("Not signed in.");
                this.authUser = null;
            }
        });
    }
};
</script>
