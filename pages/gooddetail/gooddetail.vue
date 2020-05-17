<template>
	<view>
		<!-- 头部商品图片 -->
		<image class="goods-img" :class="{maiwan:  goods.maiwan }" :src="goods.defaultSourceImagePath" ></image>
		
		<!-- 商品信息 -->
		<view class="goods-info">
			<view class="goods-title">{{goods.name}}</view>
			<view class="txt-fav-icon">海韵优选</view>
			<view class="goods-price">
				<view class="price">￥{{goods.marketPrice}}</view>
				<view class="ever">
					<text>原价</text>
					<text class="originprice">￥{{goods.originalPrice}}</text>
					<label class="saleledlabel">已售<text class="saleled">{{goods.freezeStore}}</text></label>
				</view>
			</view>
		</view>
		
		<view class="spileline"><text></text></view>
		
		<view class="goods-menu">
			<view class="goods-menu-item">
				<view class="text1">月销<text class="text2">{{goods.monthSalesCount}}</text></view>
				<view class="text1">库存<text class="text2">{{goods.store-goods.freezeStore}}</text></view>
				<view class="text1">商品产地<text class="text2">{{goods.producingArea | nullFilter}}</text></view>
			</view>
			<view class="goods-menu-item">
				<text class="text2">{{goods.promotionInfo}}</text>
			</view>
			<view class="goods-menu-item">
				<text class="textwarn">提示</text><text class="text2">{{goods.promoteMessage}}</text>
			</view>
			<!-- <view class="goods-menu-item">
				<text class="text1">运费</text><text>平台免运费</text>
			</view> -->
		</view>
		
		<view class="spileline"></view>
		<!--  -->
		<view class="goods-shop">
			<view class="shop">海韵之友-{{supplier.companyName}}</view>
			<view class="dizi">地址：{{supplier.address}}</view>
			<view class="tel">联系电话：<text>{{supplier.contactPhone}}</text></view>
			<view class="tel">营业时间：<text>{{supplier.businessHours}}</text></view>
			<view class="btns">
				<view class="btn-kefu"><text>联系客服</text></view>
				<view class="btn-shop" @click="toShopDetail(supplier.id)"><text>进入店铺</text></view>
			</view>
		</view>
		<view class="spileline"></view>
		
		<!-- 产品介绍 -->
		<view class="goods-detail">
			 <view class="goods-detail-title">产品介绍</view>
			 <rich-text :nodes="nodes"></rich-text>
		</view>
		
		<view class="footer">
			<uni-goods-nav :fill="true"  :options="options" :button-group="buttonGroup"  @click="onClick" @buttonClick="buttonClick" ></uni-goods-nav>
		</view>
		<!-- 底部 -->
		<!-- <view class="footer">
			<view class="item total" @click="toCart">
				<view class="iconcart"> 
					<label class="count">0</label>
				</view>
			</view>
			<view class="item cart" @click="addCart">
				加入购物车
			</view>
			<view class="item buy">
				立即购买
			</view>
		</view> -->
	</view>
</template>

