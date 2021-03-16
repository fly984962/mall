import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../views/layout/index'),
    children: [
      {
        path:'/',
        redirect:'/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index'),
      },
      {
        path: '/commodity',
        name: 'commodity',
        component: () => import('../views/commodity/index'),
        children: [
          {
            path: '/commodity/commodityList',
            name: 'commodityList',
            component: () => import('../views/commodity/commodityList/index'),
          },
          {
            path: '/commodity/commodityAdd',
            name: 'commodityAdd',
            component: () => import('../views/commodity/commodityAdd/index'),
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/order/index'),
        children: [
          {
            path: '/order/orderList',
            name: 'orderList',
            component: () => import('../views/order/orderList/index'),
          }
        ]
      },
      {
        path: '/music',
        name: 'music',
        component: () => import('../views/music/index'),
      }
    ]
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {  // 解决导航条点击两次报错
return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
