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
                path: "/labManage",
                component: ()=> import("@/views/labManage.vue")
            },
            {
              path: "/teacherManage",
              component: ()=> import("@/views/teacherManage.vue"),
              children:[
                {
                  path: "add",
                  name: 'add',
                  component: () => import("@/components/teacherAdd.vue")
                },
                {
                  path: "",
                  name: 'edit',
                  component: () => import("@/components/teacherEdit.vue")
                },
                {
                  path: "delete",
                  name: 'delete',
                  component: () => import("@/components/teacherDelete.vue")
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

const menuList: Menu[] = [
    {
      title: "管理员管理模块",
      children: [
        {
          title: "实验室管理",
          path: "/labManage"
        },
        {
          title:"教师管理",
          path: "/teacherManage"
        }
      ]
    }
  ];


export function setUserRole() {
    router.removeRoute("nomatch");
    routes.forEach(r => router.addRoute(r));
    return menuList;
  }