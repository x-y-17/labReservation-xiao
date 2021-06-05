import { RouteRecordRaw } from "vue-router";
import { Menu } from "./Menu";
import router from "@/router/index";
import component from "*.vue";

const routes: Array<RouteRecordRaw> = [
  {
    name: "main",
    path: "/main",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "/labReserve",
        component: () => import("@/views/labReserve.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/labList.vue"),
          },
          {
            path: "oneReserve",
            component: ()=> import("@/components/labOneReserve.vue")
          }
        ]
      },
      {
        path: "/courseManage",
        component: () => import("@/views/courseManage.vue"),
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "main" }
  }
]

const menuList: Menu[] = [
  {
    title: "教师模块",
    children: [
      {
        title: "课程实验管理",
        path: "/courseManage"
      },
      {
        title: "实验室预约",
        path: "/labReserve"
      }
    ]
  }
];


export function setUserRole() {
  router.removeRoute("nomatch");
  routes.forEach(r => router.addRoute(r));
  return menuList;
}