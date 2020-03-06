import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import { store } from "../store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "notfound",
    redirect: "/login"
  },
  {
    path: "/",
    name: "home",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
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
        name: "Login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiredVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: "home"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
