<template>  
  <link rel="stylesheet" href="../css/index2.css">
  <div id="wrap">
      <div class="stars" ref="stars">
        <div v-for="(item,index) in starsCount" :key="index" ref="star" class="star" >
        </div>
      </div>
      <login class="login-box" /> 
  </div>
   
</template>
<script >
import { mapState } from "vuex";
import { defineAsyncComponent, defineComponent,ref } from "vue";

const login = defineAsyncComponent(() => import("./Login.vue"));
export default defineComponent({
  components: { login },
  computed: {
    ...mapState(["isLogin","exception"]),
  },
  setup(){

    const star = ref(null)
    const starsCount = 800;
    const distance = 800;
    return{
      starsCount,distance,star
    }
  },
  mounted(){
    var _this = this;
    var starArr = document.querySelectorAll(".star")
    console.log(_this)
    console.log(starArr)
    starArr.forEach(item => {
      let speed = 0.3 + (Math.random() * 1);
      let thisDistance = _this.distance + (Math.random() * 300);
      item.style.transformOrigin = `0 0 ${thisDistance}px`;
      item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${speed},${speed})`
 
    })
  }
});
</script>
<style scoped>
   @import "../css/index2.css";
</style>
