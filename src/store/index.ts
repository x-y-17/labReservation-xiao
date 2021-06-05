import { ActionTree, createStore } from "vuex";
import * as types from "./VuexTypes";
import { Menu } from "@/role/Menu"
import axios from "@/axios"
import router from "@/router";
import { listLab } from "@/datasource/DataSource";
import { Teacher } from "@/datasource/Type";
import { Lab } from "@/datasource/Type";
import { ResultVO } from "@/mock";
export interface State {
  role?: number | null;
  menuList?: Menu[];
  teacherList?: Teacher[];
  isLogin?: boolean;
  labList?: Lab[];
  exception: string;
}

const state: State = {
  role: null,
  exception: "Error!",
  menuList: [],
  teacherList: [],
  isLogin: false,
  labList: []
};


const myMutations = {
  [types.SET_ROLE](state: State, data: number) {
    state.role = data;
  },
  [types.SET_MENULIST](state: State, data: Menu[]) {
    state.menuList = data;
  },
  [types.UPDATE_EXCEPTION]: (state: State, data: string) => (state.exception = data),
  [types.LIST_TEACHERS]: (state: State, data: Teacher) => (state.teacherList?.push(data)),
  [types.SET_LABLIST]: (state: State, data: Lab[]) => (state.labList = data),
}

const myActions: ActionTree<State, State> = {
  [types.BACKEND_LOGIN]: async ({ commit, state }, user: any) => {
    const resp = await axios.post<ResultVO>("login", user);
    const token: string = resp.headers.token;
    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", resp.data.data.role);
      if (resp.data.data.role == 'admin') {
        const { setUserRole } = await import("@/role/AdminRole")
        const menuList = setUserRole();
        commit(types.SET_MENULIST, menuList);
        state.isLogin = true;
        router.push("/main");
      }
      if (resp.data.data.role == 'teacher') {
        const { setUserRole } = await import("@/role/TeacherRole")
        const menuList = setUserRole();
        commit(types.SET_MENULIST, menuList);
        state.isLogin = true;
        router.push("/main");
      }
    }
  },
  [types.DELETE_TEACHER]: async ({ state }, number: any) => {
    await axios.post("/api/admin/deleteTeacher", number);
  },
  [types.BACKEND_TEACHERS]: async ({ commit, state }, teacher: any) => {
    const resp = await axios.post("/api/admin/teachers", teacher);
    // if(resp.status == 200){
    //   teacher.id = resp.data.data.id;
    //   state.teacherList?.push(teacher)
    // }
  },
  [types.GET_LABLIST]: async ({ commit }) => {
    // const resp = await axios.get("api/lablist");
    const resp = await axios.get("lablist");
    commit(types.SET_LABLIST, resp.data.data.labs);
    
    
  }
}



export default createStore({
  state: state,
  mutations: myMutations,
  actions: myActions,
  modules: {},
});
