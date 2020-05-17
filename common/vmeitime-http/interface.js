/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

/*
// 开放的接口
import http from './interface'

http.config.baseUrl = "http://localhost:8080/api/"

http.request(url:'user/list',method:'GET').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list', {status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.post('user', {id:1, status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.put('user/1', {status: 2}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.delete('user/1').then((res)=>{
	console.log(JSON.stringify(res))
})

*/
import util from '@/common/utils/util';
import config from '@/common/utils/config';
export default {
	config: {
		baseUrl: config.apiUrl,
		header: {
			'Content-Type':'application/json;charset=UTF-8',
			//'Content-Type':'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if(options.showLoading) {
			uni.showLoading({mask: true,title: '加载中...'});
		}
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl;
		options.dataType = options.dataType || this.config.dataType;
		options.url = options.baseUrl + options.url;
		options.data = options.data || {};
		options.method = options.method || this.config.method;
		//TODO 加密数据

		// 数据签名
		// _token = {'token': uni.getStorage(STOREKEY_LOGIN).token || 'undefined'},
		let _token = {'accessToken': uni.getStorageSync('accessToken')};
		let now = util.formatDate('yyyyMMddHHmmss',new Date());
		options.header = Object.assign({}, options.header,
			_token,
			// {'client': config.client},
			// {'version': config.version},
			// {'requestTime': now},
			// {'sign': util.signString(JSON.stringify(options.data),now)},
		);

		return new Promise((resolve, reject) => {
			let _config = null;

			options.complete = (response) => {
				let statusCode = response.statusCode;
				response.config = _config;
				if (process.env.NODE_ENV === 'development' && config.debug) {
					if (statusCode === 200) {
						console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response);
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				_reslog(response);
				if (statusCode === 200) { //成功
					if(response.data.code == '4001' || response.data.code == '4002') { //服务器token过期
						try {
						    // uni.clearStorageSync();
							uni.removeStorageSync('accessToken');
							uni.clearStorageSync();
						} catch (e) {
							console.log("【accessToken失效】 结果：" + JSON.stringify(e))
						    // error
						}
						uni.navigateTo({url: '/pages/login/login'});
					} else if(response.data.code == '-1' || response.data.code == '500') {
						uni.showModal({title: '提示', content: '系统出错了~',showCancel:false});
					}
					resolve(response.data);
				} else {
					uni.showToast({title: '网络超时',image:'/static/sys/cry.png'});
					reject(response.data)
				}
				uni.hideLoading();
				uni.stopPullDownRefresh();
			};

			_config = Object.assign({}, this.config, options);
			_config.requestId = new Date().getTime();

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}

			// 统一的请求日志记录
			_reqlog(_config);

			if (process.env.NODE_ENV === 'development' && config.debug) {
				console.log("【" + _config.requestId + "】 地址：" + _config.url);
				if (_config.data) {
					console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}
			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {showLoading: true}
		}
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {showLoading: true}
		}
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {showLoading: true}
		}
		options.url = url;
		options.data = data;
		options.method = 'PUT';
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {showLoading: true}
		}
		options.url = url;
		options.data = data;
		options.method = 'DELETE';
		return this.request(options)
	}
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development' && config.debug) {
		console.log("【" + req.requestId + "】 地址：" + req.url);
		if (req.data) {
			console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development' && config.debug) {
		console.log("【" + res.config.requestId + "】 地址：" + res.config.url);
		if (res.config.data) {
			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch(_statusCode){
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}
