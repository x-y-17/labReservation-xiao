<template>
  <el-form :label-position="labelPosition" label-width="80px" :model="teacher">
    <el-form-item label="课程编号">
      <el-input v-model="course.cid"></el-input>
    </el-form-item>
    <br />
    <el-form-item label="课程名称">
      <el-input v-model="course.name"></el-input>
    </el-form-item>
    <el-form-item label="学生数量">
      <el-input v-model="course.studentNumber"></el-input>
    </el-form-item>
    <el-form-item label="学时数">
      <el-input v-model="course.hours"></el-input>
    </el-form-item>
    <el-form-item label="提交信息">
      <el-button type="danger" @click="submit" round>Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, ref } from "vue";
import { State } from "@/store";
import * as types from "@/store/VuexTypes";
// import { Course } from "@/datasource/Type";
export default defineComponent({
  methods: {
    handleSelect(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
  },
  setup() {
    const store = useStore<State>();
    const course = ref({
      cid: "",
      name: "",
      studentNumber: "",
      hours: "",
      teacherId: "",
    });
    const tid = sessionStorage.getItem("teacherNum");
    const submit = () => {
      let flag = true;
      if (
        flag == true &&
        course.value.name &&
        course.value.cid &&
        course.value.studentNumber &&
        course.value.hours
      ) {
        console.log("submit");
        if (tid) {
          course.value.teacherId = tid;
        }
        store.dispatch(types.ADD_COURSE, course.value); //发送新添加的lab信息
      } else {
        alert("请输入完整信息");
      }
    };
    return {
      course,
      submit,
    };
  },
});
</script>
<style>
.el-input__inner {
  width: 300px;
}
</style>
