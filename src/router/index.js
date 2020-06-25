import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard/DashHome.vue";
import Settings from "../views/Dashboard/Views/Settings";
import Profile from "../views/Dashboard/Views/Profile";
import Meta from 'vue-meta'
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
});




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
        component: () => import('@/views/Admin/Dashboard/try/Chat.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Dashboard/Views/Settings.vue')
      },
      {
        path: 'notifications',
        name: 'AdminSettings',
        component: () => import('@/views/Dashboard/Views/Notifications')
      },
      {
        path: 'payments',
        name: "AdminUsersPayments",
        component: () => import('@/views/Admin/Dashboard/try/Payments.vue')
      },
      {
        path: 'profile',
        name: 'AdminProfile',
        component: () => import('@/views/Dashboard/Views/Profile.vue')
      },
      {
        path: '*',
        redirect: '/admin/projects'
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project-pay/:projectId/:type',
    name: 'ProjectPay',
    component: () => import('@/views/PaymentResponse.vue'),
    meta: {
      requiresAuth: true
    }
  },
  
  {
    path: '/auth/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/Admin/Login'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/pay/:payAmount/:pid',
    name: 'CompletePay',
    component: () => import('@/views/RequestPayment'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      requiresAuth: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    //https://router.vuejs.org/guide/advanced/scroll-behavior.html
    if (to.hash) {
            return { selector: to.hash }
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 }
        }
  }
});


router.beforeEach((to, from, next) => {
  let isLoggedIn = window.$cookies.isKey('loggedIn')
  //("loggedIn", isLoggedIn)
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // //("currentUser", currentUser)
  if (requiresAuth && !isLoggedIn) {  
    next('/auth/signin')
  }
  else if (!requiresAuth && isLoggedIn) next('/dashboard/projects')
  else next()
})
export default router;
