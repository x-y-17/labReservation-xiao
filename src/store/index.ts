import { ActionTree, createStore } from "vuex";
import * as types from "./VuexTypes";
import { Menu } from "@/role/Menu"
import axios from "@/axios"
import router from "@/router";
import { listLab } from "@/datasource/DataSource";
import { Teacher,Course } from "@/datasource/Type";
import { Lab } from "@/datasource/Type";
import { ResultVO } from "@/mock";
export interface State {
  role?: number | null;
  menuList?: Menu[];
  teacherList?: Teacher[];
  isLogin?: boolean;
  labList?: Lab[];
  exception: string;
  courses?: Course[];
}

const state: State = {
  role: null,
  exception: "Error!",
  menuList: [],
  teacherList: [],
  isLogin: false,
  labList: [],
  courses: [],
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
  [types.GET_LABLIST]: (state: State, data: Lab[]) => (state.labList = data),
  [types.GET_TEACHERS]: (state:State,data: Teacher[]) =>(state.teacherList = data),
  [types.ADD_LAB]:(state:State,data:Lab) =>(state.labList?.push(data)),
  [types.GET_COURSES]:(state:State,data:Course[])=>(state.courses = data),
  [types.ADD_COURSE]:(state:State,data:Course)=>(state.courses?.push(data)),
  // [types.UPDATE_TEACHER]:(state:State,data:Teacher) => ()
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
        sessionStorage.setItem("teacherNum",resp.data.data.teacherNum);
        const { setUserRole } = await import("@/role/TeacherRole");
        const menuList = setUserRole();
        commit(types.SET_MENULIST, menuList);
        state.isLogin = true;
        router.push("/main");
      }
    }
  },
  [types.DELETE_TEACHER]: async ({ state }, number: any) => {
    const resp = await axios.post("deleteTeachers", number);
    if(resp.status == 200){
      alert("删除成功")
    }
  },
  [types.ADD_TEACHERS]: async ({ commit, state }, teacher: any) => {
    const resp = await axios.post("addTeachers", teacher);
    console.log("ADD",resp.data.data);
    commit(types.LIST_TEACHERS,resp.data.data)
    // if(resp.status == 200){
    //   teacher.id = resp.data.data.id;
    //   state.teacherList?.push(teacher)
    // }
  },//添加教师信息
  [types.GET_LABLIST]: async ({ commit }) => {
    // const resp = await axios.get("api/lablist");
    const resp = await axios.get("lablist");
    console.log("lablist",resp.data.data.labs);
    commit(types.GET_LABLIST, resp.data.data.labs); 
  },
  [types.SUBMIT_LABLIST]: async ({state},labList: any)=>{
    const resp = await axios.post<ResultVO>("submitLablist",labList);
    if(resp.status ==200){
      alert("预约成功")
    }
  },
  [types.GET_TEACHERS]: async ({commit,state},teacherList: any)=>{
    const resp = await axios.get<ResultVO>("getTeachers");
    console.log(resp.data.data.teachers);
    commit(types.GET_TEACHERS,resp.data.data.teachers);
  },
  [types.UPDATE_TEACHER]: async ({commit,state},teacherUpdate:any)=>{
    const resp = await axios.post<ResultVO>("updateTeachers",teacherUpdate);
    if(resp.status == 200){
      alert("修改成功")
    }
    console.log("update_teacher",resp.data.data);
  },//修改教师信息（姓名，职称)
  [types.UPDATE_TEACHER_PASSWORD]: async ({commit},password:string)=>{
    const resp = await axios.post<ResultVO>("updateTeacherPassword",password);
    console.log("update_teacher_password",resp.data.data);
  },
  [types.ADD_LAB]: async({commit,state},lab:any)=>{
    const resp = await axios.post<ResultVO>("addLabs",lab);
    console.log("add_lab",resp.data.data);
  },
  [types.UPDATE_LAB]: async({state},lab:any)=>{
    const resp = await axios.post<ResultVO>("updateLabs",lab);
    console.log("updateLabs",resp.data.data);
  },
  [types.DELETE_LAB]: async ({state},number:any)=>{
    const resp = await axios.post("deleteLabs", number);
    if(resp.status == 200){
      alert("删除成功")
    }
  },
  [types.GET_COURSES]:async ({commit},courses: Course[])=>{
    const resp = await axios.get('/getCourses');
    const courseList : Course[] = [];
    const teacherNum = sessionStorage.getItem('teacherNum');//获取sessionStorage中的教师编号
    console.log("/getCourses",resp.data.data.courses);
    resp.data.data.courses.forEach( (c:any) => {     
      if(c.teacherNum == teacherNum){
        courseList.push(c)
      }
    });
    console.log(courseList);
    courses = courseList;
    console.log("courses:",courses);
    
    commit(types.GET_COURSES,courses);
  },
  [types.ADD_COURSE]: async({commit},course:Course)=>{
    const resp = await axios.post<ResultVO>("addCourses",course);
    if(resp.status == 200){
      alert("添加成功")
    }
    console.log("add_course",resp.data.data);
  },
  [types.DELETE_COURSE]: async({state},number:any)=>{
    const resp = await axios.post("deleteCourses",number)
    if(resp.status == 200){
      alert("删除成功")
    }
  },
  [types.UPDATE_COURSE]: async({state},course:Course)=>{
    const resp = await axios.post<ResultVO>("updateCourses",course);
    console.log("updateCourses",resp.data.data);
  }
}



export default createStore({
  state: state,
  mutations: myMutations,
  actions: myActions,
  modules: {},
});
