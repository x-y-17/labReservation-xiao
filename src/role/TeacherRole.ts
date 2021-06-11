import { RouteRecordRaw } from "vue-router";
import { Menu } from "./Menu";
import router from "@/router/index";


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
            component: () => import("@/components/labOneReserve.vue")
          },
          {
            path: "showSchedule",
            component: () => import("@/components/showSchedule.vue")
          }
        ]
      },
      {
        path: "/courseManage",
        component: () => import("@/views/courseManage.vue"),
        children: [
          {
            path: "add",
            component: () => import("@/components/courseAdd.vue")
          },
          {
            path: "",
            component: () => import("@/components/courseEdit.vue")
          }, 
          {
            path: "edit",
            component: () => import("@/components/courseEditSon.vue")
          },
          {
            path: "delete",
            component: () => import("@/components/courseDelete.vue")
          },
          {
            path: "courseLabList",
            component: () => import("@/components/courseLabList.vue")
          },
          {
            path: "courseLabReserve",
            component: () => import("@/components/courseLabReserve.vue")
          }
        ]
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "main" }
  }
]

const menuList: Menu =
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
  ;


export function setUserRole() {
  router.removeRoute("nomatch");
  routes.forEach(r => router.addRoute(r));
  return menuList;
}