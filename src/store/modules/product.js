import {Categoryapi,Productapi} from "../../../utiles/apiController.js"
export default {
  namespaced:true,
  state: {
    products:[],
    productsImg:[]
  },
  getters:{
    productFilter(state){
       return state.products.filter(item=>item.status === '100')
    }
  },
  mutations: {
    refreshProducts(state,products){
      state.products = products;
    },
	refreshProductsImg(state,productsImg){
	  let arr = productsImg.filter((item)=>{
		  return item.photo !== null
	  })
	  state.productsImg = arr
	}
  },
  actions: {
      
  }
}