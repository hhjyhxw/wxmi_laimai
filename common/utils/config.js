/**
 * 签名参数与后台参数一致
 */
const client = 'mini-program';
const version = '1.0';
const key = '512162086@561kiojdsy';

/**
 *  控制台打印请求和响应日志 debug=true
 */
const debug = false;

/**
 * dev 开发
 * pro 正式
 */
const active = 'pro';

/**
 * 开发服务器地址
 */
const webUrl_dev = 'https://www.szxmyf.com.cn/myunimall/api/mall/';
const apiUrl_dev = 'https://www.szxmyf.com.cn/myunimall/api/mall/';
const loginUrl_dev = 'https://www.szxmyf.com.cn/myunimall/api/mall/';
const hosturl_dev = 'https://www.szxmyf.com.cn/';
const imghosturl_dev ='https://res.haiyunzy.com/myunimall/api/mall/';

/**
 * 正式服务器地址
 */
const webUrl_pro = 'https://www.szxmyf.com.cn/myunimall/api/mall/';
const apiUrl_pro = 'https://www.szxmyf.com.cn/myunimall/api/mall/';
const loginUrl_pro = 'https://www.szxmyf.com.cn/myunimall/api/mall/';
const hosturl_pro = 'https://www.szxmyf.com.cn/';
const imghosturl_pro = 'http://res.haiyunzy.com/myunimall/api/mall/';


export default {
    client,
    version,
    key,
    debug,
    webUrl: active === 'dev' ? webUrl_dev : webUrl_pro,
    apiUrl: active === 'dev' ? apiUrl_dev : apiUrl_pro,
    loginUrl: active === 'dev' ? loginUrl_dev : loginUrl_pro,
	hosturl: active === 'dev' ? hosturl_dev : hosturl_pro,
	imghosturl: active === 'dev' ? imghosturl_dev : imghosturl_pro,
}
