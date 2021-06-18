<template>
  <div id="mainwrap">
    <div class="header">
      <header1 />
    </div>
    <siderbar class="sideb" />
    <div class="rv">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import siderbar from "@/views/Siderbar.vue";
import header1 from "@/components/header.vue";
import { useStore } from "vuex";
import * as types from "@/store/VuexTypes";
export default defineComponent({
  components: { siderbar, header1 },
  setup() {
    const store = useStore();
    store.dispatch(types.GET_LABLIST);
    if (sessionStorage.getItem("role") == "9") {
      store.dispatch(types.GET_TEACHERS);
    }
    if (sessionStorage.getItem("role") == "5") {
      store.dispatch(types.GET_COURSES);
    }
    console.log("Main", store.state.labList);

    return;
  },
});
</script>
<style scoped>
@import "../css/main.css";
</style>
