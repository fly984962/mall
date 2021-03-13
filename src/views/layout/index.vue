<template>
  <div id="layout">
    <div class="header">
      <Header />
    </div>
    <div class="aside">
      <Aside />
    </div>
    <div class="main">
      <div class="main_top">页签</div>
        <transition
          enter-active-class = 'animated fadeInRightBig'
        >
          <router-view></router-view>
        </transition>
    </div>
    <!-- <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-container>
        <el-aside class="aside" :style="AsideSty">
          <Aside />
        </el-aside>
        <el-main class="main" :style="MainSty">Main</el-main>
      </el-container>
    </el-container> -->
  </div>
</template>

<script>
import Aside from './components/aside'
import Header from './components/header'
export default {
  components: {
    Aside,
    Header
  },
  data() {
    return {
      
    }
  },
  mounted() {
    console.log(window.innerHeight)
  }
}
</script>

<style lang="less" scoped>
.header{
  width: 100%;
  height: 60px;
  // background: saddlebrown;
  border-bottom: 1px solid #333;
  box-sizing: border-box;
}
.aside {
  // background-color: #cc85d9;
  width: 200px;
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 0px;
}
.main {
  // height: 100vh;
  width: calc(100vw - 200px);
  // height: 100%;
  background: rgb(243, 241, 241);
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  float: left;
  position: absolute;
  top: 90px;
  bottom: 0px;
  left: 200px;
}
.main_top {
  position: fixed;
  width: calc(100vw - 200px);
  height: 30px;
  // background: red;
  border-bottom: 1px solid #333;
  top: 60px;
  left: 200px;
}
</style>