import http from './interface'
import config from '@/common/utils/config';

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

//########################### 用户登陆接口 ##################################

// 获取用户信息
export const getUserIno = () => {
	return http.get('/user/user/get', {'accessToken': uni.getStorageSync('accessToken')})
};


//########################### 小程序登录接口 ##################################



//登陆
export const login = (data) => {return http.get('/appLogin/login', data)};

//注册
export const register = (data) => {return http.get('/appLogin/register', data)};

//优选商品
export const perfectgoods = (data) => {return http.get('/goods/getPerfectGoodsList', data)};

//商品详情
export const gooddetail = (data) => {return http.get('/goods/goodDetail', data)};

//附近小店
export const shoplist = (data) => {return http.get('/supplier/storelist', data)};

//点击首页分类 获取店铺及对应店铺商品
export const goodtypelist = (data) => {return http.get('/supplier/goodslist', data)};

//店铺主信息/店铺广告/店铺商品分类
export const shopdetail = (data) => {return http.get('/supplier/shopdetail', data)};

//点击分类 获取对应分类商品
export const goodslistBySidAndCatoid = (data) => {return http.get('/supplier/goodslistBySidAndCatoid', data)};

//专题位置列表
export const productlist = (data) => {return http.get('/goods/ajaxGetOperating', data)};
//获取专题对象
export const getZhuantDetail = (data) => {return http.get('/goods/getZhuantDetail', data)};

//根据专题id查询商品
export const getGoodlistByPid = (data) => {return http.get('/goods/ajaxProjectList', data)};

//keywordlist
export const keywordlist = (data) => {return http.get('/goods/keywordlist', data)};

//根据关键字查询商品
export const getGoodlistByKeyword = (data) => {return http.get('/goods/getGoodlistByKeyword', data)};


//###################首页广告列表######
export const getAdsList = () => { return http.post('/ads/getAdvertisementList')};


//###################购物车#####
//购物车列表
export const cartItemList = () => { return http.get('/cartitem/cartItemList')};
//校验库存
export const checkStore = (data) => { return http.get('/cartitem/checkStore',data)};
//清空构成车
export const deleteCarItems = (data) => { return http.get('/cartitem/deleteCarItems',data)};
//减少构成车
export const ajaxMinuses = (data) => { return http.get('/cartitem/ajaxMinuses',data)};
//添加购物车
export const ajaxAdd = (data) => { return http.get('/cartitem/ajaxAdd',data)};
//修改购物车文本框
export const updatecarItem = (data) => { return http.get('/cartitem/updatecarItem',data)};
//获取购物车总商品数量
export const getCartNum = (data) => { return http.get('/cartitem/getCartNum',data)};

//########################### 小程序支付接口 ##################################
//订单确认
export const preOrder = (data) => { return http.get('/order/preOrder',data)};
//生产支付参数并支付
//export const createOrder = (data) => { return http.post('/order/createOrder', data)};
export const createOrder = (data) => {
	return http.post('/order/createOrder', data)
};


//我的地址列表
export const addresslist = (data) => { return http.get('/address/list',data)};
//添加/编辑地址
export const saveAddress = (data) => { return http.post('/address/saveorUpdate', data)};
//获取详细地址并编辑
export const addressDetail = (data) => { return http.get('/address/getDetail', data)};
// 设置默认地址
export const setDefaut = (data) => { return http.get('/address/setDefaut', data)};

//删除地址
export const deleteAddress = (data) => { return http.get('/address/delete', data)};
//个人中心信息
export const myinfo = (data) => { return http.get('/mycenter/myinfo', data)};
//订单列表
export const orderlist = (data) => { return http.get('/mycenter/orderlist', data)};
//订单明细
export const orderdetail = (data) => { return http.get('/mycenter/orderdetail', data)};

//contiToPay 继续支付
export const contiToPay = (data) => {
	return http.get('/order/contiToPay', data)
};
//重置密码
export const repasswordSend = (data) => { return http.get('/user/repasswordSend', data)};

//获取用户信息
export const getUserInfo = (data) => { return http.get('/user/userinfo', data)};

//修改信息
export const modifyInfo = (data) => { return http.post('/user/saveorUpadteUser', data)};


//上传文件
//export const uploadFile = (data) => { return http.get('/upload/uploadFile', data)};


export default {
	login,
	register,
	productlist,
	getAdsList,
	perfectgoods,
	gooddetail,
	shoplist,
	getGoodlistByPid,
	getZhuantDetail,
	keywordlist,
	getGoodlistByKeyword,
	goodtypelist,
	shopdetail,
	goodslistBySidAndCatoid,
	cartItemList,
	checkStore,
	deleteCarItems,
	ajaxMinuses,
	ajaxAdd,
	updatecarItem,
	getCartNum,
	preOrder,
	createOrder,
	addresslist,
	saveAddress,
	addressDetail,
	setDefaut,
	deleteAddress,
	myinfo,
	orderlist,
	orderdetail,
	repasswordSend,
	modifyInfo,
	getUserInfo,
	contiToPay

}
