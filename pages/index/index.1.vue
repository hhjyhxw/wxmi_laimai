<template>
	<view class="page">
		
		<!-- 头部 -->
		<view class="header1">
			<view class="lbs-btn" @click="getLocationInfo">
				<text>{{address}}</text>
			</view>
		</view>
		<!-- 商品搜索-->
		<view class="search">
			<input  placeholder="搜索商品" placeholder-class="holderclass"/>
		</view>
		<!-- 广告列表-->
		<view class="adlist">
				<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" class="uni-swiper-dot_class">
				    <swiper class="swiper-box" @change="change">
				        <swiper-item v-for="(item ,index) in info" :key="index">
				            <view class="swiper-item">
								<image :src="item.adImage"></image>
				            </view>
				        </swiper-item>
				    </swiper>
				</uni-swiper-dot>
		</view>
		<!-- 商品分类-->
		<view class="shoptype">
			<view class="shoptype_item itemone" @click="toGoogType(2320)">
				<text class="shoptype_item_text">零食小吃</text>
			</view>
			<view class="shoptype_item itemtwo" @click="toGoogType(2321)"><text class="shoptype_item_text">新鲜水果</text></view>
			<view class="shoptype_item itemthird" @click="toGoogType(2325)"><text class="shoptype_item_text">酒水饮料</text></view>
			<view class="shoptype_item itemfour" @click="toGoogType(2323)"><text class="shoptype_item_text">生鲜肉类</text></view>
			<view class="shoptype_item itemfive" @click="toGoogType(2324)"><text class="shoptype_item_text">优选蔬菜</text></view>
			<view class="shoptype_item itemsix" @click="toGoogType(2322)"><text class="shoptype_item_text">米面粮油</text></view>
			<view class="shoptype_item itemseven" @click="toGoogType(2326)"><text class="shoptype_item_text">日用家居</text></view>
			<view class="shoptype_item itemeig" @click="toGoogType(2328)"><text class="shoptype_item_text">家政服务</text>	</view>
		</view>
	
	<view class="out_shop_name">
	</view>
	<!-- 优选商品	-->
	<view class="shop-name">
		<text class="shop-name-text">优选商品</text>
	</view>
	
	<view class="shop-goods">
		
		<view class="wrap" v-for="(item ,index) in perfectGoodsList" :key="index">
			<view class="good" @click="toGoodsDetail(item.id)">
				<view class="good_img">
					<image :src="item.defaultSourceImagePath"></image>
				</view>
				<view class="txt-normal">{{item.name}}</view>
				<view class="price">{{item.marketPrice}}</view>
			</view>
		</view>
	</view>
	
	<!-- <view  class="footer">
		  		<view class="menus">
		    		<view  class="menu  active"  @click="firstPage">
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
		     		
					<view class="menu"  @click="toMyCenter" >
							<view  id="wode">
									<span class="menu-icon menu-icon4"></span>
									<view id="headerMemberCenter">我的</view></view>
							</view>
					</view>
	</view> -->
	
	
		 <view class="container999">
			<tabBar :currentPage="currentPage"></tabBar>
		</view>
	</view>
	
	
</template>

