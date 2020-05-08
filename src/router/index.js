import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Photo from "../views/Photo";

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
        component: Photo,
        props: true
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
