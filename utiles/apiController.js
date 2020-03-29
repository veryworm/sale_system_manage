const baseURL = 'http://182.92.66.130:6677'
const Categoryapi= {
	CategoryFindAll:{api:baseURL + '/category/findAll',methods:'GET'},
	CategoryFindByCategoryId:{api:baseURL + '/product/findByCategoryId',methods:'GET'},
	CategoryQuery:{api:'category/query'},
	CategoryDeleteById:{api:'/category/deleteById?id='},
	CategoryEdit:{api:'/category/saveOrUpdate'}
}
const Productapi= {
	ProductFindAll:{api:baseURL + '/product/findAll',methods:'GET'},
	ProductFindById:{api:baseURL + '/product/findById',methods:'GET'}
}
const Userapi = {
	Userinfo:{api:'/user/info',methods:'GET'},
	UserLogin:{api:'/user/login',methods:'POST'},
	UserLogout:{api:'/user/logout',methods:'POST'}
}
const Customerapi = {
	CustomerFind:{api:'/customer/findAll',methods:'GET'},
	CustomerSave:{api:'/customer/saveOrUpdate'},
	CustomerFindById:{api:'/customer/findById?id='}
}
const Commentapi = {
	CommentFind:{api:'/comment/findAll',methods:'GET'},
	CommenSaveOrUpdate:{api:'/comment/saveOrUpdate'}
}
const Orderapi = {
	OrderSave:{api:'/order/save'},
	OrderConfirm:{api:'/order/confirmOrder?orderId='},
	OrderFindAll:{api:'/order/findAll'},
	OrderFindById:{api:'/order/getOrderLinesByOrderId?orderId='},
	OrderDeleteById:{api:'/order/deleteById?id='}
}
const Addressapi = {
	AddressSave:{api:'/address/saveOrUpdate'},
	AddressFindAll:{api:'/address/findAll'},
	AddressFindQuery:{api:'/address/query'},
	AddressFindById:{api:'/address/findByCustomerId?id='}
}
export {
	Categoryapi,
	Productapi,
	Userapi,
	Addressapi,
	Customerapi,
	Orderapi,
	Commentapi
	
}

