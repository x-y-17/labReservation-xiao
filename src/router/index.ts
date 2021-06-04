import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/Welcome.vue")
  },
  {
    path: "/index",
    component: () => import("@/views/index.vue")
  },
  {
    path: "/Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue")
  },
  {
    name: "nomatch",
    path: "/:pathMatch(.*)*",
    redirect: { name: "404" }
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
