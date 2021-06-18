<template>
  <el-table :data="tableData" style="width: 600px">
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
        <el-button @click="EditRow(scope.row)" type="text" size="large">
          <span style="font-size: 17px">删除</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { State } from "@/store";
import * as types from "@/store/VuexTypes";
export default defineComponent({
  setup() {
    const store = useStore<State>();
    store.dispatch(types.GET_COURSES);
    const tableData = store.state.courses;
    const EditRow = (row: any) => {
      const course = {
        name: row.name,
      };

      store.dispatch(types.DELETE_COURSE, course);
    };
    return {
      EditRow,
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
