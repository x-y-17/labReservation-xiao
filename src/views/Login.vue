<template>
  <div id="wrap">
    <h1>欢迎使用登录</h1>
    <label>
      number:
      <input type="text" v-model="user.number" />
      <br>
      password:
      <input type="password" v-model="user.password">
      <br />
      {{user.password}}
      <br>
      <button @click="login">submit</button>
    </label>
  </div>
</template>
<script lang="ts">
// import { useStore } from 'node_modules/vuex/types'; 必须是vuex
import { useStore } from "vuex";
import { defineComponent, ref, watch } from "vue";
import { BACKEND_LOGIN } from "@/store/VuexTypes";
import { State } from "@/store";
import { useRouter} from "vue-router"
export default defineComponent({
  setup() {
    const user = ref({number:"",password:""});
    const router = useRouter();
    const store = useStore<State>();
    const flag = ref(store.state.isLogin);
    console.log(flag.value);
    const login = () => {
      console.log("点击发生");
      store.dispatch(BACKEND_LOGIN, user.value);
      console.log(flag.value);
    };
    // watch(flag,(newValue,oldValue)=>{
    //   console.log(flag.value);
    //   if(newValue){
    //     console.log("发生跳转前")
    //     router.push("/main");
    //   }
    // })
    return {
      user,
      login
    };
  },
});
</script>

<style scoped>
#wrap {
  height: 100%;
}
label {
  display: block;
  margin: 200px auto;
}
</style>