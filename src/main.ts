import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { SET_MENULIST, SET_ROLE } from "@/store/VuexTypes";
// import installElementPlus from './plugins/element'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);
const role = sessionStorage.getItem("role");
app.use(ElementPlus)
if (role) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const user = require("@/role/UserRole.ts");
    const menuList = user.setUserRole();
    store.commit(SET_ROLE, role);
    store.commit(SET_MENULIST, menuList);
    init();
}else{
    init();
}
function init() {
    app.use(store)
    app.use(router)
    app.mount("#app")
}
