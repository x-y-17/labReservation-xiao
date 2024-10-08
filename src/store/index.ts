import { ActionTree, createStore } from "vuex";
import * as types from "./VuexTypes";
import { Menu } from "@/role/Menu"
import axios from "@/axios"
import router from "@/router";
import { listLab } from "@/datasource/DataSource";
import { Teacher, Course } from "@/datasource/Type";
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
  [types.GET_TEACHERS]: (state: State, data: Teacher[]) => (state.teacherList = data),
  [types.ADD_LAB]: (state: State, data: Lab) => (state.labList?.push(data)),
  [types.GET_COURSES]: (state: State, data: Course[]) => (state.courses = data),
  [types.ADD_COURSE]: (state: State, data: Course) => (state.courses?.push(data)),
  // [types.UPDATE_TEACHER]:(state:State,data:Teacher) => ()
}

const myActions: ActionTree<State, State> = {
  [types.BACKEND_LOGIN]: async ({ commit, state }, user: any) => {
    const resp = await axios.post<ResultVO>("/api/login", user);
    console.log(resp);
    const token: string = resp.headers.token;
    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", resp.data.data.role);
      if (resp.data.data.role == '9') {
        const { setUserRole } = await import("@/role/AdminRole")
        const menuList = setUserRole();
        commit(types.SET_MENULIST, menuList);
        state.isLogin = true;
        router.push("/main");
      }
      if (resp.data.data.role == '5') {
        sessionStorage.setItem("teacherNum", resp.data.data.tid);
        const { setUserRole } = await import("@/role/TeacherRole");
        const menuList = setUserRole();
        commit(types.SET_MENULIST, menuList);
        state.isLogin = true;
        router.push("/main");
      }
    }
  },
  [types.DELETE_TEACHER]: async ({ state }, teacher: Teacher) => {
    const resp = await axios.post("/api/admin/deleteteacher", teacher);
    if (resp.status == 200) {
      alert("删除成功")
      router.push("/teacherManage")
    }
  },//删除教师
  [types.ADD_TEACHERS]: async ({ commit, state }, teacher: any) => {
    const resp = await axios.post("/api/admin/addteachers", teacher);
    console.log("ADD", resp.data.data);
    if (resp.status == 200) {
      alert('添加成功');
    }

    // if(resp.status == 200){
    //   teacher.id = resp.data.data.id;
    //   state.teacherList?.push(teacher)
    // }
  },//添加教师信息
  [types.GET_TEACHERS]: async ({ commit, state }, teacherList: any) => {
    const resp = await axios.get<ResultVO>("/api/admin/getteachers");
    console.log(resp.data.data.teachers);
    commit(types.GET_TEACHERS, resp.data.data.teachers);
  },//获取教师列表
  [types.UPDATE_TEACHER]: async ({ commit, state }, teacherUpdate: any) => {
    const resp = await axios.post<ResultVO>("/api/admin/modifyteacher", teacherUpdate);
    if (resp.status == 200) {
      alert("修改成功")
      router.push("/teacherManage")
    }
    console.log("update_teacher", resp.data.data);
  },//修改教师信息（姓名，职称)
  [types.GET_LABLIST]: async ({ commit }) => {
    // const resp = await axios.get("api/lablist");
    const resp = await axios.get("/api/common/orderlabscourses");
    console.log("lablist", resp.data.data.labcourses);
    commit(types.GET_LABLIST, resp.data.data.labcourses);
  },//获取实验室列表
  // [types.GET_LABSCHEDULES]:async ({commit})=>{
  //   const resp = await axios.get("/api/common/orderlabscourses");
  // }
  [types.ADD_LAB]: async ({ commit, state }, lab: any) => {
    // const resp = await axios.post<ResultVO>("addLabs",lab);
    const resp = await axios.post<ResultVO>("/api/admin/addlabs", lab);
    if(resp.status==200){
      alert("添加成功")
    }
    console.log("add_lab", resp.data.data);
  },//添加实验室
  [types.SUBMIT_LABLIST]: async ({ state }, labList: any) => {
    console.log("submit_lablist");
    
    const resp = await axios.post<ResultVO>("/api/teacher/orderlab", labList);
    console.log(resp);
    
    if (resp.status == 200) {
      alert("预约成功")
    }
  },
 
  [types.UPDATE_TEACHER_PASSWORD]: async ({ commit }, password: string) => {
    const resp = await axios.post<ResultVO>("updateTeacherPassword", password);
    console.log("update_teacher_password", resp.data.data);
  },
  [types.UPDATE_LAB]: async ({ state }, lab: any) => {
    const resp = await axios.post<ResultVO>("/api/admin/updatelab", lab);
    console.log("updateLabs", resp.data.data);
  },
  [types.DELETE_LAB]: async ({ state }, number: any) => {
    const resp = await axios.post("/api/admin/deletelab", number);
    if (resp.status == 200) {
      alert("删除成功")
    }
  },
  [types.GET_COURSES]: async ({ commit }, courses: Course[]) => {
    const resp = await axios.get('/api/teacher/courses');
    const courseList: Course[] = [];
    console.log("/getCourses", resp.data.data.courses);
    resp.data.data.courses.forEach((c: any) => {
        const tmpcourse:Course = {
          name : c.name,
          courseId : c.cid,
          studentNum : c.studentNumber,
          hours : c.hours,
          teacherNum : sessionStorage.getItem('teacherNum')?.toString()
        }
        courseList.push(tmpcourse);
    });
    courses = courseList;
    console.log("courses:", courses);
    commit(types.GET_COURSES, courses);
  },
  [types.ADD_COURSE]: async ({ commit }, course: any) => {
    const resp = await axios.post<ResultVO>("/api/teacher/addcourses", course);
    if (resp.status == 200) {
      alert("添加成功")
    }
    console.log("add_course", resp.data.data);
  },
  [types.DELETE_COURSE]: async ({ state }, course : any) => {
    const resp = await axios.post("/api/teacher/deletecourses", course)
    if (resp.status == 200) {
      alert("删除成功")
    }
  },
  [types.UPDATE_COURSE]: async ({ state }, course: Course) => {
    const resp = await axios.post<ResultVO>("/api/teacher/updatecourse", course);
    console.log("updateCourses", resp.data.data);
  }
}



export default createStore({
  state: state,
  mutations: myMutations,
  actions: myActions,
  modules: {},
});
