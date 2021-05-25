<template>
   <div id="app">
     <router-view></router-view>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return
  },
})
</script>


<style>
*{
  margin: 0;
  padding: 0;
}
 html,body {
  height: 100%;
  overflow: hidden;
}
#app{
  height: 100%;
}
#app router-view{
  height: 100%;
}
</style>
