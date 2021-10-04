import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/tasks",
    name: "Tasks",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Tasks.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/components/common/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters["users/isLoggedIn"];
  console.log("login", isLoggedIn);
  if (to.name !== "Login" && !isLoggedIn) next({ name: "Login" });
  else next();
  if (to.name === "Login" && isLoggedIn) next({ name: "Tasks" });
  else next();
});

export default router;
