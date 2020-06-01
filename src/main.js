import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies"
import VueMoment from "vue-moment"
import "./plugins/buefy";
import { firestorePlugin } from 'vuefire';
import { auth } from "./db";


Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueMoment);
Vue.use(VueCookies);

auth.onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
})

