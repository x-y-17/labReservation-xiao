import { RouteRecordRaw } from "vue-router";
import { Menu } from "./Menu";
import router from "@/router/index";

const routes: Array<RouteRecordRaw> = [
    {
        name: "main",
        path: "/main",
        component: () => import("@/views/main/Main.vue"),
        children: [
            {
                path: "",
                component: () => import("@/views/manage.vue")
            },
            // {
            //     path: "/p1",
            //     component: ()=> import("@/views/")
            // }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: { name: "main" }
    }
]

const menuList: Menu[] = [
    {
      title: "管理员管理模块",
      children: [
        {
          title: "管理员管理",
          path: "/p1"
        }
      ]
    }
  ];


export function setUserRole() {
    router.removeRoute("nomatch");
    routes.forEach(r => router.addRoute(r));
    return menuList;
  }