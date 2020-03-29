import {Categoryapi,Customerapi} from "../../../utiles/apiController.js"
import { post_array, post_json, post_obj_array, get, post} from '../../../http/axios.js'
export default {
  namespaced:true,
  state: {
    tableData:[],
    CategoryData:[],
    CategoryLength:''
  },
  getters:{
   CategoryTotal(state){
     return state.tableData.length
   }
  },
  mutations: {
   refreshCategory(state,Categoryes){
    state.tableData = Categoryes
   },
   refreshCategoryLength(state,CategoryLength){
    state.CategoryLength = CategoryLength
   },
   refreshCategoryData(state,CategoryData){
    state.CategoryData = CategoryData
   }
  },
  actions: {
      async CategoryFindAll({commit,dispatch}){
        let response = await get(Categoryapi.CategoryFindAll.api)
        commit('refreshCategory',response.data)
        commit('refreshCategoryData',response.data)
      },
      async CategoryEdit({commit,dispatch},CategoryData){
        let response = await post_array(Categoryapi.CategoryEdit.api,CategoryData)
        commit('refreshCategory',response.data)
        await dispatch("CategoryFindAll")
      },
      async CategoryFindQuery({commit,dispatch},query){
        let response = await post(Categoryapi.CategoryQuery.api,query)
        commit("refreshCategory",response.data.list)
        commit("refreshCategoryLength",response.data.total)
      },
      async deleteIdHandler({commit,dispatch},id){
        let response = await get(Categoryapi.CategoryDeleteById.api+id)
        await dispatch('CategoryFindAll')
      }
  }
}