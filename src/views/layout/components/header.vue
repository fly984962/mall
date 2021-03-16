<template>
  <div id="header">
    <div class="header_left">
      <!-- <span style="line-height:60px;">mall商城</span> -->
      <img src="../../../assets/images/12.jpg" style="width:200px;height:60px;" alt="">
    </div>
    <div class="header_right">
      <div class="header_right_left">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- <el-breadcrumb-item v-if="current">
            {{ current.superior }}
          </el-breadcrumb-item> -->
          <transition
            enter-active-class = 'animated slideOutRight'
          >
            <el-breadcrumb-item v-if="current">
              {{ current.label }}
            </el-breadcrumb-item>
          </transition>
        </el-breadcrumb>
      </div>
      <div class="header_right_right">
        <img src="../../../assets/images/1.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  }
}
</script>

<style scoped lang="less">
#header {
  width: 100vw;
    .header_left {
      width: 200px;
      height: 60px;
      float: left;
      background: green;
    }
    .header_right {
      width: calc(100vw - 200px);
      float: left;
      .header_right_left {
        float: left;
        display: flex;
        align-items: center;
        margin-left: 20px;
        height: 60px;
      }
      .header_right_right {
        width: 200px;
        height: 60px;
        float: right;
        // background: red;
        position: relative;
      }
      .header_right_right img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
}
</style>
