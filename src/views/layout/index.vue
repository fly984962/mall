<template>
  <div id="layout">
    <div class="header">
      <Header />
    </div>
    <div class="aside" :style="AsideSty">
      <Aside />
    </div>
    <div class="main" :style="MainSty">
      <!-- <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li> -->
      <el-card class="box-card">
        <li>12</li>
        <li>12</li>
        <li>12</li>
        <li>12</li>
        <li>12</li>
        <li>12</li>
        <li>12</li>
        <li>12</li>
      </el-card>
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
      AsideSty: {
        "height" : window.innerHeight - 60 + "px"
      },
      MainSty: {
        "height" : window.innerHeight - 60 + "px",
        "width" : window.innerWidth - 200 + "px"
      }
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
  // background: red;
  border-bottom: 1px solid #333;
  box-sizing: border-box;
}
.aside {
  width: 200px;
  // background: blue;
  // height: 100vh;
  float: left;
}
.main {
  // height: 100vh;
  // background: yellow;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  float: left;
}
</style>