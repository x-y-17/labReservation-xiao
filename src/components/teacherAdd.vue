<template>
  <el-form :label-position="labelPosition" label-width="80px" :model="teacher">
    <el-form-item label="教师姓名">
      <el-input v-model="teacher.name"></el-input>
    </el-form-item>
    <el-form-item label="教师编号">
      <el-input v-model="teacher.number"></el-input>
    </el-form-item>
    <el-form-item label="教师职称">
      <el-input v-model="teacher.title"></el-input>
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
import { Teacher } from "@/datasource/Type";
export default defineComponent({
  methods: {
    handleSelect(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
  },
  setup() {
    const store = useStore<State>();
    const teacher = ref({
      name: "",
      number: "",
      title: "",
    });
    let flag = true;
    const teaList = store.state.teacherList;
    console.log(teaList);

    const submit = () => {
      teaList?.forEach((t) => {
        if (teacher.value.number == t.number) {
          flag = false;
          alert("教师编号重复，请重新输入");
        }
      });
      if (
        flag == true &&
        typeof teacher.value.name == "string" &&
        typeof teacher.value.number == "string" &&
        typeof teacher.value.title == "string"
      ) {
        store.commit(types.LIST_TEACHERS, {
          name: teacher.value.name,
          number: teacher.value.number,
          title: teacher.value.title,
        } as Teacher);
        console.log("commit", teaList);
      }
      store.dispatch(types.ADD_TEACHERS, teacher.value);
    };
    return {
      teacher,
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
