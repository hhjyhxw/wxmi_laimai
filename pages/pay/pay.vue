<template>
	<view class="container">
		<view class="content">
			<view class="listitem"><text>流水单号:</text><text class="no_text">{{payParams.paymentSn}}</text></view>
			<view class="listitem"><text>支付金额:</text><text class="money_text">￥{{payParams.paidAmount}}</text></view>
			<view class="listitem"><text>支付方式:</text><text class="paytype_text">微信支付</text></view>
		</view>
		<view  class="submitpay"><text class="submitpay_text" @click="toPay()">确认支付</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formorderlist:'',
				tid:'',
				objJson:'',
				payParams:{
					appid:'',
					partnerid:'',
					prepayid:'',
					package:'',
					noncestr:'',
					timestamp:'',
					sign:'',
					paymentSn:'P2020030225685',
					paidAmount:'0.01'
				}
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		 console.log(JSON.stringify(option));
			//订单列表中未支付的订单跳转
			if('formorderlist'==option.formorderlist){
				this.formorderlist = option.formorderlist;
				this.tid = option.tid;
				this.toCreateNewPayment();
			}else if('formorderconfig'==option.formorderconfig){
				//订单确认页中跳转
				console.log("objJson==="+option.objJson); 
				this.objJson = option.objJson;
				this.toCreateOrder();
			}
		},
		onShow: function () {
			//if('formorderlist'==this.formorderlist && this.tid!=''){
			//	this.toCreateNewPayment();
			//}else if('formorderconfig'==option.formorderconfig){
			//	this.toCreateOrder();
			//}
			
		},
		methods: {
			//第一次支付
			toCreateOrder(){
				var data =JSON.parse(this.objJson);
				this.$api.createOrder(data).then(res =>
					{
						 console.log(JSON.stringify(res));
						if(res.code=='0000'){
							this.payParams = res;
						}
					}); 
			},
			//继续支付
			toCreateNewPayment(){
				this.$api.contiToPay({tids:this.tid}).then(res =>
					{
						 console.log(JSON.stringify(res));
						if(res.code=='0000'){
							this.payParams = res;
						}
					}); 
			},
			
			//
			toPay(){
				console.log(JSON.stringify(this.payParams));
				wx.requestPayment({
					provider: "wxpay", 
                    orderInfo: JSON.stringify(this.payParams),
					_debug:1,
				    success:function(res){
				        wx.showModal({title: '提示', content: '支付成功', showCancel: false})
						uni.redirectTo({
							url: '/pages/paysuccess/paysuccess'
						});
				    },
				    fail: function(res){
						console.log(JSON.stringify(res));
						uni.redirectTo({
							url: '/pages/payerror/payerror'
						});
					}
				});
			}
			
		}
	}
</script>

<style>
	.container{
		background: lightgrey;
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
	.paytype_text{
		color: black;
		padding-left: 0.5rem;	
	}
	.submitpay{
		    position: fixed;
		    bottom: 0;
		    left: 0;
		    right: 0;
			background: red;
			display: flex;
			height: 2rem;
			line-height: 2rem;
			 padding: 0.15rem; 
	}
	.submitpay_text{
		display: block;
		color: white;
		font-size: 0.9rem;
		flex: 1;
		text-align: center;
		
	}
</style>
