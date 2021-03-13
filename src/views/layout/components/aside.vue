<template>
  <div>
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item :index="index.toString()" v-for="(item, index) in noChildren" :key="item.path" @click="clickMenu(item)">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu :index="index.toString()" v-for="(item,index) in hasChildren" :key="index">
        <template slot="title">
          <i class="el-icon-video-play"></i>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
            {{ subItem.label }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  computed: {
    noChildren() { // 取出没有子级的路由
      return this.menuData.filter(item => !item.children)
    },
    hasChildren() { // 取出有子级的路由
      return this.menuData.filter(item => item.children)
    }
  },
  data() {
    return {
      menuData: [ // 路由
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'home',
        },
        {
          path: '/commodity',
          label: '商品',
          icon: 'el-icon-shopping-bag-2',
          children: [
            {
              path: '/commodityList',
              name: 'commodityList',
              label: '商品列表',
              icon: 'home',
            },
            {
              path: '/commodityAdd',
              name: 'commodityAdd',
              label: '添加商品',
              icon: 'home',
            }
          ]
        },
        {
          path: '/order',
          name: 'order',
          label: '订单',
          icon: 'el-icon-shopping-cart-1',
          children: [
            {
              path: '/orderList',
              name: 'orderList',
              label: '订单列表',
              icon: 'home',
            }
          ]
        },
        {
          path: '/',
          label: '网易云音乐',
          icon: 'home',
          children: [
            {
              path: '/music',
              name: 'music',
              label: '首页',
              icon: 'home',
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({name: item.name})
      this.$store.commit('seletMenu', item)
      console.log(item)
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less">
.el-menu-vertical-demo {
  height: calc(100vh - 60px);
}
.el-menu-item {
  padding-right: 150px;
}
.el-submenu__title {
  padding-right: 150px;
}
.el-submenu .el-menu-item {
  padding-right: 80px;
}
.el-menu-item-group__title {
  padding: 0;
}
</style>
