<template>
	<view class="">
		
		<view class="main-container">
			<!-- 收货地址 -->
			<view class="address" @click="toSelectAddress" v-if="receiver!=null">
				<view class="">
					<image class="lbs" src="../../static/image/ic_ddqr_dz.png"></image>
				</view>
				<view class="receiveinfo">
					<view class="persion"><text>{{receiver.name}}</text><text class="persiontext2">{{receiver.mobile}}</text></view>
					<view class="addressdetail">
						<text>{{receiver.provinceName}}{{receiver.cityName}}{{receiver.areaName}}{{receiver.address}}</text>
					</view>
				</view>
				<view >
					<label class="arr"></label>
				</view>
			</view>
			<!-- 收货地址 -->
			<view class="address" @click="toSelectAddress" v-if="receiver==null">
				
				<view class="receiveinfo2" style="display:block;margin 1px auto;">
					<view class="addressdetail">
						<text>+添加收货地址</text>
					</view>
				</view>
				<view >
					<label class="arr"></label>
				</view>
			</view>
				<!-- 收货地址 end -->
				
			<!-- 店铺订单 start -->
			<view class="order" v-for="(item,index) in supplierList" :key="index">
				<view class="shop shop-link" @click="toShopDetail(item.id)">
					{{item.supplierName}}
				</view>
				<view class="order-list">
					<view class="goods" v-for="(item2,index2) in item.careItemList" :key="index2">
						<view class="products">
							<text class="name">{{item2.pName}}</text>
							<text class="num">x{{item2.quantity}}</text>
							<text class="xmoney">￥{{item2.price}}</text>
						</view>
					</view>
					<view class="peisong">
						<view class="shsmNotice">
							<text class="shsmNotice_text">配送方式</text>
							<radio class="shsmNotice" disabled="true" checked="true">送货上门</radio>
						</view>
						<view class="shsmNotice sm">
							<text>由【{{item.supplierName}}】发货</text><text>门店地址：{{item.supplierAddress}}</text>
						</view>
						<view class="message">
							<label>买家留言:</label><input v-model="item.memo"  />
						</view>
						<view class="totalinfo">
							<label class="totalproduct">共计<text class="totalinfo_text">{{item.totalNum}}</text>件商品</label>
						<!--	<label class="totalpost">邮费：<text class="totalinfo_text">￥{{item.postFee}}</text></label> -->
							<label class="totalprice">合计:<text class="totalinfo_text">{{item.totalAmount}}</text></label>
						</view>
					</view>
				</view>
			</view>
			<!-- 店铺订单 end -->
			
			<!-- 支付方式 start -->
			<view class="paytype">
				<view class="payway"><text>支付方式</text></view>
				<view class="btns pay">
					<view class="payitem wetchat active">微信支付</view>
					<!-- <view class="payitem zhifubao">支付宝</view> -->
				</view>
			</view>
			<!-- 支付方式 end -->
		
		</view>
		
		<!-- main-container end -->
		<!-- 底部 -->
		<view class="footer-count">
			<view class="total">
				<view class="flex">
					<view class="sp2">
						<label class="sp2text1">合计:￥{{totalMoney}}</label> <!-- <label class="sp2text2">优惠:￥{{totalMoney}}</label> -->
					</view>
					<view class="sp3">
					</view>
				</view>
			</view>
			
			<view class="submit"  @click="toCreateOrder">确认</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				receiver:null,
				supplierList:[
						{
							id:1,
							supplierName:'旗舰店',
							supplierAddress:'北湖南路23号',
							checked:true,
							totalAmount:0.98,
							totalNum:3,
							postFee:5,
							careItemList:[
								{
									goodsId:1,
									productId:1,
									isMarketable:false,
									pName:'荔枝',
									price:0.88,
									goodImg:'../../static/logo.png',//listImgPath
									checked:true,
									quantity:2
								}
								
							]
						},
						{
							id:1,
							supplierName:'旗舰店',
							supplierAddress:'北湖南路23号',
							checked:true,
							totalAmount:0.98,
							totalNum:3,
							postFee:5,
							careItemList:[
								{
									goodsId:1,
									productId:1,
									isMarketable:false,
									pName:'荔枝',
									price:0.88,
									goodImg:'../../static/logo.png',//listImgPath
									checked:true,
									quantity:2
								}
								
							]
						},
					],
					selectAllChecked:false,
					totalMoney:0.88,
					totalDistcont:0.88,
					buyType:'',
					pid:''
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.pids); //打印出上个页面传递的参数。
			console.log(option.buyType); //打印出上个页面传递的参数。
			this.buyType = option.buyType;
			this.pids = option.pids;
			
		},
		onShow:function(){
			var data ={buyType:this.buyType,pids:this.pids};
			this.getPreOrderList(data);
		},
		
		methods: {
			
			//跳转支付页，传入传教订单相关参数
			toCreateOrder(){
				if(this.receiver==null){
					uni.showToast({
						title:'请选择收货地址'
					})
					return;
				}
				
				var data = [];
				this.supplierList.forEach((p) => {
					var pids='';
					var quantitys='';
					p.careItemList.forEach((k) => {
						pids+=k.productId+'@@@';
						quantitys+=k.quantity+'@@@'
					});
					var order ={
						sid:p.id,
						pids:pids,
						quantitys:quantitys,
						memo:p.memo
					};
					data.push(order);
				});
			
				var obj = {
					dataJson:data,
					receivierId:this.receiver.id
				}
				let objJson =JSON.stringify(obj);
				uni.redirectTo({
					url: '/pages/pay/pay?objJson='+objJson+'&formorderconfig=formorderconfig'
				});
			},
			
			
			//跳转店铺详情页
			toShopDetail(shopId) {
				uni.navigateTo({
					url: '/pages/shopdetail/shopdetail?shopId='+shopId
				})
			},
			//选择地址
			toSelectAddress(){
				var userId = 1;
				uni.navigateTo({
					url: '/pages/addresslist/addresslist?userId='+userId
				})
			},
			//获取购物车商品
			getPreOrderList(data){
				this.$api.preOrder(data).then(res =>
					{
						 console.log(JSON.stringify(res));
						  console.log(this.$config.imghosturl);
						if(res.list!=null){
							 this.supplierList = res.list;
							 this.totalMoney = res.totalMoney;
							 this.totalDistcont = res.totalDistcont;
							 this.receiver = res.receiver;
						}
					}); 
			},
			
		}
	}
