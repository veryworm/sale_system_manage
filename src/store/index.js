import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import user from './modules/user'
import order from './modules/order'
import customer from './modules/customer'
import product from './modules/product'
import address from './modules/address'
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
    product,
  }
})

export default store
