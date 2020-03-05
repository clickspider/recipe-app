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
  },
  {
    path: "/fav",
    name: "FavJokes",
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FavJokes.vue")
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
        name: "FavJokes"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
