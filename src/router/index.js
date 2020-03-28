import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/address',
  //   name: 'address',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/address/address.vue')，
    
  // }
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
