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
        <el-button @click="EditRow(scope.row.number)" type="text" size="large">
          <span style="font-size: 17px">修改</span>
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
export default defineComponent({
  setup() {
    const store = useStore<State>();
    const router = useRouter();
    store.dispatch(types.GET_TEACHERS);
    const tableData = computed(() => {
      return store.state.teacherList;
    });
    const EditRow = (i: any) => {
      console.log(i);
      router.push({
        path: "/teacherManage/edit",
        query: { teacherNum: i },
      });
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
