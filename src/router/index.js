import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

// Install Vue Router
Vue.use(VueRouter);

// Routes
const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/photo/:id",
        name: "photo",
        component: () =>
            import(/* webpackChunkName: "photo" */ "../views/Photo.vue"),
        props: true
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
