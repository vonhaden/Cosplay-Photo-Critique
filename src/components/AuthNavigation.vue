<template>
    <b-navbar
        toggleable="lg"
        type="dark"
        variant="dark"
        :sticky=true
    >
        <b-navbar-brand>
            <router-link to="/">
                <img src="../assets/costog-logo-white.svg" alt="Costog logo." height="30px">
            </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <!-- Auth Nav -->
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{ name: 'photoUpload' }">Submit Photo</b-nav-item>
                <b-nav-item-dropdown :text="account.handle" right>
                    <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'profile', params: { id: authUser.uid }}">Profile</b-dropdown-item>
                </b-nav-item-dropdown>
                <div>
                    <b-img :src="account.photoURL" class="avatar"></b-img>
                </div>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { DB } from "../firebase/db";

export default {
    name: "AuthNavigation",
    mixins: [UserMixin],
    data() {
        return {
            account: {}
        };
    },
    firestore() {
        return {
            account: DB.collection("accounts").doc(this.authUser.uid)
        };
    }
};
</script>

<style scoped lang="scss">
.avatar {
    height: 45px;
    padding: 5px;
    border-radius: 50%;
}
</style>