<script>
	import htmlParser from '@/common/utils/html-parser'
	import imgrouter from '@/common/utils/imgrouter'
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
	    components: {uniGoodsNav},
		data() {
			return {
				 options: [{
				          /* icon: '../../static/image/title_but_3_gray.png', */
						  icon: '../../static/unselectcart.png',
				          text: '',
						  info: 0
				        },
						{
				          icon: '',
				          text: '',
				        }, {
				          icon: '',
				          text: '',
				        }],
				        buttonGroup: [{
							
				          text: '加入购物车',
				          backgroundColor: '#ff0000',
				          color: '#fff',
						  id:1
				        },
				        {
				          text: '立即购买',
				          backgroundColor: '#ffa200',
				          color: '#fff',
						  id:2
				        }
				        ],
				nodes:[],
				
				goods:{
					name:'日常保洁月卡（4次每次3小时）',
					defaultSourceImagePath:'',//商品图片
					pid:1,
					marketPrice:2568.00,//市场价
					originalPrice:3000.00,//原价
					monthSalesCount:3,//月销
					store:50,//总库存
					freezeStore:20,//冻结库存
					producingArea:'青藏高原',//产地
					promoteMessage:'每次派1名家政人员工作3小时（100平米内）。办卡仅限同一地址使用',
					promotionInfo:'一张月卡可以使用四次',
					maiwan:false
					
				},
				supplier:{
					id:1,
					companyName:'’家政服务',
					address:'南宁市西乡塘区北湖南路28号',
					businessHours:'08:00-18:00',
					contactPhone:'15077144027',
					
				}
			}
		},
	   onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.goodId); //打印出上个页面传递的参数。
			var data ={id:option.goodId};
			this.getGoods(data);
			
		},
		onShow:function(){
			if(uni.getStorageSync('accessToken')!='undefined' && uni.getStorageSync('accessToken')!=null && uni.getStorageSync('accessToken')!=''){
				this.getCartNum();
			}
		},
		filters: {
			//空值过滤
		  nullFilter (value) {
			if(value==null || value=='null'){
				return '';
			}
		  },
		},
		methods: {
			//
			onClick (e) {
				this.toCart();
			  },
			  buttonClick (e) {
				 if(!this.goods.maiwan){
					 if(e.content.id==1){
					 		this.addCart();
					 }else if(e.content.id==2){
					 		this.toPreorder();
					 }
				 }else{
					 uni.showToast({
					     title: '商品库存不足',
					     duration: 2000
					 });
				 }
				
				//this.addCart();
			  },
			  getCartNum(){
			  	this.$api.getCartNum().then(res =>
			  			{
			  				if(res.code=='0000'){
								this.options[0].info = res.cartNum;
			  				}
			  			}); 
			  },
			//获取商品信息
			getGoods(data){
				this.$api.gooddetail(data).then(res =>
					{
						 console.log(JSON.stringify(res));
						  console.log(this.$config.imghosturl);
						if(res.code=='0000'){
							var regood = res.good;
							// regood.defaultSourceImagePath = this.$config.imghosturl+regood.defaultSourceImagePath;
							this.goods = res.good;
							this.supplier = regood.supplier;
							if(regood.isMaiwan==true){
								this.buttonGroup[1].backgroundColor="grey";
							}
							if(regood.introduction!=null){
								this.getData(regood.introduction);
							}
						}
					}); 
			},
			//添加构成车
			addCart(){
				if(uni.getStorageSync('accessToken')=='undefined' || uni.getStorageSync('accessToken')==null || uni.getStorageSync('accessToken')==''){				uni.navigateTo({url: '/pages/login/login'});
				}else{
					var data ={pid:this.goods.pid};
					console.log("data==="+JSON.stringify(data)); //打印出上个页面传递的参数。
					this.$api.ajaxAdd(data).then(res =>
						{
							 console.log(JSON.stringify(res));
							if(res.code=='0000'){
								this.options[0].info++;
								uni.showToast({
									title: '添加成功',
									duration: 2000
								});
							}else if(res.code=='0001'){
								uni.showToast({
									title: res.message,
									duration: 2000
								});
							}else{
								uni.showToast({
									title: '添加失败',
									duration: 2000
								});
							}
						}); 
					}
			},
			
			//跳转立即购买
			toPreorder() {
				if(uni.getStorageSync('accessToken')!='undefined' && uni.getStorageSync('accessToken')!=null && uni.getStorageSync('accessToken')!=''){				console.log("this.goods.isManwan==="+this.goods.isMaiwan)
					uni.navigateTo({
						 url: '/pages/preorder/preorder?pids='+this.goods.pid+'@@@&buyType=buyNow'
					})
				}else{
					uni.navigateTo({url: '/pages/login/login'});
				}
			},
			//跳转店铺详情页
			toShopDetail(shopId) {
				uni.navigateTo({
					 url: '/pages/shopdetail/shopdetail?shopId='+shopId
				})
			},
			//跳转购物车
			toCart() {
				uni.switchTab({
				    url: '/pages/carts/carts'
				});
			},
			//富文本
			getData(goodDetail){

				// var htmlString = content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
				//content = content.replace(/(<img [^>]*src=['"]?)(?!https?)(\/[^ '">]+)/g,"http://www.haiyunzy.com");
			/* 	if(goodDetail.indexOf('http://www.haiyunzy.com')== -1){
					goodDetail=goodDetail.replace(new RegExp(/src=\"/g), `style="display: block;margin: 0 auto;max-width: 100%" src="http://www.haiyunzy.com`);
				}else{
				goodDetail=goodDetail.replace(new RegExp(/src=\"/g), `style="display: block;margin: 0 auto;max-width: 100%" src="`);	
				} */
				this.nodes = htmlParser(goodDetail);
				//this.nodes =htmlNodes;
			},
			
			//
	
		}
	}
