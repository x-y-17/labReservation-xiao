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
    <el-form-item label="提交修改">
      <el-button type="danger" @click="update" round>Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, ref } from "vue";
import { State } from "@/store";
import * as types from "@/store/VuexTypes";
import { Lab } from "@/datasource/Type";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  methods: {
    handleSelect(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
  },
  setup() {
    const store = useStore<State>();
    const courses = computed(() => {
      return store.state.courses;
    });
    const course = ref({
      cid: "",
      name: "",
      studentNumber: "",
      hours: "",
      teacherId: "",
    });
    const tid = sessionStorage.getItem("teacherNum");
    const route = useRoute();
    const router = useRouter();
    const password = ref("");
    const courseId = route.query.courseId;
    courses.value?.forEach((c) => {
      if (c.courseId == courseId) {
        course.value.cid = c.courseId;
        course.value.name = c.name;
        course.value.studentNumber = c.studentNum;
        course.value.hours = c.hours;
        if (tid) {
          course.value.teacherId = tid;
        }
      }
    });
    const update = () => {
      store.dispatch(types.UPDATE_COURSE, course.value);
    };
    const back = () => {
      router.push("/courseManage");
    };
    return {
      back,
      update,
      course,
      password,
    };
  },
});
</script>
<style>
.el-input__inner {
  width: 300px;
}
</style>
