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
    },
    {
        path: "/profile/:id",
        name: "profile",
        // component: ProfilePage
        component: () =>
            import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
        props: true
    },
    {
        path: "/profile/edit-profile",
        name: "editProfile",
        component: () =>
            import(/* webpackChunkName: "edit-profile" */ "../views/EditProfile.vue")
    },
    {
        path: "/upload",
        name: "photoUpload",
        component: () =>
            import(/* webpackChunkName: "photoUpload" */ "../views/PhotoUpload")
    },
    {
        path: "/photo-details",
        name: "photoDetails",
        component: () =>
            import(/* webpackChunkName: "photoDetails" */ "../views/PhotoDetails"),
        props: true
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
