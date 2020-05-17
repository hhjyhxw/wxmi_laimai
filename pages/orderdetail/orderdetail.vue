<template>
	<view class="main-container">
		<view class="list">
			<view class="listitem">
				<text>订单编号</text><text class="text2">{{order.tid}}</text>
			</view>
			<view class="listitem">
				<text>订单状态</text><text class="text2">{{order.tradeStatus}}</text>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="address">
			<view class="">
				<image class="lbs" src="../../static/image/ic_ddqr_dz.png"></image>
			</view>
			<view class="receiveinfo">
				<view class="persion"><text>{{order.shipName}}</text><text class="persiontext2">{{order.shipMobile}}</text></view>
				<view class="addressdetail">
					<text>{{order.shipAddress}}</text>
				</view>
			</view>
		</view>
		
		<!-- 订单商品明细信息 -->
		<view class="order">
			<view class="shop shop-link">
				旗舰店
			</view>
			<view class="order-list" v-for="(item,index) in order.orderitemlist" :key="index">
				<view class="col1">
					<image :src="item.goodimg"></image>
				</view>
				<view class="col2">
					<text>{{item.goodName}}</text>
				</view>
				<view class="col3">
					<text class="money">￥{{item.goodPrice}}</text><text>x{{item.goodNum}}</text>
				</view>
			</view>
		</view>
		
		<!-- 订单金额信息 -->
		<view class="list list-tri">
			<view class="listitem">
				<text>商品总额</text><text class="text3">￥{{order.totalAmount}}</text>
			</view>
			<view class="listitem">
				<text>优惠金额</text><text class="text3">￥0.00</text>
			</view>
			<!--
			<view class="listitem">
				<text>配送金额</text><text class="text3">￥8.00</text>
			</view>
			-->
			<view class="listitem">
				<text>订单总额</text><text class="text3 texttotal" >￥{{order.totalAmount}}</text>
			</view>
		</view>
		
		<!-- 其他信息 -->
		<view class="list">
			<view class="listitem">
				<text>下单时间</text><text class="text2">{{order.createDate}}</text>
			</view>
			<!--
			<view class="listitem">
				<text>买家留言</text><text class="text2"></text>
			</view>
			-->
			<view class="listitem">
				<text>配送方式</text><text class="text2">送货上门</text>
			</view>
			<view class="listitem">
				<text>支付方式</text><text class="text2">微信支付</text>
			</view>
			<!--
			<view class="listitem">
				<text>客服电话</text><text class="text2">156851115</text>
			</view>
			-->
			<view class="listitem">
				<text>在线客服</text><text class="text2"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order:{
					id:-1,
					shipName:'zdh',
					shipMobile:'15077144027',
					shipAddress:'广西壮族自治区南宁市西乡唐区',
					orderitemlist:[
						{
							goodimg:'../../static/logo.png',
							goodName:'测试商品',
							goodNum:2,
							goodPrice:0.02
						},
						{
							goodimg:'../../static/logo.png',
							goodName:'云南白果',
							goodNum:3,
							goodPrice:0.05
						},
						{
							goodimg:'../../static/logo.png',
							goodName:'云南白果',
							goodNum:1,
							goodPrice:3
						}
						
					]
				}
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		    console.log('id===='+option.id); //打印出上个页面传递的参数。
			this.order.id = option.id;
		},
		onShow: function () {
			this.getOrderDetail(this.status);
		},
		methods: {
			//获取用户待收货，待支付订单数
			getOrderDetail(){
				this.$api.orderdetail({id:this.order.id}).then(res =>
					{
						 console.log(JSON.stringify(res));
						if(res.code=='0000'){
							let order = res.order;
							order.orderitemlist.forEach((p) => {
									p.goodimg = this.$config.imghosturl+p.goodimg
							});
							this.order = order;
						}
					}); 
			},
		}
	}
</script>

<style>
	.main-container {
		padding-bottom: 1rem;
		background-color: #EBEBEB;
		position: relative;
		z-index: 1;
		opacity: 1;
		transition: transform .3s ease;
	}
	.list {
	    border-top: 1px solid #ddd;
	    border-bottom: 1px solid #ddd;
	    padding: 0 0 0 1rem;
	    background-color: #fff;
	}
	.list .listitem {
	    display: block;
	    color: #666;
	    font-size: 0.7rem;
	    height: 2.5rem;
	    line-height: 2.5rem;
	    border-bottom: 1px solid #ddd;
	}
	.list .listitem .text2{
		padding-left: 1rem;
	}
	.list .listitem .text3{
		 padding-right: 1rem;
		display: block;
		float: right;
	}
	.list .listitem .texttotal{
		color: red;
	}
	.address{
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
	.address .lbs {
		    color: transparent;
		    width: 2rem;
		    /* background: url(../../static/image/ic_ddqr_dz.png) 50% 50% no-repeat; */
		    background-size: 20px auto;
			height: 1.2rem;
			width: 1.5rem;
			padding: 0 1rem;
	}
	.address .receiveinfo {
		    font-size: 0.7rem;
			color: #666;
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
	.order .shop-link {
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
	.order-list{
		display: flex;
		align-items: center;
		padding: 0.6rem;
	}
	.order-list .col1{
		flex: 1;
	}
	.order-list .col1 image{
		width: 2rem;
		height: 2rem;
	}
	.order-list .col2 {
		font-size: 0.7rem;
		flex: 1;
	}
	.order-list .col3 {
		font-size: 0.7rem;
	}
	.order-list .col3 .money{
		color: red;
	}
	
</style>
