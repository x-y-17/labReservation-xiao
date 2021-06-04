<template>
  <div>
    <div class="line"></div>
    <!-- <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    > -->
      <el-menu :default-active="this.$route.path" router mode="horizontal">
        <el-menu-item v-for="(item, i) in teachernavList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
     </el-menu>
      <!--  <el-menu-item index="/teacherManage/add">
        <router-link to="/teacherManage/add"> 添加教师信息 </router-link>
        添加
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/teacherManage">编辑教师信息</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/teacherManage/delete">删除教师信息</router-link>
      </el-menu-item>
    </el-menu> -->
    <hr />
    <router-view />
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, ref } from "vue";
import { State } from "@/store";
import { BACKEND_TEACHERS } from "@/store/VuexTypes";
import * as types from "@/store/VuexTypes";
import { Teacher } from "@/datasource/Type";
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
