<template>
  <el-table :data="tableData" style="width: 750px">
    <el-table-column
      prop="courseId"
      label="课程编号"
      width="120"
    ></el-table-column>
    <el-table-column prop="name" label="课程名称" width="120"></el-table-column>
    <el-table-column
      prop="studentNum"
      label="学生数量"
      width="120"
    ></el-table-column>
    <el-table-column prop="hours" label="学时数" width="120"></el-table-column>
    <el-table-column label="操作" width="120">
      <template #default="scope">
        <el-button
          @click="EditRow(scope.row.courseId)"
          type="text"
          size="large"
        >
          <span style="font-size: 17px">修改</span>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button @click="CourseReserve(scope)" type="text" size="large">
          <span style="font-size: 17px">课程实验室预约</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { State } from "@/store";
import * as types from "@/store/VuexTypes";
import { useRouter } from "vue-router";
import { toRaw } from "@vue/reactivity";
export default defineComponent({
  setup() {
    const store = useStore<State>();
    const router = useRouter();
    store.dispatch(types.GET_COURSES);
    const tableData = computed(() => {
      return store.state.courses;
    });
    console.log("tableData", store.state.courses);

    const EditRow = (i: any) => {
      console.log(i);
      router.push({
        path: "/courseManage/edit",
        query: { courseId: i },
      });
    };
    const CourseReserve = (i: any) => {
      const row = toRaw(i.row); //将Proxy代理对象转换为源对象
      router.push({
        path: "/courseManage/courseLabList",
        query: { studentNum: row.studentNum, courseId: row.courseId },
      });
    };
    return {
      EditRow,
      CourseReserve,
      tableData,
    };
  },
});
</script>
<style scoped>
.el-table {
  font-size: 17px;
}
</style>
