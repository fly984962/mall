<template>
  <div id="app">
    <!-- <transition
          enter-active-class = 'animated slideInRight'
        > -->
      <router-view />
    <!-- </transition> -->
  </div>
</template>

<script>

export default {
  name: 'app',
  // mounted() {
  //   this.$nextTick(()=>{
  //       window.addEventListener('resize', () => { //监听浏览器窗口大小改变
  //     });
  //   })
  // }
}
</script>

<style lang="less" scoped>
#app {
  // height: 100vh;
  // background: #999;
}
</style>
