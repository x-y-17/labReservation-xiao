import { ActionTree, createStore } from "vuex";
import * as types from "./VuexTypes";
import { Menu } from "@/role/Menu"
import axios from "@/axios"

export interface State {
  role?: number | null;
  menuList?: Menu[];
  isLogin?: boolean;
  exception: string;
}

const state: State = {
  role: null,
  exception: "123",
  menuList: [],
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
}

const myActions: ActionTree<State,State> = {
  [types.BACKEND_LOGIN]: async ({ state }: any, user: any) => {
    console.log("进入异步前");
    console.log(user);
    const resp = await axios.post("/api/login", user);
    console.log("进入异步后");
    const token: string = resp.headers.token;
    if (token && token.length > 96) {
      sessionStorage.setItem("token", token);
      state.isLogin = true;
    }
  },
}



export default createStore({
  state: state,
  mutations: myMutations,
  actions: myActions,
  modules: {},
});
