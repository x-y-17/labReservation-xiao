<template>
  <div>
    <template v-for="(menu1, m1index) in menuList" :key="`m1-${m1index}`">
      <h3>{{ menu1.title }}</h3>
      <template v-if="menu1?.children.length > 0">
        <ul>
          <li v-for="(menu2, m2index) in menu1.children" :key="`m2-${m2index}`">
            <router-link :to="menu2?.path">{{ menu2.title }}</router-link>
          </li>
        </ul>
      </template>
    </template>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { State } from "@/store";

export default defineComponent({
  methods: {
      handleOpen(key:any, keyPath:any) {
        console.log(key, keyPath);
      },
      handleClose(key:any, keyPath:any) {
        console.log(key, keyPath);
      }
    },
  setup() {
    // const store = useStore<State>();
    // const menuList = store.state.menuList;
    const state: State = useStore().state;
    const menuList = state.menuList;
    return {
      menuList
    };
  },
});
</script>
<style scoped>
  @import "../css/sidebar.css";
</style>

