<style scoped>
@import "../css/login.css";
</style>
<template>
  <div class="login-box">
    <form @keydown.enter="login()">
      <div class="user-box">
        <input type="text" v-model="user.number" />
        <label>Number</label>
      </div>
      <div class="user-box">
        <input type="password" v-model="user.password" />
        <label>Password</label>
      </div>
      <a @click="login()">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </form>
  </div>
</template>
<script lang="ts">
// import { useStore } from 'node_modules/vuex/types'; 必须是vuex
import { useStore } from "vuex";
import { defineComponent, ref, watch } from "vue";
import { BACKEND_LOGIN } from "@/store/VuexTypes";
import { State } from "@/store";

export default defineComponent({
  setup() {
    const user = ref({ number: "", password: "" });
    const store = useStore<State>();
    const login = () => {
      console.log("submit");

      store.dispatch(BACKEND_LOGIN, user.value);
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
      login,
    };
  },
});
</script>
