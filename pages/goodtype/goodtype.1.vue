<template>
	<view>
		<!-- 商品搜索-->
		<view class="search">
			<input  placeholder="搜索商品" placeholder-class="holderclass"/>
		</view>
		
			<!-- all_shop  -->
			<view class="all_shop">
				<!-- 店铺与商品列表 -->
				<view class="link-shop" v-for="(item ,index) in supplierList" :key="index">
					<!-- 店铺 -->
					<view >
						<view class="shop-name shop-name-a" @click="toShopDetail(item.id)">
							<image class="shop-icon"  :src="item.supplierImg"></image>
							<view class="shop_detail_name">{{item.companyName}}</view>
							<view class="time_send">
								<text class="time">{{item.businessHours}}</text>
								<text class="send">免费配送</text>
							</view>
						</view>
					</view>
					<!-- 商品列表 -->
					<view class="shop-goods">
						<view class="wrap norest"  v-for="(item2 ,index2) in item.goodsList" :key="index2">
							<view class="good" @click="toGoodsDetail(item2.id)">
								<view class="good_img">
									<image  :src="item2.defaultSourceImagePath"></image>
								</view>
								<view class="txt-normal">{{item2.name}}</view>
								<!-- <view class="txt-fav-icon" v-if="item2.isSelect==true">海韵优选</view> -->
								<view class="price">￥{{item2.marketPrice}}</view>
							</view>
							<view class="addToCaret" @click="addToCaret(item2.id)">添加</view>
						</view>
					</view>
					<!-- 店铺商品列表end -->
				</view>
				<!-- 店铺与商品列表end -->
			</view>
			<!-- all_shop end  -->
			
			<!-- 底部 -->
			<view class="settle show">
				<view class="left">
					<view class="caret-icon"><label >{{cartNum}}</label></view>
					<view class="total-money"></view>
				</view>
				<view class="right">去结算</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryData:{},
				supplierList:[{
						id:1,
						companyName:'旗舰店',
						supplierImg:'../../static/image/ic_sy_jsyl.png',
						businessHours:'09:00-18:00',
						goodsList:[
							{
								id:1,
								name:'千叶荔枝_一骥红尘',
								isSelect:false,//是否是海韵优选
								marketPrice:'128.00',
								defaultSourceImagePath:'../../static/image/temp/good-demo.png'
							},
							{
								id:1,
								name:'龙眼',
								isSelect:true,//是否是海韵优选
								marketPrice:'168.00',
								defaultSourceImagePath:'../../static/image/temp/good-demo.png'
							},
							{
								id:1,
								name:'芒果',
								isSelect:false,//是否是海韵优选
								marketPrice:'178.00',
								defaultSourceImagePath:'../../static/image/temp/good-demo.png'
							},
							{
								id:1,
								name:'雪莉',
								isSelect:true,//是否是海韵优选
								marketPrice:'288.00',
								defaultSourceImagePath:'../../static/image/temp/good-demo.png'
							}
						]
					},
					{
							id:2,
							companyName:'千山店',
							supplierImg:'../../static/image/ic_sy_xxsg.png',
							businessHours:'09:00-18:00',
							goodsList:[
								{
									id:1,
									name:'荔枝',
									isSelect:true,//是否是海韵优选
									marketPrice:'128.00',
								defaultSourceImagePath:'../../static/image/temp/good-demo.png'
								},
								{
									id:1,
									name:'龙眼',
									isSelect:true,//是否是海韵优选
									marketPrice:'168.00',
								defaultSourceImagePath:'../../static/image/temp/good-demo.png'
								},
								{
									id:1,
									name:'芒果',
									isSelect:true,//是否是海韵优选
									marketPrice:'178.00',
								defaultSourceImagePath:'../../static/image/temp/good-demo.png'
								},
								{
									id:1,
									name:'雪莉',
									isSelect:true,//是否是海韵优选
									marketPrice:'288.00',
									defaultSourceImagePath:'../../static/image/temp/good-demo.png'
								}
							]
						},
				],
				cartNum:0 //购物车物品数量
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			//console.log(option); //打印出上个页面传递的参数。
			this.queryData = {
				lng:option.lng,
				lat:option.lat,
				nameKey:'',
				goodsCategoryId:option.goodsCategoryId
			};
			this.getShopAndGoodsLiSt(this.queryData);
			
		},
		methods: {
			//加入购物车
			addToCaret(goodId){
				uni.showLoading({
					 title: '处理中',
					 mask:true
				})
				var that = this;
				setTimeout(function () {
					that.cartNum = that.cartNum +1;
				    uni.hideLoading();
				}, 300);
				
			},
			
			//根据经纬度、分类、或者搜索关键自 获取店铺和商品信息
			getShopAndGoodsLiSt(data){
				this.$api.goodtypelist(data).then(res =>
					{
						 console.log(JSON.stringify(res));
						  console.log(this.$config.imghosturl);
						if(res.supplierList!=null && res.supplierList.length>0){
							let supplierList = res.supplierList;
							 supplierList.forEach((p) => {
									p.goodsList.forEach((k) => {
										k.defaultSourceImagePath = this.$config.imghosturl+k.defaultSourceImagePath
									});
							 });
							 this.supplierList = supplierList;
	
						}
					}); 
			},
			//跳转店铺详情页
			toShopDetail(shopId) {
				uni.navigateTo({
					 url: '/pages/shopdetail/shopdetail?shopId='+shopId
				})
			},
			//跳转商品详情情页
			toGoodsDetail(goodId) {
				uni.navigateTo({
					 url: '/pages/gooddetail/gooddetail?goodId='+goodId
				})
			},
			
			
		}
	}
