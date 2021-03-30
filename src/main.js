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
import { StripePlugin } from "@vue-stripe/vue-stripe"
import CrispChat from  "@dansmaculotte/vue-crisp-chat";
Vue.use(VueChatScroll)


Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueMoment);
Vue.use(VueCookies);
Vue.use(
  CrispChat,
  {
    websiteId: process.env.VUE_APP_CRISP_WEBID,
    disabled: true,
    hideOnLoad: false
  }
)
Vue.use(StripePlugin, {
  pk: process.env.VUE_APP_PK,
  stripeAccount: process.env.VUE_APP_STRIPE_ACCOUNT,
  locale: process.env.VUE_APP_STRIPE_LOCALE,
  apiVersion: process.env.VUE_APP_STRIPE_API_VERSION
})




auth.onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
  }).$mount("#app");
})

