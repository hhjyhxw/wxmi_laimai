<template>
	<view class="container">
		<view class="hearder"><image class="uni-cart-img15" src="../../static/image/ic_zfcg_no.png"></image><text class="uni-text-07">订单支付失败</text></view>
		<!-- ic_zfcg_no.png 支付失败图标 -->
		<view class="content">
			
			<view class="listitem"><text>支付金额:</text><text class="money_text">￥{{order.paidAmount}}</text></view>
			<view class="listitem"><text>流水单号:</text><text class="no_text">{{order.paymentSn}}</text></view>
		</view>
		
		<view class="footerlist">
			<view class="footerlistitem" @click="toOrder">
				<view class="uni-cart-imgbox">
					<image class="uni-cart-img15" src="../../static/image/ic_zfcg_grzx.png"></image>
				</view>
				<view>查看订单</view>
			</view>
			<view  class="footerlistitem" @click="toIndex">
				<view class="uni-cart-imgbox">
					<image class="uni-cart-img15" src="../../static/image/ic_zfcg_sy.png"></image>
				</view>
				<view>逛逛首页</view>
			</view>
			<view  class="footerlistitem" @click="toCenter">
				<view class="uni-cart-imgbox">
					<image class="uni-cart-img15" src=""></image>
				</view>
				<view>个人中心</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order:{
					paidAmount:0.01,
					paymentSn:'P2020030325652'
				}
			}
		},
		methods: {
			toIndex() {
				uni.switchTab({
					 url: '/pages/index/index'
				});
			},
			toOrder() {
				uni.redirectTo({
				    url: '/pages/orderlist/orderlist?status=UNPAID'
				});
			},
			toCenter() {
				uni.switchTab({
				    url: '/pages/mycenter/mycenter'
				});
			},
			
		}
	}
</script>

<style>
	.container{
		display: flex;
		flex-flow: column;
		background: lightgrey;
		height: 100%;
	}
	.hearder{
		    display: flex;
		    background: white;
		    padding: 1.5rem 1rem 1.5rem 1rem;
		    margin-bottom: 1rem;
	}
	.uni-text-07{
		padding-left: 1rem;
		font-size: 1rem;
	}
	.uni-cart-imgbox{
		display: flex;
		justify-content: center;
	}
	.uni-cart-img15{
		width: 1.5rem;
		height: 1.5rem;
	}
.content{
		background: white;
		padding-left: 1rem;
		padding-top: 1rem;
	}
	.listitem{
		background: white;
		font-size: 0.7rem;
		color: #383030;
		padding: 0.3rem 0rem 0.3rem 0rem;
		border-bottom: 1px solid lightgrey;
	}
	.no_text{
		color: black;
		padding-left: 0.5rem;
	}
	.money_text{
		color: red;
		padding-left: 0.5rem;
	}
	.footerlist{
		display: flex;
		padding: 1rem;
		justify-content: center;
	}
	.footerlistitem{
		background: white;
		display: block;
		padding: 0.5rem;
		font-size: 0.7rem;
		margin: 1rem;
		border-radius: 3px;
	}
</style>
