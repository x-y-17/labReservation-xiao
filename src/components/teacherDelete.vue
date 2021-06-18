<template>
  <el-table :data="tableData" style="width: 480px">
    <el-table-column prop="name" label="教师姓名" width="120"></el-table-column>
    <el-table-column
      prop="number"
      label="教师编号"
      width="120"
    ></el-table-column>
    <el-table-column
      prop="title"
      label="教师职称"
      width="120"
    ></el-table-column>
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
    const tableData = store.state.teacherList;
    const EditRow = (row: any) => {
      console.log(row);
      const teacherDelete = {
        name: row.name,
        number: row.number,
        title: row.title,
      };
      store.dispatch(types.DELETE_TEACHER, teacherDelete);
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
