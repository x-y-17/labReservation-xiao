<template>
      <el-table
    :data="tableData"
    style="width: 100%"
    max-height="250">
  
    <el-table-column
      prop="name"
      label="教师姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="number"
      label="教师编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="title"
      label="教师职称"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template #default="scope">
        <el-button
          @click="EditRow(scope.row.number)"
          type="text"
          size="small">
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent } from 'vue'
import {State} from '@/store'
export default defineComponent({
    setup() {
        const store =useStore<State>();
        const tableData = store.state.teacherList;
        console.log(store.state.teacherList);
        const EditRow = (i : any) => {
            console.log(i);
            
        }
        return{
            EditRow,
            tableData,
        }
    },
})
</script>