</script>

<style>
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
	
	.all_shop{
		margin-bottom: 5rem;
	}
	.link-shop{
		border-bottom: 1px solid lightgrey;
	}
	.link-list{
		    padding: 0;
		    overflow: auto;
		    -webkit-overflow-scrolling: touch;
	}
	.shop-name{
		position: relative;
		height: auto!important;
		background-size: 100% 5px;
			background: url(../../static/image/pic_ss_fg.png) 0 100% no-repeat;
	}
	.shop_detail_name{
		padding: 0 0 0 4.2rem;
		background: url(../../static/image/ic_dh_shop.png) 0 100% no-repeat;
		height: 3.5rem;
		line-height: 3.5rem;
		position: relative;
		font-size: 0.8rem;
	}
	.time_send{
		    padding: 0 1.6rem 0 4rem;
			margin-top:-1rem;
			font-size: 0.7rem;
			height: 2rem;
	}
	.shop-icon{
			position: absolute;
			width: 2rem;
			height: 2rem;
			border-radius: 100%;
			left: 1.3rem;
			top: 50%;
			margin-top: -1.15rem;
	}
	.shop-name .time{
		    color: #999;
		    padding: 0 1.4rem;
		    background: url(../../static/image/ic_ss_time.png) 0 50% no-repeat;
		    background-size: 0.9rem auto;
	}
	.shop-name .send{
		   color: #999;
		   padding-left: 1.4rem;
		   background: url(../../static/image/ic_ss_ps.png) 0 50% no-repeat;
		   background-size: 0.9rem auto;
	}
	 .shop-name-a:after {
	    content: '';
	    position: absolute;
	    display: block;
	    height: 100%;
	    width: 4rem;
	    top: 0;
	    right: 0;
	    background: url(../../static/image/ic_gg_arrow.png) 50% center no-repeat scroll;
	    background-size: 6px auto;
	
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
			font-size: 0.8rem;
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
		 white-space: nowrap;
		     font-size: 0.7rem;
	}
	.shop-goods .wrap .txt-fav-icon{
		    display: block;
		    width: 100%;
		    color: transparent;
		    background: url(../../static/image/ic_gg_hyjx.png) 0 center no-repeat scroll;
		    background-size: auto 13px;
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
	.addToCaret{
		    background: url(../../static/image/btn_gg_tj_normal.png) 100% 100% no-repeat scroll;
		    background-size: 24px 24px;
			display: block;
			/* width: 30px;
			height: 30px; */
			text-indent: -9999px;
			position: absolute;
			right: 0.6rem;
			bottom:1rem;
		}
		.norest .good_img:after {
		    position: absolute;
		    bottom: 0;
		    left: 0.7rem;
		    right: 0.7rem;
		    content: "暂无货";
		   /* font-size: 1.3rem; */
		    color: #fff;
		    background-color: rgba(0,0,0,.5);
			bottom:4.5rem;
		}
		
		.settle {
			position: fixed;
			z-index: 11;
			bottom: 0;
			left: 0;
			right: 0;
			height: 2.8rem;
			line-height: 2.8rem;
			font-size: 0;
			-webkit-transition: -webkit-transform .3s ease;
			transition: transform .3s ease;
			-webkit-transform: translateY(120%);
			-ms-transform: translateY(120%);
			transform: translateY(120%);
			 background-color: rgba(0,0,0,0.8);
		}
		 .show {
				-webkit-transform: translateY(0);
				-ms-transform: translateY(0);
				/* transform: translateY(0); */
		}
		.settle .left{
			    display: inline-block;
			    width: 74%;
			    padding-left: 7rem;
			    box-sizing: border-box;
			    color: #fff;
			    font-size: 1rem;
			    background-color: rgba(0,0,0,0.8);
			    position: relative;
		}
		.settle .right{
			    display: inline-block;
			    width: 26%;
			    color: #fff;
			    font-size: 0.8rem;
			    text-align: center;
			    background-color: #E13F3F;
		}
		
		.settle .left .caret-icon{
				position: absolute;
			    left: 1.6rem;
			    bottom: -.4rem;
			    display: block;
			    width: 2.7rem;
			    height: 2.7rem;
			    text-align: center;
			    text-indent: 1em;
			    background: url(../../static/image/ic_gg_shop.png) 100% 0 no-repeat;
			    background-size: contain;
		}
		.caret-icon label  {
		    font-size: 0.8rem;
		    font-style: normal;
		    font-family: Arial;
		    padding: 0 0.4em;
		    background-color: #E13F3F;
		    border-radius: 65%/100%;
		}
		.settle .left .total-money{
			
		}
</style>
