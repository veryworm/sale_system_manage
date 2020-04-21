import {Productapi} from "../../../utiles/apiController.js"
import { post_array, post_json, post_obj_array, get, post} from '../../../http/axios.js'

export default {
  namespaced:true,
  state: {
    products:[]
  },
  getters:{
    productFilter(state){
       return state.products.filter(item=>item.status === '100')
    }
  },
  mutations: {
    refreshProducts(state,products){
      state.products = products;
    }
  },
  actions: {
    async ProductFindAll({commit,dispatch}){
      let response = await get(Productapi.ProductFindAll.api)
      commit('refreshProducts',response.data)
    },
    async ProductEdit({commit,dispatch},ProductData){
      let response = await post_array(Productapi.ProductEdit.api,ProductData)
      await dispatch("ProductFindAll")
    },
    async deleteIdHandler({commit,dispatch},id){
      let response = await get(Productapi.ProductDeleteById.api+id)
      await dispatch('ProductFindAll')
    }
  }
}