</script>

<style>
.goods-img {
    position: relative;
	width: 100%;
	height: 18rem;
	 margin: 0 auto;
}
.goods-info{
	background-color: #fff;
	padding: .6rem 1rem 1.6rem 1rem;
	border-top: 1px solid #E2E2E2;
	border-bottom: 1px solid #E2E2E2
}

.goods-info .goods-title{
	    font-size: 0.8rem;
	    color: #333;
	    font-weight: normal;
	    line-height: 0.8rem;
		padding: 7px 0;
}
  .txt-fav-icon{
  	    display: block;
  	    width: 100%;
  	    color: transparent;
  	    background: url(../../static/image/ic_gg_hyjx.png) 0 center no-repeat scroll;
  	    background-size: auto 13px;
  }
  
 .goods-info .goods-price{
	      position: relative;
	      font-family: Arial, 'microsoft yahei';
		  display: flex;
  }
  .goods-price .price {
      color: #E35450;
      font-size: 0.9rem;
  }
  
  .goods-price .ever {
      color: #999;
      font-size: 0.7rem;
      padding-left: 0.5em;
  }
  .goods-price .ever .originprice {
    text-decoration: line-through;
	margin-left: 0.1rem;
  }
  .goods-price .ever .saleledlabel{
	   margin-left: 1rem;
	   font-family: Arial, 'microsoft yahei';
	   color: #333333;
  }
.goods-price .ever  .saleled{
	  margin-left: 0.1rem;
	  font-family: Arial, 'microsoft yahei';
	  color: #333333;
  }
  
  
.maiwan:after {
    content: "商品已经卖光了~";
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
	height: 2rem;
	line-height: 2rem;
	color: #fff;
	font-size: 1rem;
    text-align: center;
    background-color: rgba(0,0,0,0.8);
}
.spileline{
	display: block;
	border-bottom: 8px solid rgb(204, 204, 204);
	width: 1rem;
	width: 100%;
}

.goods-menu{
	/* margin: .7rem 0; */
	padding: 0 1rem;
	background-color: #fff;
	border-top: 1px solid #E2E2E2;
	border-bottom: 1px solid #E2E2E2;
	font-family: Arial, 'microsoft yahei'
}

.goods-menu .goods-menu-item{
	    color: #000;
	    font-size: 0.7rem;
	    border-bottom: 1px solid #E3E3E3;
		display: flex;
		padding: 0.5rem 0.5rem 0.5rem 0.3rem;
}

.goods-menu-item .text1{
	display: inline-block;
	padding-right: 1.3rem;
	color: #85868A;
}
.goods-menu-item .textwarn{
	display: inline-block;
	padding-right: 0.1rem;
	width: 2.1rem;
	color: #85868A;
}
.goods-menu-item .text2{
	display: inline-block;
	padding-left: 0.3rem;
	color: red;
}

 .goods-shop{
	    /* margin: .7rem 0; */
	     padding: 0 1rem;
	     background-color: #fff;
	     border-top: 1px solid #E2E2E2;
	     border-bottom: 1px solid #E2E2E2;
	     font-family: Arial, "microsoft yahei";
		
 }
 .goods-shop .shop{
		 padding: 1.1rem 0 1.1rem 2rem;
		 border-bottom: 1px dashed #E4E4E4;
		 font-size: 0.8rem;
		 color: #333;
		 background: url(../../static/image/btn_dianming.png) 4px 50% no-repeat;
		 background-size: 1.3rem auto;
 }
 .goods-shop .dizi {
     color: #85868A;
     font-size:0.7rem;
     line-height: 1.6;
     padding: 5px 0;
 }
 .goods-shop .tel {
     color: #85868A;
     font-size: 0.7rem;
     line-height: 1.6;
     padding: 5px 0;
 }
.goods-shop .time {
    color: #85868A;
    font-size: 0.7rem;
    line-height: 1.6;
    padding: 5px 0;
}
.goods-shop .btns {
       padding: 1rem 0;
       font-size: 0;
}
	
