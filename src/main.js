import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'

// 注册时间过滤器
Vue.filter('datefmt',function(val){
  if(val){
     return moment(val).format('YYYY-MM-DD HH:mm:ss')
  }
    return val;   
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
