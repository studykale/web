import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ComponentNotFound from "@/views/404.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => 
      import("../views/Contact.vue")
  },
  {
    path: "/login",
    name: "LogIn",
    component: () => 
      import("../views/LogIn.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => 
      import("../views/SignUp.vue")
  },
  {
    path: "/password-request",
    name: "PasswordRequest",
    component: () => 
      import("../views/PwdChange.vue")
  },
  {
    path: '*',
    name: 'ComponentNotFound',
    component: ComponentNotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
