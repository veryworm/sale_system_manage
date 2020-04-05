import { Userapi } from '../../../utiles/apiController.js'
import { post_array, post_json, get, post} from '../../../http/axios.js'
import { setToken, getToken, removeToken } from '../../../utiles/auth.js'
export default {
	namespaced:true,
	state:{
		 token:getToken(),
		 info:{}
	},
	getters:{
		
	},
	mutations:{
		refreshToken(state,token){
			state.token = token
			console.log(state.token)
		},
		refreshInfo(state,info){
			state.info = info
		}
	},
	actions:{
		// 登录拿info
		async Login({commit,dispatch},payload){
			console.log(payload,'p')
			let response = await post_json(Userapi.UserLogin.api,payload)
			let token = response.data.token
			setToken(token)
			await dispatch("info1",token)
		},
		// 根据token拿info
		async info1({commit,dispatch},token){
			let response = await get(Userapi.Userinfo.api,{token})
			commit("refreshInfo",response.data)
			return response.data
		},
		async logout({commit}){
			await post(Userapi.UserLogout.api);
			removeToken();
			commit('refreshToken','');
			commit('refreshInfo',{});
		}
	}
}