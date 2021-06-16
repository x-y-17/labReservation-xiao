<template>
  <div class="hwrap">
    <img src="../images/header3.jpg" alt="" />
    <div class="title">
      <span class="tspan">东北林业大学</span>
    </div>
    <div class="text">
      <span>替山河装成锦绣</span>
      <span>把国土绘成丹青</span>
    </div>
    <div class="btn">
      <button @click="goLogin()">返回登录</button>
      <button>关于系统</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const goLogin = () => {
      router.push("/index");
    };
    return {
      goLogin,
    };
  },
});
</script>

<style scoped>
@import "../css/header.css";
</style>
