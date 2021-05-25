<template>
  index
  <br>
  {{exception}}
  <hr />
  <main1 v-if="isLogin" />
  <login v-else />
 
</template>
<script lang="ts">
import { mapState } from "vuex";
import { defineAsyncComponent, defineComponent } from "vue";

const login = defineAsyncComponent(() => import("./Login.vue"));
const main1 = defineAsyncComponent(() => import("./Main.vue"));
export default defineComponent({
  components: { login, main1 },
  computed: {
    ...mapState(["isLogin","exception"]),
  },
});
</script>
<style scoped>
</style>
