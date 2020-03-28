import {Addressapi,Customerapi} from "../../../utiles/apiController.js"
import { post_array, post_json, post_obj_array, get, post} from '../../../http/axios.js'
export default {
  namespaced:true,
  state: {
    tableData:[],
    customerData:[]
  },
  getters:{
   
  },
  mutations: {
   refreshAddress(state,addresses){
    state.tableData = addresses
   },
   refreshCustomer(state,customerData){
    state.customerData = customerData
   }
  },
  actions: {
      async addressFindAll({commit,dispatch}){
        let response = await get(Addressapi.AddressFindAll.api)
        commit('refreshAddress',response.data)
        await dispatch("customerFindAll")
      },
      async addressEdit({commit,dispatch},addressData){
        let response = await post_array(Addressapi.AddressSave.api,addressData)
        commit('refreshAddress',response.data)
        await dispatch("addressFindAll")
      },
      async customerFindAll({commit,dispatch}){
        let response = await get(Customerapi.CustomerFind.api)
        commit("refreshCustomer",response.data)
      },
      async AddressFindById({commit,dispatch},id){
        let response = await get(Addressapi.AddressFindById.api+id)
        commit("refreshAddress",response.data)
      }
  }
}