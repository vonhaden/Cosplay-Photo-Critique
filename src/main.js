// ------------------- Imports ------------------- //
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Bootstrap Vue Imports
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Firebase Import
import { firestorePlugin } from "vuefire";

// ------------------- Configuration ------------------- //
Vue.config.productionTip = false;

// ------------------- Use Statements ------------------- //
// Install BootstrapVue
Vue.use(BootstrapVue);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Install Firestore
Vue.use(firestorePlugin);

// ------------------- Vue Instance ------------------- //
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