.goods-shop .btns .btn-kefu{
	    box-sizing: border-box;
	    display: inline-block;
	    width: 48%;
	    text-align: center;
	    padding: 10px;
	    border: 1px solid #E3E3E3;
	    border-radius: 4px;
	    font-size: 0.7rem;
	    color: #717171;
}
.goods-shop .btns .btn-kefu text{
		padding-left: 20px;
		background: url(../../static/image/btn_kefu.png) 0 50% no-repeat;
		background-size: auto 14px;
}
.goods-shop .btns .btn-shop{
		box-sizing: border-box;
		display: inline-block;
		width: 48%;
		text-align: center;
		padding: 10px;
		border: 1px solid #E3E3E3;
		border-radius: 4px;
		font-size: 0.7rem;
		color: #717171;
}

.goods-shop .btns .btn-shop text{
	    padding-left: 20px;
	    background: url(../../static/image/btn_dianpu.png) 0 50% no-repeat;
	    background-size: auto 14px;
}


.goods-detail {
    border-bottom: 1px solid #E2E2E2;
    background-color: #fff;
    padding: 0 1rem;
    color: #666;
	 margin-bottom: 6rem;
}
.goods-detail .goods-detail-title{
	font-size: 0.8rem;
	padding: 1rem 1rem 1rem 0.1rem;
}
.goods-detail img{
	width: 100%;
	height: auto;
	overflow: hidden;
}


.panel{
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    width: 100%;
	    height: 100%;
}


.panel-buy{
	        -webkit-transition: background .25s;
	        transition: background .25s;
	        background-color: transparent;
	        z-index: 0;
	        -webkit-user-select: none;
}
.panel-buy{
	        -webkit-transition: background .25s;
	        transition: background .25s;
	        background-color: transparent;
	        z-index: 0;
	        -webkit-user-select: none;
}
.opened {
    z-index: 20;
    background-color: rgba(0,0,0,0.5);
}

.panel-buy .wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    -webkit-transition: -webkit-transform .3s ease;
    transition: transform .3s ease;
    -webkit-transform: translateY(110%);
    -ms-transform: translateY(110%);
    transform: translateY(110%);
}
.panel-buy .wrap .nth {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin: 0 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #DBDBDB;
}
.panel-buy .wrap .btm {
    margin: 0 1rem;
    padding: 1rem 0;
    position: relative;
}
.panel-buy .wrap .btm label {
    display: inline-block;
    width: 50%;
    font-weight: normal;
    font-size: 1.3rem;
    color: #858688;
    line-height: 3rem;
}
.panel-buy .wrap .btm .minus {
    background: url(../../static/image/but_1_minus_light.png) 50% 50% no-repeat;
    background-size: auto 2.8rem;
}
.panel-buy .wrap .btm .goodsNum {
    width: 46px;
    height: 2.6rem;
    border: 1px solid #DBDBDB;
    border-radius: 0;
    padding: 0 6px;
    font-size: 1.3rem;
    vertical-align: bottom;
    text-align: center;
    outline: none;
    -webkit-appearance: none;
}
.panel-buy .wrap .btm .plus {
    display: inline-block;
    height: 2.8rem;
    width: 3rem;
    color: transparent;
    font-size: 1.2rem;
	background: url(../../static/image/but_1_add_light.png) 50% 50% no-repeat;
	background-size: auto 2.8rem;
}
.panel-buy .wrap .btn-buy {
    display: block;
    border: none;
    -webkit-appearance: none;
    height: 4rem;
    line-height: 4rem;
    width: 100%;
    color: #fff;
    font-size: 1.4rem;
    background-color: #E35151;
}
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    width: 100%;
    height: 2.8rem;
    line-height: 2.8rem;
    font-size: 0;
}
.footer .item{
	    display: inline-block;
	    width: 33%;
	    font-size: 1rem;
	    color: #fff;
	    text-align: center;
	    float: left;
}
.footer .total{
	background-color: #262626;
	font-family: Arial, 'microsoft yahei';
	font-size: 0;
}

.footer .item .iconcart{
	    vertical-align: top;
	    display: inline-block;
	    font-size: 0.7rem;
	    width: 30%;
	    background-size: 23px auto;
	    position: relative;
}

.footer .iconcart .count{
	    display: block;
	    min-width: 16px;
	    text-align: center;
		margin-left: 1.5rem;
		margin-top: -0.5rem;

}

.footer .cart{
	   background-color: rgb(204, 204, 204);
}

.footer  .buy{
	background-color: rgb(170, 170, 170);
}


</style>
