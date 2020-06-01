import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import firebase from 'firebase';
// import { currentUser } from "../db"
import Dashboard from "../views/Dashboard/DashHome.vue";
import Settings from "../views/Dashboard/Views/Settings";
import Profile from "../views/Dashboard/Views/Profile";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  
  },
  {
    path: "/auth/signup",
    name: "SignUp",
    component : () => import('@/views/SignUp.vue'),
   
  },
  {
    path: "/auth/signin",
    name: "SignIn",
    component : () => import('@/views/Signin.vue'),
  
  },
  {
    path: "/auth/password-change-req",
    name: "PassChangeReq",
    component: () => import('@/views/PassReq'),
   
  },
  {
    path: "/reviews",
    name: 'Reviews',
    component : () => import('@/views/Reviews.vue'),
   
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: () => import('@/views/About.vue'),
   
  },
  {
    path: "/blog",
    name: 'Blog',
    component : () => import('@/views/Blog.vue'),
    
  },
  {
    path: "/how-it-works",
    name: 'Process',
    component: () => import('@/views/Process.vue')
  },
  {
    path: "/dashboard",
    component: Dashboard,
    name: 'Dashboard',
    children: [
      {
          path: "notifications",
          name: 'Notifications',
          component: () => import('@/views/Dashboard/Views/Notifications.vue')
      },
      {
        path: "chats",
        name: 'Chats',
        component: () => import('@/views/Dashboard/Views/Chats.vue')
      },
      {
        path: "drafts",
        name: 'Drafts',
        component: () => import('@/views/Dashboard/Views/Drafts.vue')
      },
      {
        path: "projects",
        name: "Projects",
        component: () => import('@/views/Dashboard/Views/Projects.vue')
      },
      {
        path: 'settings',
        name: 'UserSettings',
        component: Settings
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: Profile
      },
      {
        path: '*',
        redirect: '/dashboard/projects'
      }
    ],
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/admin',
    name: 'Layout',
    component: () => import('@/views/Admin/Layout.vue'),
    children: [
      {
        path: 'projects',
        component: () => import('@/views/Admin/Dashboard/try/Project.vue')
      },
      {
        path: 'chats',
        component: () => import('@/views/Admin/Dashboard/try/Project2.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Admin/Dashboard/try/Settings.vue')
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

//   auth.onAuthStateChanged(user => {
//     if(!requiresAuth && user) {
//         next({path: `/dashboard/projects`})
//     } else if (requiresAuth && user) { 
//         next({
//           path: '/dashboard/projects'
//         })
//     }
//   })
// })



router.beforeEach((to, from, next) => {
  let isLoggedIn = Vue.$cookies.isKey('loggedIn')
  console.log("loggedIn", isLoggedIn)
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // console.log("currentUser", currentUser)
  if (requiresAuth && !isLoggedIn) {  
    next('/auth/signin')
  }
  else if (!requiresAuth && isLoggedIn) next('/dashboard/projects')
  else next()
})
export default router;
