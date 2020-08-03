import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies"
import VueMoment from "vue-moment"
import "./plugins/buefy";
import { firestorePlugin } from 'vuefire';
import { auth } from "./db";
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueMoment);
Vue.use(VueCookies);




auth.onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
  }).$mount("#app");
})

