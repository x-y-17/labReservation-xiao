<template>
  <div class="wel">
    <h1 :class="{ text1: flag }">欢迎使用实验室预约管理系统!</h1>
    <button
      :class="{ login: flag, active: flag2 }"
      @click="
        flag2 = !flag2;
        toLogin();
      "
    >
      <p>Login</p>
      <div v-if="flag2" :class="{ loading: flag, active2: flag2 }">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const toLogin = () => {
      setTimeout(() => router.push("/index"), 1500);
    };
    const flag = ref(true);
    const flag2 = ref(false);
    return {
      flag,
      flag2,
      toLogin,
    };
  },
});
</script>

<style scoped>
@import "../css/index.css";
</style>
