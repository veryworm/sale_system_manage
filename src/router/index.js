import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Manager from '../App.vue'
import { setToken, getToken, removeToken } from '../../utiles/auth.js'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/address',
  //   name: 'address',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/address/address.vue')，
    
  // }
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/manager',
    component:Manager,
    beforeEnter: (to,from,next) => {
      let token = getToken();
      if(token){
        store.dispatch('user/info',token)
        .then(()=>{
          // 获取到用户后再跳转
          next();
        })
      }else{
          Toast("token失效")
          this.$message({
            message:"Token失效，请重新登录"
          })
          // 跳转到登录
          next({path:'/login'})
      }
    }
  },
  {
    path:'/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/address',
    name: 'address',
    component:  () => import('../views/address/address.vue')
  },
  {
    path: '/category',
    name: 'category',
    component:  () => import('../views/category/category.vue')
  },
  {
    path: '/product',
    component:  () => import('../views/product/product.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component:  () => import('../views/customer/customer.vue')
  },
  {
    path: '/order',
    name: 'order',
    component:  () => import('../views/order/order.vue')
  },
  {
    path: '/waiter',
    name: 'waiter',
    component:  () => import('../views/waiter/waiter.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
