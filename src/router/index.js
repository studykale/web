import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import firebase from 'firebase';
// import { currentUser } from "../db"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/auth/signup",
    name: "SignUp",
    component : () => import('@/views/SignUp.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/auth/signin",
    name: "SignIn",
    component : () => import('@/views/Signin.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/auth/password-change-req",
    name: "PassChangeReq",
    component: () => import('@/views/PassReq'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/reviews",
    name: 'Reviews',
    component : () => import('@/views/Reviews.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: () => import('@/views/About.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/blog",
    name: 'Blog',
    component : () => import('@/views/Blog.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/how-it-works",
    name: 'Process',
    component: () => import('@/views/Process.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/dashboard/:username",
    component: () => import('@/views/Dashboard/Main.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "profile",
        name: 'Profile',
        component: () => import('@/views/Dashboard/Views/Profile.vue')
      },
      {
          path: "notifications",
          name: 'Notifications',
          component: () => import('@/views/Dashboard/Views/Notifications.vue')
      },
      {
        path: "Chats",
        name: 'Chats',
        component: () => import('@/views/Dashboard/Views/Chats.vue')
      },
      {
        path: "Drafts",
        component: () => import('@/views/Dashboard/Views/Drafts.vue')
      },
      {
        path: "Projects",
        name: "Projects",
        component: () => import('@/views/Dashboard/Views/Projects.vue')
      },
      {
        path: "",
        name: 'Drafts',
        component: () => import('@/views/Dashboard/Views/Drafts.vue')
      }
    ]
  },
  {
    path: "*",
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/Admin/Login')
  }
];

const router = new VueRouter({
 mode: 'history',
  routes
});


// router.beforeEach((to, from, next) => {
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
//   if (requiresAuth && !currentUser)  next({
//       path: '/auth/signin',
//       query: { redirect: to.fullPath }
//     }) 
//   else if (!requiresAuth && currentUser) next({ name: "Home" })
//   else next()
// })

export default router;
