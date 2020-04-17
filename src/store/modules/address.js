import {Addressapi,Customerapi} from "../../../utiles/apiController.js"
import { post_array, post_json, post_obj_array, get, post} from '../../../http/axios.js'
export default {
  namespaced:true,
  state: {
    tableData:[],
    customerData:[],
    AddressLength:''
  },
  getters:{
   AddressTotal(state){
     return state.tableData.length
   }
  },
  mutations: {
   refreshAddress(state,addresses){
    state.tableData = addresses
   },
   refreshAddressLength(state,AddressLength){
    state.AddressLength = AddressLength
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
        let query = {
            id:'',
            page: 1,
            pageSize: 3,
        }
        await dispatch("AddressFindQuery",query)
      },
      // 顾客
      async customerFindAll({commit,dispatch}){
        let response = await get(Customerapi.CustomerFind.api)
        commit("refreshCustomer",response.data)
      },
      // ..
      async AddressFindQuery({commit,dispatch},query){
        let response = await post(Addressapi.AddressFindQuery.api,query)
        commit("refreshAddress",response.data.list)
        commit("refreshAddressLength",response.data.total)
        await dispatch("customerFindAll")
        // console.log(response.data.total)
      },
      async AddressFindById({commit,dispatch},id){
        if(id!==""){
          let response = await get(Addressapi.AddressFindById.api+id)
          commit("refreshAddress",response.data)
        }
      }
  }
}