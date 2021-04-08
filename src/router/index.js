import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "../store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "notfound",
    redirect: "/"
  },
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
    meta: {
      requiredVisitor: true
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../components/User/Login.vue"),
    meta: {
      requiredVisitor: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "Signup" */ "../components/User/Signup.vue"),
    meta: {
      requiredVisitor: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: "home"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiredVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: "dashboard"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
