<template>
	<view class="content">
		<view class="tab tab-fixed">
			<view class="tab-nav">
				<view class="tab-title active" v-if="status=='UNCOMPLETED'" >全部订单</view>
				<view class="tab-title" v-else @click="getOderList('UNCOMPLETED')">全部订单</view>
				
				<view class="tab-title active" v-if="status=='UNPAID'">待付款</view>
				<view class="tab-title" v-else @click="getOderList('UNPAID')">待付款</view>
				
				<view class="tab-title active" v-if="status=='UNSHIPPED'">待收货</view>
				<view class="tab-title" v-else @click="getOderList('UNSHIPPED')">待收货</view>
				
				<view class="tab-title active" v-if="status=='COMPLETED'">已完成</view>
				<view class="tab-title" v-else @click="getOderList('COMPLETED')">已完成</view>
			</view>
		</view>
		
		<!-- 订单列表 -->
		<view class="tab-main">
			<view class="tab-cont active">
				<view class="order" v-for="(item,index) in orderlist" :key="index">
					<view class="item">
						<view class="order-hd">
							<text class="shop">{{item.supplierName}}</text>
							<text class="state" >{{item.tradeStatusName}}</text>
						</view>
					</view>
					
					<view class="item" @click="toOrderitem(item.id)">
						<view class="order-bd">
							<view class="order-info">
								<view  v-for="(item2,index2) in item.goodsImageVos" :key="index2">
									<image class="order-img" :src="item2.goodsImage"  mode=""></image>
								</view>
								<view class="order-num">
									<text class="order-num-text">共1件</text>
								</view>
							</view>
						</view>
					</view>
					<view class="order-ft">
						<view class="time">{{item.createDate}}</view>
						<view class="money">￥{{item.totalAmount}}</view>
						<view @click="go2pay(item.tid)" class="go2pay" v-if="item.tradeStatus=='unprocessed' && item.paymentStatus=='unpaid'"><text>去支付</text></view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<!-- <view  class="footer">
			  		<view class="menus">
			    		<view  class="menu"  @click="firstPage">
			      			<view id="shouye">
								<span class="menu-icon menu-icon1"></span>
								<view>首页</view>
							</view>
			    		</view>
			    		<view class="menu" @click="shoplist"> 
			      			<view id="fujin">
								<span class="menu-icon menu-icon2"></span>
								<view>附近小店</view>
							</view>
			    		</view>
			    		<view class="menu  gwc"  @click="toCart" >
			      			<view id="gouwu">
			        			<span class="menu-icon menu-icon3"></span>
								<div>购物车</div>
								<span  id="headerCarItemQuantity" class="count"></span>
			      			</view>
			    		</view>
			     		
						<view class="menu active"  @click="toMyCenter" >
								<view  id="wode">
										<span class="menu-icon menu-icon4"></span>
										<view id="headerMemberCenter">我的</view></view>
								</view>
						</view>
		</view> -->
		<!-- <view class="container999">
			<tabBar :currentPage="currentPage"></tabBar>
		</view> -->
		<backTop :src="backTop.src"  :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	// import tabBar from '../../components/zwy-tabBar/tabBar.vue';
	import backTop from '@/components/back-top/back-top.vue';
	export default {
		components: {
			// tabBar
			backTop
		},
		data() {
			return {
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				scrollTop: 0,
				currentPage:'mycenter',
				status:'UNCOMPLETED',//订单状态：未支付 、待发货、已完成、全部
				orderlist:[
					{	
						id:0,
						supplierName:'旗舰店',
						goodimg:'../../static/logo.png',
						totalProductQuantity:2,
						totalAmount:0.56,
						tradeStatus:'overTime',
						paymentStatus:'unpaid',
						shippingStatus:'unshipped',
						tradeStatusName:'支付超时,订单已取消',
						createDate:'2019-08-12 00:10:25'
					},
					{
						id:1,
						supplierName:'旗舰店',
						goodimg:'../../static/logo.png',
						totalProductQuantity:2,
						totalAmount:0.56,
						tradeStatus:'unprocessed',
						paymentStatus:'unpaid',
						shippingStatus:'unshipped',
						tradeStatusName:'未支付',
						createDate:'2019-08-12 00:09:25'
					},
					{
						id:2,
						supplierName:'家政服务',
						goodimg:'../../static/logo.png',
						totalProductQuantity:3,
						totalAmount:0.56,
						tradeStatus:'completed',
						paymentStatus:'paid',
						shippingStatus:'unshipped',
						tradeStatusName:'未发货',
						createDate:'2019-08-13 00:10:25'
					},
					{
						id:3,
						supplierName:'家政服务',
						goodimg:'../../static/logo.png',
						totalProductQuantity:3,
						totalAmount:0.56,
						tradeStatus:'completed',
						paymentStatus:'paid',
						shippingStatus:'shipping',
						tradeStatusName:'已完成',
						createDate:'2019-05-12 00:10:25'
					}
				],
				queryData:{
					pageNo: 1,// 页码
					totalPage: 0,//表总页数
					parameters:'UNCOMPLETED',//订单状态
				}
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		    console.log('status===='+option.status); //打印出上个页面传递的参数。
			this.status = option.status;
		},
		onShow: function () {
			this.getOderList(this.status);
		},
		filters: {
			//空值过滤
		  nullImgFilter (value) {
			if(value==null || value=='null'){
				return '../../static/image/logo_loading_bg.png';
			}
		  },
		},
		methods: {
			
			//切换订单列表
			getOderList(status){
				//获取用户订单列表
				 this.queryData.parameters=status;
				 this.queryData.pageNo=1;
				 this.queryData.totalPage=0;
				this.toGetOderList(this.queryData,true);
				this.status = status;
				
			},
			async toGetOderList (data,first) {
			    let result = await this.$api.orderlist(data);
				console.log(JSON.stringify(result));
			    if(result.code != '0000') return;
			    this.queryData.totalPage = result.total;
				
				let list = result.list;
				list.forEach((p) => {
					p.goodsImageVos.forEach((k) => {
						k.goodsImage = this.$config.imghosturl+k.goodsImage
					});
				});
				
			    if(first) {//是否是刷新 或者第一次加载
			        this.orderlist = result.list;
			    } else {
			        this.orderlist = this.orderlist.concat(result.list);
			    }
			},
			
			
			toOrderitem(orderid){
				uni.navigateTo({
					 url: '/pages/orderdetail/orderdetail?id='+orderid
				});
			},
			
			go2pay(tid){
				uni.navigateTo({
					 url: '/pages/pay/pay?tid='+tid+'@@@&formorderlist=formorderlist'
				});
			},
			
			firstPage() {
				uni.redirectTo({
				    url: '/pages/index/index'
				});
			},
			shoplist() {
				uni.redirectTo({
				    url: '/pages/shoplist/shoplist'
				});
				
			},
			toCart() {
				uni.redirectTo({
				    url: '/pages/carts/carts'
				});
			},
			toMyCenter() {
				uni.redirectTo({
				    url: '/pages/mycenter/mycenter'
				});
			},
			
			onPageScroll(e) {
				this.backTop.scrollTop = e.scrollTop;
			},
			
			onPullDownRefresh(){//下拉刷新
			    this.queryData.pageNo = 1;
			    this.queryData.totalPage = 0;
			   this.toGetOderList(this.queryData,false);
			   uni.stopPullDownRefresh();
			   
			},
			onReachBottom(){//页面滚动到底部的事件
				if (this.queryData.pageNo > this.queryData.totalPage) {
					return false;
				}
			    this.queryData.pageNo = this.queryData.pageNo + 1;
				 console.log("pageNo==="+this.queryData.pageNo);
				  console.log("totalPage==="+this.queryData.totalPage);
			    if (this.queryData.pageNo > this.queryData.totalPage) {
			        return false;
			    }
			    this.toGetOderList(this.queryData,false);
			}
			
		}
	}
</script>

<style>
	.content{
		background:#fff;
	}
	.tab {
	}
	.tab .tab-nav {
		height: 2rem;
		line-height: 2rem;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		background-color: #fff;
		border-bottom: 1px solid #ddd;
	}
	.tab .tab-nav .tab-title {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    display: block;
	    margin: 0 1rem;
	    color: #666;
	    font-size: 0.7rem;
	    text-align: center;
	}
	.tab .tab-nav .tab-title.active {
	    color: #E13F3F;
	    border-bottom: 3px solid #E13F3F;
	}
	 .tab-main {
	    padding-bottom: 1px;
		margin-bottom: 5rem;
	}
	.tab-main .tab-cont.active {
	    display: block;
	    -webkit-flex-flow: row wrap;
	    -ms-flex-flow: row wrap;
	    flex-flow: row wrap;
	}
	.order {
	    margin: 1rem 0;
	    border-top: 1px solid #E2E2E2;
	    background: url(../../static/image/pic_ddqr_jc.png) 0 100% repeat-x #fff;
	    background-size: auto 5px;
	}
	.order-img{
		height: 2rem;
		width: 2rem;
		flex: 1;
		padding: 1rem;
	}
	.tab-main .tab-cont .order .order-hd {
	    height: 2rem;
	    line-height: 2rem;
	    padding: 0 1.2rem;
	    color: #333;
	    border-bottom: 1px solid #EBEBEB;
	    position: relative;
		font-size: 0.7rem;
	}
	 .tab-main .tab-cont .order .order-hd .shop {
	    padding-left: 24px;
	    background: url(../../static/image/ic_sy_dp.png) 0 50% no-repeat;
	    background-size: 17px auto;
	    border: none;
	}
	 .tab-main .tab-cont .order .order-hd .state {
	    position: absolute;
	    line-height: 2rem;
	    top: 0;
	    right: 1.5rem;
	    color: #999;
	}
	.order-info{
		display: flex;
		align-items: center;
	}
	 .tab-main .tab-cont .order .order-bd .order-info .order-num {
	    white-space: nowrap;
	    width: 3rem;
	    padding: 0 1.6rem 0 1rem;
		flex: 1;
	}
	.order-num-text{
		display: block;
		padding: 1rem auto;
		text-align: right;
		padding-right: 1rem;
		background: url(../../static/image/ic_gg_arrow.png) 100% 50% no-repeat #fff;
		background-size: 6px auto;
		font-size: 0.7rem;
		color: #0066cc
	}
	/* .order-info:after {
	    content: '';
	    display: block;
	    width: 10%;
	    background: -webkit-linear-gradient(left, rgba(255,255,255,0), #fff);
	    background: linear-gradient(left, rgba(255,255,255,0), #fff);
	    position: absolute;
	    right: 8.1rem;
	    top: 1.1rem;
	    bottom: 1.1rem;
	} */
	.order-ft{
	    height: 2rem;
	    line-height: 2rem;
	    padding: 0 1.5rem;
	    border-top: 1px solid #EBEBEB;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.7rem;
	}
	.order-ft .time {
	    color: #999;
		flex: 1;
	}
	.order-ft .money {
	    float: right;
	    color: #E13F3F;
		font-size: 0.7rem;
		padding-right: 0.6rem;
	}
	 .go2pay {
	    float: right;
	    height: 1.3rem;
	    /* margin: 0.7rem 0 0 0.7rem; */
	    line-height: 1.3rem;
	    padding: 0 1.rem;
	    color: #fff;
	    background-color: #E13F3F;
	    border-radius: 4px;
		width: 3rem;
		text-align: center;
	}
	
	.footer .active {
	    background-color: #E13F3F;
	}
	.footer{
			position: fixed;
			z-index: 999;
			bottom: 0;
			left: 0;
			background: #3A424A;
			width: 100%;
			min-width: 320px;
			/* height: 4.5rem; */
			color: white;
			font-size: 25px;
			line-height: 25px;
		}
		.footer .menus {
		    padding: 0;
		    margin: 0 auto;
		    list-style: none;
		    width: 100%;
		}
	
		.menus .menu {
		    font-size: 0.6rem;
		    float: left;
		    width: 25%;
		   /* height: 4.5rem; */
		    text-align: center;
		    padding: 0.2rem  0 0 0;
		    box-sizing: border-box;
		    margin: 0 auto;
		    -webkit-tap-highlight-color: transparent;
		}
		
		.menus .menu  .menu-icon {
		    display: block;
		    width: 100%;
		    height: 1.3rem;
		    background-size: 20px 20px;
			color: #ffffff;
			
		}
		.menus .menu .menu-icon1{
			background:url(../../static/image/ic_dh_sy.png) center center no-repeat scroll;
			background-size: 23px;
			
		}
		.menus .menu .menu-icon2{
			background:url(../../static/image/ic_dh_xd.png) center center no-repeat scroll;
			background-size: 23px;
		}
		.menus .menu .menu-icon3{
			background:url(../../static/image/ic_dh_shop.png) center center no-repeat scroll;
			background-size: 23px;
		}
		.menus .menu .menu-icon4{
			background:url(../../static/image/ic_dh_me.png) center center no-repeat scroll;
			background-size: 23px;
		}
</style>
