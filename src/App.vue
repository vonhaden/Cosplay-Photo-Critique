<template>
    <div id="app">
        <AuthNavigation :auth-user="authUser" v-if="authUser"></AuthNavigation>
        <Navigation :auth-user="authUser" v-else></Navigation>
        <main>
            <router-view :auth-user="authUser" />
        </main>
        <SiteFooter></SiteFooter>
    </div>
</template>

<script>
import Navigation from "./components/Navigation";
import AuthNavigation from "./components/AuthNavigation";
import SiteFooter from "./components/SiteFooter";
import { Auth } from "./firebase/auth";
import { User } from "./models/UserModel";
import "./validation/validation";

export default {
    name: "app",
    components: {
        Navigation,
        AuthNavigation,
        SiteFooter
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

<style lang="scss">
@import "./styles/styles.scss";
</style>