<script>
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue";
	import tabBar from '../../components/zwy-tabBar/tabBar.vue';
	export default {
		components: {
			uniSwiperDot,
			tabBar
		},
		data() {
			return {
				currentPage:'index',
				address:'西乡塘区',
				longitude:'',
				latitude:'',
				info: [{
					content: '内容 A',
					adImage:'../../static/image/temp/banner_hyyx.png'
				}, {
					content: '内容 B',
					adImage:'../../static/image/temp/banner1.png'
				}, {
					content: '内容 C',
					adImage:'../../static/image/temp/banner_hyyx.png'
				}],
				current: 0,//广告列表属性
				mode: 'dot',//广告列表属性
				perfectGoodsList:[
					{
						id:1,
						name:'龙眼',
						defaultSourceImagePath:'../../static/image/temp/goods-demo.png',
						marketPrice:'263.00'
					},
					{
						id:1,
						name:'新水果',
						defaultSourceImagePath:'../../static/image/temp/good-demo.jpg',
						marketPrice:'250.00'
					},
					{
						id:1,
						name:'荔枝',
						defaultSourceImagePath:'../../static/image/temp/good-demo.png',
						marketPrice:'682.00'
					},
					{
						id:1,
						name:'牛肉',
						defaultSourceImagePath:'../../static/image/temp/goods-demo.jpg',
						marketPrice:'589.00'
					},
					{
						id:1,
						name:'龙虾',
						defaultSourceImagePath:'../../static/image/temp/good-demo.jpg',
						marketPrice:'289.00'
					}
				]
			}
		},
		onLoad() {
			this.getLocationInfo();
			this.getAdsList();
			 uni.$on('LoginBack',()=> {
				 this.getAdsList();
				
			 });
		},
		methods: {
			//滚动图改变
			 change(e) {
				this.current = e.detail.current;
			},
				
			//定位到当前位置
			getLocationInfo(){
				var that = this;
				uni.getLocation({
				    type: 'wgs84',
					geocode:true,
				    success: function (res) {
							 //console.log('当前位置的经度：' + JSON.stringify(res));
						that.longitude = res.latitude;
						that.latitude = res.latitude;
						var address = res.address.street+res.address.streetNum;
						that.address = address;
						
				    }
				});
			},
			//获取广告列表
			getAdsList(){
				this.$api.getAdsList().then(res =>
					{
						 console.log(JSON.stringify(res));
						 console.log("data==="+JSON.stringify(res.list));
						  console.log(this.$config.imghosturl);
						if(res.list!=null){
							var list = res.list;
							list.forEach(p => p.adImage = this.$config.imghosturl+p.adImage);
							this.info = list;
						}
						//获取优选商品
						if(res.list!=null){
							this.getPerfectGoodsList();
						}
						
						
					}); 
			},
			//获取优选商品
			getPerfectGoodsList(){
				this.$api.perfectgoods().then(res =>
					{
						 console.log(JSON.stringify(res));
						  console.log(this.$config.imghosturl);
						if(res.list!=null){
							var perfectGoodsList = res.list;
							perfectGoodsList.forEach(p => p.defaultSourceImagePath = this.$config.imghosturl+p.defaultSourceImagePath);
							this.perfectGoodsList = perfectGoodsList;
						}
					}); 
			},
			//跳转商品分类
			toGoogType(goodsCategoryId) {
				uni.navigateTo({
					 url: '/pages/goodtype/goodtype?goodsCategoryId='+goodsCategoryId+'&lng='+this.longitude+'&lat='+this.latitude+'&nameKey='
				})
			},
			//跳转商品详情情页
			toGoodsDetail(goodId) {
				uni.navigateTo({
					 url: '/pages/gooddetail/gooddetail?goodId='+goodId
				})
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
		}
	}
</script>

<style>
	.header1{
		     background-color: #E13F3F;
		     height: 2.5rem;
		     line-height: 2.5rem;
		     padding: 0 1.6rem;
		     color: #fff;
		     font-size: 0.7rem;
		     position: relative;
	}
	.lbs-btn{
		    color: #fff;
		    display: inline-block;
		    height: 2.5rem;
		    line-height: 2.5rem;
		    width: 100%;
		    white-space: nowrap;
		    overflow: hidden;
		    text-overflow: ellipsis;
	}
	.lbs-btn:after {
	    content: '';
	    border-top: 5px solid #fff;
	    border-left: 6px solid transparent;
	    border-right: 6px solid transparent;
	    position: relative;
	    top: .8rem;
	    left: 4px;
	}
	.search {
		   padding: 0.3rem 0.6rem 0.3rem 0.6rem;
	       background-color: #EBEBEB;
	       position: relative;
	       display: -webkit-box;
	       display: -webkit-flex;
	       display: -ms-flexbox;
	       display: flex;
	}
	.search input{
		   display: block;
		   width: 100%;
		   box-sizing: border-box;
		   -webkit-box-flex: 1;
		   -webkit-flex: 1;
		   -ms-flex: 1;
		   flex: 1;
		   height: 1.8rem;
		   padding: 0 1.5rem 0 28px;
		    background: url(../../static/image/ic_sy_search.png) 8px center no-repeat scroll #fff;
		    background-size: 14px 14px;
		    border: 1px solid #CCC;
		    outline: 0;
		    border-radius: 5px;
		    font-size: 0.7rem;
	}
	.holderclass{
		 font-size: 0.7rem;
	}
	.adlist{
		height: 100%;
	}
	.adlist image{
		height: 150px;
		width: 100%;
	}
	.uni-swiper-dot_class{
		
	}
	.shoptype{
		    /* display: block;
		    list-style-type: disc;
		    margin-block-start: 1em;
		    margin-block-end: 1em;
		    margin-inline-start: 0px;
		    margin-inline-end: 0px;
		    padding-inline-start: 40px; */
			
	}
	.shoptype_item{
		    display: inline-block;
		    width: 25%;
		    text-align: center;
			padding: 3rem 0 0 0;
			font-size: 0.7rem;
			color: #666;
			background-size: 2.8rem 2.8rem;
	}
	.itemone{
		background:url(../../static/image/ic_sy_lsxc.png) center center no-repeat scroll;
		background-size: 2.8rem 2.8rem;
	}
	.itemtwo{
		background:url(../../static/image/ic_sy_xxsg.png) center center no-repeat scroll;
	    background-size: 2.8rem 2.8rem;    
	}
	.itemthird{
		background:url(../../static/image/ic_sy_jsyl.png) center center no-repeat scroll;
		background-size: 2.8rem 2.8rem;
	}
	.itemfour{
		background:url(../../static/image/ic_sy_sxsp.png) center center no-repeat scroll;
		background-size: 2.8rem 2.8rem;
	}
	.itemfive{
		background:url(../../static/image/ic_sy_yxsc.png) center center no-repeat scroll;
		background-size: 2.8rem 2.8rem;
	}
	.itemsix{
		background:url(../../static/image/ic_sy_lyfs.png) center center no-repeat scroll;
		background-size: 2.8rem 2.8rem;
	}
	.itemseven{
		background:url(../../static/image/ic_sy_jjry.png) center center no-repeat scroll;
		background-size: 2.8rem 2.8rem;
	}
	.itemeig{
		background:url(../../static/image/ic_sy_jzfw.png) center center no-repeat scroll;
		background-size: 2.8rem 2.8rem;
	}
	.shoptype_item_text{
		display: block;
		padding-top: 20px;
	}
	.out_shop_name{
		background-color: #EBEBEB;
		height: 0.5rem;
		width: 100%;
		display: block;
		margin-top: 0.8rem;
	}
	.shop-name{
		      height: 2rem;
		      line-height: 2rem;
		      position: relative;
		      font-size: 0.8rem;
		      background-color: white;
			  border-bottom: 1px solid lightgray;
	}
	.shop-name-text{
		padding: 0 1.5rem 0 3.2rem;
		background: url(../../static/image/ic_sy_cjmg.png) 1.6rem 46% no-repeat scroll;
		background-size: 22px 22px;
		color: #333;
		font-weight: 400;
		margin-left: -0.8rem;
	}
	.shop-goods{
		    margin-bottom: 3.5rem;
	}
	.shop-goods .wrap{
		    padding: 1rem;
		    box-sizing: border-box;
		    width: 33.33%;
		    display: inline-block;
		    background-color: #fff;
		    border-top: 1px solid #EBEBEB;
		    position: relative;
		   /* min-height: 13.5rem; */
		    vertical-align: top;
			font-size: 0.7rem;
	}
	.shop-goods .wrap .good_img {
		    text-align: center;
		    margin: 0 auto .3rem auto;
		    height: 5rem;
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: -ms-flexbox;
		    display: flex;
		    -webkit-box-align: center;
		    -webkit-align-items: center;
		    -ms-flex-align: center;
		    align-items: center;
		    overflow: hidden;
	}
	.shop-goods .wrap .good_img image{
		max-width: 8rem;
		max-height: 100%;
	}
	  
	.shop-goods .wrap .txt-normal{
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #666;
		text-overflow: ellipsis;
		white-space: nowrap
	}
	.shop-goods .wrap .price{
		margin-top: .3rem;
		font-family: Arial;
		color: #F24335;
	}
	.shop-goods .wrap:after {
	    content: '';
	    display: block;
	    width: 1px;
	    position: absolute;
	    top: 1rem;
	    bottom: 1rem;
	    right: 0;
	    background-color: #EBEBEB;
	}
	.active {
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
