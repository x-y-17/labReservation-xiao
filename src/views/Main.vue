<template>
  <div id="mainwrap">
    <div class="header">
      <h1>我是Header</h1>
    </div>
    <siderbar class="sideb" />
    <router-view class="rv"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import siderbar from "@/views/Siderbar.vue";
export default defineComponent({
  components: { siderbar },
  setup() {
    return;
  },
});
</script>
<style scoped>
@import "../css/main.css";
</style>
