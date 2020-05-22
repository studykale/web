import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from 'firebase';

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
    path: "/auth/signin",
    name: "SignIn",
    component : () => import('@/views/Signin.vue')
  },
  {
    path: "/auth/password-change-req",
    name: "PassChangeReq",
    component: () => import('@/views/PassReq')
  },
  {
    path: "/reviews",
    name: 'Reviews',
    component : () => import('@/views/Reviews.vue')
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: () => import('@/views/About.vue')
  },
  {
    path: "/blog",
    name: 'Blog',
    component : () => import('@/views/Blog.vue')
  },
  {
    path: "/how-it-works",
    name: 'Process',
    component: () => import('@/views/Process.vue')
  },
  {
    path: "/dashboard/:username",
    name: "Dashboard",
    component: () => import('@/views/Dashboard/Main.vue'),
    children: [
      {
        path: "profile",
        name: 'Profile',
        component: () => import('@/views/Dashboard/Views/Profile.vue')
      },
      {
          path: "notifications",
          name: 'Profile',
          component: () => import('@/views/Dashboard/Views/Notifications.vue')
      },
      {
        path: "Chats",
        name: 'Profile',
        component: () => import('@/views/Dashboard/Views/Chats.vue')
      },
      {
        path: "Drafts",
        name: "Drafts",
        component: () => import('@/views/Dashboard/Views/Drafts.vue')
      },
      {
        path: "Projects",
        name: "Projects",
        component: () => import('@/views/Dashboard/Views/Projects.vue')
      },
      {
        path: "",
        name: "Drafts",
        component: () => import('@/views/Dashboard/Views/Drafts.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});


router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth && !currentUser) next('/auth/signin')
  else if (!requiresAuth && currentUser) next('/')
  else next()
})

export default router;
