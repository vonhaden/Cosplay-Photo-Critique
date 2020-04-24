<template>
    <div>
        <b-navbar
            toggleable="lg"
            type="dark"
            variant="dark"
            class="mb-2 mb-lg-4"
            fixed="top"
        >
            <b-navbar-brand>
                <router-link to="/home">
                    <img src="images/fs-logo-white.png" alt="Logo." height="30px">
                </router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <!--<b-nav-item href="#" @click.prevent="login">Login</b-nav-item>-->
                    <b-nav-item href="#">Login</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>