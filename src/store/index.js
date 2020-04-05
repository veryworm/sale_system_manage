import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import waiter from './modules/waiter'
import order from './modules/order'
import customer from './modules/customer'
// import product from './modules/product'
import address from './modules/address'
import category from './modules/category'
import user from './modules/user'
// import {Categoryapi,Productapi} from "@/utiles/apiController.js"

const store = new Vuex.Store({
   state:{
	  products:[]
   },
   getters:{
	 
   },
   mutations:{
	   
   },
   actions:{
	   
   },
   modules: {
    address,
    order,
    customer,
    // product,
    category,
    waiter,
    user
  }
})

export default store