</script>

<style>
	
.flex {
	width: 100%;
	height: 100%;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
}
.flex .body {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

.main-container {
      background-color: #EBEBEB;
      position: relative;
      z-index: 1;
      opacity: 1;
      -webkit-transition: -webkit-transform .3s ease;
      transition: transform .3s ease;
	  margin-bottom: 5rem;
	
}

.main-container .address{
	       margin: 0.5rem 0;
	       padding: 0.5rem 0;
	    background-image: url(../../static/image/pic_ddqr_dzt.png), url(../../static/image/pic_ddqr_dzt.png);
	    background-position: 0 0, 0 100%;
	    background-repeat: repeat-x, repeat-x;
	    background-size: auto 2px, auto 2px;
	    background-color: #fff;
		display:flex;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox; 
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		/* font-size: 0.7rem; */
}
.main-container .address .lbs {
	    color: transparent;
	    width: 2rem;
	    /* background: url(../../static/image/ic_ddqr_dz.png) 50% 50% no-repeat; */
	    background-size: 20px auto;
		height: 1.2rem;
		width: 1.5rem;
		padding: 0 1rem;
}
.main-container .address .receiveinfo {
	    font-size: 0.7rem;
		color: #666;
}
.main-container .address .receiveinfo2 {
	        font-size: 0.7rem;
	        color: #666;
	        display: block;
	        justify-content: center;
	        align-content: center;
	        margin: 1px auto;
}
.main-container .address .arr {
	background: url(../../static/image/ic_fj_arrow.png) 100% 50% no-repeat;
	background-size: 5.5px auto;
	height: 2rem;
	width: 2rem;
	display: block;
	background-position: center;
}
.persion{
	padding: 0.3rem;
}
.persiontext2{
	padding-left: 1rem;
}


.order {
    margin: 0.5rem 0;
    border-top: 1px solid #E2E2E2;
	background: url(../../static/image/pic_ddqr_jc.png) 0 100% repeat-x #fff;
    background-size: auto 5px;
}
   .order .shop-link{
	   position: relative;
   }
.order .shop {
    display: block;
	height: 2.5rem;
	line-height: 2.5rem;
	padding: 0 1rem 0 2.2rem;
	box-sizing: border-box;
	color: #333;
	font-size: 0.8rem;
    background: url(../../static/image/ic_ddqr_dp.png) 1rem 50% no-repeat;
    background-size: 17px auto;
    border-bottom: 1px solid #E2E2E2;
}

.order .shop-link:after {
    content: '';
    display: block;
    width: 1rem;
    height: 100%;
    background: url(../../static/image/ic_gg_arrow.png) 100% 50% no-repeat;
    background-size: 6px auto;
    position: absolute;
    top: 0;
    right: 1rem;
}
.order .order-list {
    padding: 0;
}
.order .order-list .goods {
    width: 100%;
}

.order .goods .products {
    display: block;
	height: 2.5rem;
	line-height: 2.5rem;
	padding: 0 1rem 0 1rem;
	box-sizing: border-box;
	color: #333;
	font-size: 0.7rem;
    background-size: 17px auto;
    border-bottom: 1px solid #E2E2E2;
	display: flex;
}


.order .goods .products .name{
	flex: 1;
}
.order .goods .products .num{
	flex: 1;
	text-align: right;
	padding-right: 2rem;
}

.shsmNotice{
	display: block;
	height: 2.5rem;
	line-height: 2.5rem;
	padding: 0 1rem 0 1rem;
	box-sizing: border-box;
	color: #333;
	font-size: 0.7rem;
	background-size: 17px auto;
	border-bottom: 1px solid #E2E2E2;
	display: flex;
}

.shsmNotice_text{
	padding-right: 1rem;
}

.radio-roup-row{
	display: flex;
	flex-direction: row;
}
.peisong .message {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
	  font-size: 0.7rem;
	  border: 1px solid #c9c8cb;
	  border-radius: 4px;
	  height: 1.6rem;
	  line-height: 1.6rem;
	  margin: 0.5rem 1rem;
}
.peisong .message .input {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 0.7rem;
    border: 0;
    box-sizing: border-box;
    background: none;
}

.totalinfo{
	display: block;
	height: 2.5rem;
	line-height: 2.5rem;
	padding: 0 1rem 0 1rem;
	box-sizing: border-box;
	color: #333;
	font-size: 0.7rem;
	background-size: 17px auto;
	border-bottom: 1px solid #E2E2E2;
	display: flex;
}

.totalinfo .totalproduct{
	flex: 1;
}
.totalinfo .totalpost{
	flex: 1;
}
.totalinfo_text{
	color: red;
	font-weight: bold;
}
.paytype{
	background-color: #fff;
	margin-bottom: 1rem;
	border-top: 1px solid #E2E2E2;
	border-bottom: 1px solid #E2E2E2;
}
.paytype .payway{
	height: 2rem;
	line-height: 2rem;
	padding: 0 1rem 0 2rem;
	box-sizing: border-box;
	color: #333;
	font-size: 0.8rem;
	background: url(../../static/image/ic_ddqr_zf.png) 1rem 50% no-repeat;
	background-size: 17px auto;
	border-bottom: 1px solid #E2E2E2;
}
.paytype .btns {
    padding: 5px;
    font-size: 0;
	display: flex;
}
.paytype .pay {
    margin-top: 10px;
    padding: 10px;
    border-top: 1px solid #E2E2E2;
    background-color: #fff;
}
.payitem{
	isplay: inline-block;
	width: 30%;
	text-align: center;
	font-size: 0.7rem;
	padding: 0.5em 0;
	color: #666;
	border: 1px solid #C9C9CB;
	margin: 5px 1.3%;
}
.paytype .btns .active {
    color: #E35353;
    border: 1px solid #E35353;
    background: url(../../static/image/btn_xuanzhong.png) 100% 100% no-repeat;
    background-size: 13px 13px;
}
.footer-count {
		    position: fixed;
		    bottom: 0;
		    left: 0;
		    right: 0;
		    z-index: 10;
		    height: 2.5rem;
		    line-height: 2.5rem;
		    font-size: 0.7rem;
		    display: flex;
	}
	.footer-count .total {
	    float: left;
	   padding: 0;
	   width: 76%;
	   background-color: rgba(0,0,0,0.8);
	    color: #fff;
	    box-sizing: border-box;
	    background-color: #262626;
	}
	
	 .flex {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.flex .sp1 {
	  /*  position: relative; */
	    display: block;
	    padding: 0 0 0 40px;
	    font-size: 0.7rem;
	    color: #D2D2D2;
	    white-space: nowrap;
		}
		
	.sp1 .checked {
		    background: url(../../static/image/but_gou_light.png) 13px 50% no-repeat transparent;
		    background-size: 18px 18px;
		}
	.flex .sp1 .selectAll {
		position: absolute;
		top: 0;
		left: 1rem;
		right: 0;
		bottom: 0;
		display: block;
		width: 20%;
		height: 100%;
		-webkit-appearance: none;
		/* background: url(../../static/image/but_gou_gray.png) 13px 50% no-repeat transparent; */
		/* background-size: 18px 18px; */
		border: none;
		border-radius: 0;
		outline: none;
	}
	
	.total .flex .sp2 {
	    display: block;
	    font-size: 0.7rem;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	        /* text-align: center; */
	}
	.sp2text1{
		flex: 1;
		display: inline-block;
	}
	.sp2text2{
		flex: 1;
		display: inline-block;
		padding-left: 1rem;
		color: red;
	}
	.footer-count .submit {
		float: left;
		width: 30%;
		color: #fff;
		display: block;
		text-align: center;
		background-color: #E35151;
	}
</style>
