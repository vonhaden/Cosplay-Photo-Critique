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
export default {
    name: "app",
    components: {
        Navigation
    }
};
</script>