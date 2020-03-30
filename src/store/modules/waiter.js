import _ from 'lodash'
import { post_array, post_json, post_obj_array, get, post} from '../../../http/axios.js'
import { Waiterapi } from '../../../utiles/apiController.js'
export default {
	namespaced:true,
	state:{
		waiterData:[]
	},
	getters:{
		
	},
	mutations:{
		refreshWaiter(state,waiterData){
			state.waiterData = waiterData
		}
	},
	actions:{
		async findAllWaiter({commit,dispatch,rootState},status){
            let response = await get(Waiterapi.WaiterFindAll.api)
            commit("refreshWaiter",response.data)
		}
	}
}