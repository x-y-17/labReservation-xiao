<template>
  <el-form class="labOne">
    <el-form-item label="选择周数:">
      <el-select v-model="week" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.week"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择星期:">
      <el-select v-model="day" filterable placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.day"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择节数:">
      <el-select v-model="section" filterable placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.section"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="预约状态:">
      <el-tag type="danger" v-if="state">可预约</el-tag>
      <el-tag type="info" v-else>不可预约</el-tag>
    </el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="Query()">
      查询预约状态
    </el-button>

    <el-button type="success" plain @click="ApplyOrder()">点击预约</el-button>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { State } from "@/store";
import { useRoute } from "vue-router"; //必须引入useRoute才能使用route
import { ElMessage } from "element-plus";
import { toRaw } from "@vue/reactivity";
import { SUBMIT_LABLIST } from "@/store/VuexTypes";
export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore<State>();
    const labNum = route.query.labNum; //传递过来的实验室编号
    const week = ref();
    const day = ref();
    const section = ref();
    const time = { week: "", day: "", section: "" };
    const options = [];
    const options2 = [];
    const options3 = [];
    const state = ref(true);
    const value1 = ref(false);
    const queryState = function () {
      console.log("query", toRaw(store.state.labList));
      toRaw(store.state.labList!).forEach((lab) => {
        if (labNum == lab.number) {
          lab.schedule.forEach((s: any) => {
            if (
              s.week == time.week &&
              s.day == time.day &&
              s.section == time.section
            ) {
              console.log("queryState", store.state.labList);
              console.log(s.state);
              console.log(typeof s.state);
              state.value = s.state;
            }
          });
        }
      });
    };
    const Query = () => {
      if (week.value && day.value && section.value) {
        time.week = week.value;
        time.day = day.value;
        time.section = section.value;
        queryState();
      } else {
        alert("请选择具体时间！例：第几周，星期几，第几节");
      }
    };
    const ApplyOrder = () => {
      if (week.value && day.value && section.value) {
        store.state.labList!.forEach((lab) => {
          if (labNum == lab.number) {
            lab.schedule.forEach((s: any) => {
              toRaw(s).teacherId = sessionStorage.getItem("teacherNum");
              if (
                s.week == time.week &&
                s.day == time.day &&
                s.section == time.section
              ) {
                console.log("wds", s.week, s.day, s.section);

                state.value = false;
                toRaw(s).state = 0;
                toRaw(s).name = "临时预约";
                toRaw(s).labId = labNum;
                ElMessage.success({
                  message: "预约成功！",
                  type: "success",
                });
                // alert("预约成功")
              }
            });
          }
        });
        console.log("提交预约申请后", store.state.labList);
        store.state.labList?.forEach((lab) => {
          if (lab.number == labNum) {
            const tmplab = toRaw(lab);
            console.log("lab", toRaw(lab));
            store.dispatch(SUBMIT_LABLIST, tmplab);
          }
        });
      } else {
        alert("请选择具体时间！例：第几周，星期几，第几节");
      }
    };
    for (let i = 1; i < 19; i++) {
      const option = { week: "", label: "" };
      option.week = String(i);
      option.label = `第${i}周`;
      options.push(option);
    } //周数
    for (let i = 1; i < 8; i++) {
      const option = { day: "", label: "" };
      option.day = String(i);
      option.label = `星期${i}`;
      options2.push(option);
    } //星期
    for (let i = 1; i < 6; i++) {
      const option = { section: "", label: "" };
      option.section = String(i);
      option.label = `第${i}节`;
      options3.push(option);
    } //节数
    return {
      ApplyOrder,
      Query,
      value1,
      state,
      week,
      section,
      day,
      options2,
      options3,
      options,
    };
  },
});
</script>
<style scoped>
.labOne {
  margin-top: 15px;
  margin-left: 10px;
}
</style>
