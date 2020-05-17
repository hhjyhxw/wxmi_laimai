import Vue from 'vue'
import store from './store'
import App from './App'
import config from '@/common/utils/config'
import util from '@/common/utils/util'
import api from '@/common/vmeitime-http/'


const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
};

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$msg = msg;
Vue.prototype.$config = config;
Vue.prototype.$util = util;
Vue.prototype.$api = api;




App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
