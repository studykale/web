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
    path: "/reviews",
    name: 'Reviews',
    component : () => import('@/views/Reviews.vue')
  },
  {
    path: "/blog",
    name: 'Blog',
    component : () => import('@/views/Blog.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
