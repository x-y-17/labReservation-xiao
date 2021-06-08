<template>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column
      prop="number"
      label="实验室编号"
      width="120"
    ></el-table-column>
    <el-table-column
      prop="computerNumber"
      label="机器数量"
      width="120"
    ></el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button @click="OneReserve(scope)" type="text" size="small">
          单节预约
        </el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button @click="CourseReserve(scope)" type="text" size="small">
          实验课程预约
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { computed, defineComponent,ref } from 'vue'
import {State} from '@/store'
import {useStore} from 'vuex'
import * as types from '@/store/VuexTypes'
import router from "@/router";
import { toRaw} from '@vue/reactivity' //将Proxy代理对象转换为源对象
export default defineComponent({
    setup() {
        const store =useStore<State>();
        const tableData = computed(() =>{
            return store.state.labList});
        const OneReserve = (scope : any) => {
            const row = toRaw(scope.row) //将Proxy代理对象转换为源对象
            router.push(
                {
                    path:"/labReserve/oneReserve",
                    query :{labNum:row.number}    
                })
            
        }
         const CourseReserve = (i : any) => {
            console.log(i);
            
        }
        return{

            CourseReserve,
            OneReserve,
            tableData,
        }
    },
})
</script>
