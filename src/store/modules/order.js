import _ from 'lodash'
import { post_array, post_json, post_obj_array, get, post} from '../../../http/axios.js'
import { Orderapi, Commentapi , Productapi } from '../../../utiles/apiController.js'
export default {
	namespaced:true,
	state:{
		tableData:[],
		tableData2:[], //根据id查数据
		searchOrderData:[],
		nosendData:[]
	},
	getters:{
		
	},
	mutations:{
		refreshOrder(state,tableData){
			state.tableData = tableData
		},
		refreshOrder2(state,tableData2){
			state.tableData2 = tableData2
		},
		// 查询订单数据
		refreshSearchOrder(state,searchOrderData){
			state.searchOrderData = searchOrderData
		},
		refreshnosendData(state,nosendData){
			state.nosendData = nosendData
		}
		
	},
	actions:{
		async findAllOrder({commit,dispatch,rootState},status){
			let response = await get(Orderapi.OrderFindAll.api)
			if(status==undefined){
				commit("refreshOrder",response.data) 
				commit("refreshSearchOrder",[]) 
				let nosendData = response.data.filter((item)=>{
					return item.status ==  '待派单'
				})
				commit("refreshnosendData",nosendData)
			}else {
				// 过滤出与当前顾客订单状态相符的订单
				let currentCustomerOrder = response.data.filter((item)=>{
					return item.status ==  status
				})
				commit("refreshOrder",currentCustomerOrder)
			}
		},
		// 根据id搜索订单
		async orderFindById({commit,rootState,dispatch},id){
			let response = await get(Orderapi.OrderFindById.api+id)
			dispatch("findProduct",response.data)
		},
		async findProduct({commit,dispatch},searchOrderData){
			let response = await get(Productapi.ProductFindAll.api)
			let arr1 = []
			// 因为搜到的数据没有产品的图片和产品的name,这里过滤出来与product的id相同的数据,然后拼接到搜到的数据中
			searchOrderData.forEach(i => {
			    response.data.forEach(j => {
			        if (i.productId == j.id){
			            i.name = j.name
						i.proto = j.photo
						arr1.push(i)
			        }
			    })
			})
			commit("refreshSearchOrder",arr1)
		},
		// 指定waiterId和orederId派单
		async sendOrderHandler({commit,dispatch},params){
			let response = await get(Orderapi.OrderSend.api,params)
			await dispatch("findAllOrder")
		}
	}
}