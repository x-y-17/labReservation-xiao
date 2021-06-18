<template>
  <div class="rvwrap">
    <div class="elmenu">
      <el-menu
        :default-active="this.$route.path"
        router
        mode="horizontal"
        class="elmenuinner"
      >
        <el-menu-item
          v-for="(item, i) in teachernavList"
          :key="i"
          :index="item.name"
        >
          {{ item.navItem }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="rv2">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, ref } from "vue";
import { State } from "@/store";

export default defineComponent({
  methods: {
    handleSelect(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
  },
  setup() {
    const store = useStore<State>();
    const activeIndex = "1";
    const activeIndex2 = "2";
    const teachernavList = [
      { name: "/teacherManage/add", navItem: "添加教师" },
      { name: "/teacherManage", navItem: "修改教师" },
      { name: "/teacherManage/delete", navItem: "删除教师" },
    ];
    return {
      activeIndex,
      activeIndex2,
      teachernavList,
    };
  },
});
</script>

<style>
@import "../css/teacherManage.css";
</style>
