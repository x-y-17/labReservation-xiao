<template>
  <div class="sbback">
    <el-menu
      router
      :uniqueOpened="true"
      class="el-menu-vertical-demo"
      @open="handleOpen()"
      @close="handleClose()"
      text-color="#000"
      active-text-color="rgb(255 0 0)"
    >
      <!---  :default-active="$route.path" 想让它随着子路由变化仍然亮-->
      <el-menu-item
        v-for="(m, mindex) in menuList.children"
        :key="mindex"
        :index="m.path"
      >
        <i class="el-icon-menu"></i>
        <template #title>{{ m.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { State } from "@/store";

export default defineComponent({
  methods: {
    handleOpen(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
    handleClose(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
  },
  setup() {
    // const store = useStore<State>();
    // const menuList = store.state.menuList;
    const state: State = useStore().state;
    const menuList = state.menuList;

    return {
      menuList,
    };
  },
});
</script>
<style scoped>
@import "../css/sidebar.css";
</style>
