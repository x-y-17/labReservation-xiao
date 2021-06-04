import { ActionTree, createStore } from "vuex";
import * as types from "./VuexTypes";
import { Menu } from "@/role/Menu"
import axios from "@/axios"
import router from "@/router";
import { listTeacher } from "@/datasource/DataSource";
import { Teacher } from "@/datasource/Type"
export interface State {
  role?: number | null;
  menuList?: Menu[];
  teacherList?: Teacher[];
  isLogin?: boolean;
  exception: string;
}

const state: State = {
  role: null,
  exception: "Error!",
  menuList: [],
  teacherList: [],
  isLogin: false
};


const myMutations = {
  [types.SET_ROLE](state: State, data: number) {
    state.role = data;
  },
  [types.SET_MENULIST](state: State, data: Menu[]) {
    state.menuList = data;
  },
  [types.UPDATE_EXCEPTION]: (state: State, data: string) => (state.exception = data),
  [types.LIST_TEACHERS]: (state: State,data:Teacher) =>( state.teacherList?.push(data))
}

const myActions: ActionTree<State, State> = {
  [types.BACKEND_LOGIN]: async ({ commit, state }, user: any) => {
    const resp = await axios.post("/api/login", user);
    const token: string = resp.headers.token;
    if (token && token.length > 96) {
      sessionStorage.setItem("token", token);
      commit(types.SET_ROLE, 3);
      sessionStorage.setItem("role", "管理员");
      const { setUserRole } = await import("@/role/UserRole")
      const menuList = setUserRole();
      commit(types.SET_MENULIST, menuList);
      state.isLogin = true;
      router.push("/main");
    }
  },
  [types.BACKEND_TEACHERS]: async ({ commit, state }, teacher: any) => {
    const resp = await axios.post("/api/admin/teachers", teacher);
    // if(resp.status == 200){
    //   teacher.id = resp.data.data.id;
    //   state.teacherList?.push(teacher)
    // }
  },
}



export default createStore({
  state: state,
  mutations: myMutations,
  actions: myActions,
  modules: {},
});
