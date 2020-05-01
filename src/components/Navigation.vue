<template>
    <b-navbar
        toggleable="lg"
        type="dark"
        variant="dark"
        class="mb-2 mb-lg-4"
        fixed="top"
    >
        <b-navbar-brand>
            <router-link to="/home">
                <img src="../assets/logo.png" alt="Logo." height="30px">
            </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#" @click.prevent="login">
                    Login
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";

export default {
    name: "Navigation",
    mixins: [UserMixin]
};
</script>
