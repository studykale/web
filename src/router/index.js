import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/auth/signup",
    name: "SignUp",
    component : () => import('@/views/SignUp.vue')
  },
  {
    path: "/pricing",
    name: 'Pricing',
    component : () => import('@/views/Pricing.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
