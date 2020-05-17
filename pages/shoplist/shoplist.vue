<template>
	<view class="page">
		
			<!-- 头部 -->
			<view class="header1">
				<view class="lbs-btn" @click="getLocationInfo">
					<text>{{address}}</text>
				</view>
			</view>
			<view class="search-box">
				<!-- mSearch组件 如果使用原样式，删除组件元素-->
				<mSearch class="mSearch-input-box" :mode="2" button="inside" @touchstart="sboxblur" :placeholder="defaultKeyword" @search="doSearch(false)" @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch>
			</view>
			<!-- 搜索关键字 -->
			<!-- <view class="search-keyword" @touchstart="blur"   v-show="shSearchbox">
				<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
					<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="row in keywordList" :key="row.keyword">
						<view class="keyword-text" @tap="doSearch(row.keyword)">
							<rich-text :nodes="row.htmlStr"></rich-text>
						</view>
						<view class="keyword-img" @tap="setkeyword(row)">
							<image src="/static/HM-search/back.png"></image>
						</view>
					</view>
				</scroll-view>
				<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
					<view class="keyword-block" v-if="oldKeywordList.length>0">
						<view class="keyword-list-header">
							<view>历史搜索</view>
							<view>
								<image @tap="oldDelete" src="/static/HM-search/delete.png"></image>
							</view>
						</view>
						<view class="keyword">
							<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
						</view>
					</view>
				</scroll-view>
			</view> -->
			
			<!-- 店铺列表 -->
			<view class="allshop" v-show="goodslistbox">
				<view class="shoplist" v-for="(item,index) in supplierList" :key="index" @click="toShopDetail(item.id)">
					
					<view class="shop_img"><image class="shop_img_in" :src="item.supplierImg"></image></view>
					<view class="shop_info">
						<view class="shop_name">{{item.storeName}}</view>
						<view class="shop_busnesstime">服务时间：{{item.businessHours}}</view>
						<view class="shop_address">地址:{{item.address}}</view>
						<view class="shop_tel">电话:{{item.contactPhone}}</view>
						<view class="shop_distance">{{item.disatance}}m</view>
					</view>
					<view class="shop_go">
						<!-- <label class="shop_go_i">箭头</label> -->
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
				    		<view class="menu active" @click="shoplist"> 
				      			<view id="fujin">
									<span class="menu-icon menu-icon2"></span>
									<view>附近小店</view>
								</view>
				    		</view>
				    		<view class="menu gwc"  @click="toCart" >
				      			<view id="gouwu">
				        			<span class="menu-icon menu-icon3"></span>
									<div>购物车</div>
									<span  id="headerCarItemQuantity" class="count"></span>
				      			</view>
				    		</view>
				     		
							<view class="menu"  @click="toMyCenter">
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
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import backTop from '@/components/back-top/back-top.vue';
	export default {
		components: {
			// tabBar
			backTop,mSearch
		},
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],//历史搜索
				hotKeywordList: [],//热门搜索
				keywordList: [],
				forbid: '',//关键字列表
				isShowKeywordList: false,
				goodslistbox:true,
				shSearchbox:true,
				
				// currentPage:'shoplist',
				address:'海韵之友',
				longitude:'',
				latitude:'',
				supplierList:[],
				
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				scrollTop: 0,
				queryData:{
					name:'',
					pageNo: 1,//商品列表 页码
					pageSize:15,
					totalPage: 0,//商品列表总页数
					lng:108.31921622874788,
					lat:22.84313111680098
				},
			}
		},
		onLoad(){
			this.getLocationInfo();
		},
		onShow:function(){
			this.getshopList(this.queryData,true);
			//this.getshopList(this.queryData,true);
		},
		methods: {
			
			//定位到当前位置
			async getLocationInfo(){
				// uni.showLoading({
				//     title: '定位中...'
				// });
				var that = this;
				let result = await uni.getLocation({
				    type: 'wgs84',
					geocode:true,
				    success: function (res) {
							 console.log('当前位置的经度：' + JSON.stringify(res));
						// that.longitude = res.longitude;
						// that.latitude = res.latitude;
						that.queryData.lng = res.longitude;
						that.queryData.lat = res.latitude;
						//var address = res.address.street+res.address.streetNum;
						var address = res.address.street;
						that.address = address;
						uni.hideLoading()
						that.getshopList(that.queryData,true);
					
					},
					fail:function(){
						uni.hideLoading()
						
				    },complete:function(){
						uni.hideLoading()
					}
					
				});
				
			},
			//获取附近小店列表
			/* getshopList(data){
				 console.log("data==="+JSON.stringify(data));
				this.$api.shoplist(data).then(res =>
					{
						 console.log(JSON.stringify(res));
						 console.log("data==="+JSON.stringify(res.list));
						  console.log(this.$config.imghosturl);
						if(res.list!=null){
							var list = res.list;
							//list.forEach(p => p.supplierImg = this.$config.imghosturl+p.supplierImg);
							this.supplierList = list;
						}
						
					}); 
			}, */
			async getshopList (data,first) {
				
				console.log(JSON.stringify(data));
			    let result = await this.$api.shoplist(data);
				console.log(JSON.stringify(result));
			    if(result.code != '0000' || result.list==null || result.list.length==0) return;
			    this.queryData.totalPage = result.total;
				let list = result.list;
			   // list.forEach(p => p.supplierImg = this.$config.imghosturl+p.supplierImg);
			   //console.log("result.list=="+JSON.stringify(result.list));
			   if(first) {//是否是刷新 或者第一次加载
			       this.supplierList = list ;
			   } else {
			       this.supplierList = this.supplierList.concat(list);
			   }
			},
			//跳转店铺详情页
			toShopDetail(shopId) {
				uni.navigateTo({
					 url: '/pages/shopdetail/shopdetail?shopId='+shopId
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
			
			
			
			blur(){
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "真龙";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys_shop_shop_shop',
					success: (res) => {
						var OldKeys_shop_shop = JSON.parse(res.data);
						this.oldKeywordList = OldKeys_shop_shop;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['海韵', '家政'];
			}, 
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail?event.detail.value:event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				this.keywordList = [];
				//以下示例截取淘宝的关键字，请替换成你的接口
				//uni.request({
				//	url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + keyword, //仅为示例
				//	success: (res) => {
				//		this.keywordList = this.drawCorrelativeKeyword(res.data.result, keyword);
				//	}
				//});
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys_shop_shop'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//搜索框获取焦点
			sboxblur(){
				this.goodslistbox = true;
				this.shSearchbox = true;
				this.forbid = '';//显示关键字列表
			},
			//执行搜索
			doSearch(key) {
				key = key ? key : this.keyword ? this.keyword : this.defaultKeyword;
				this.queryData.name = key;
				this.saveKeyword(key); //保存为历史 
				this.goodslistbox = true;
				this.shSearchbox = false;
				this.getshopList(this.queryData,true);
				
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys_shop',
					success: (res) => {
						console.log(res.data);
						var OldKeys_shop = JSON.parse(res.data);
						var findIndex = OldKeys_shop.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys_shop.unshift(keyword);
						} else {
							OldKeys_shop.splice(findIndex, 1);
							OldKeys_shop.unshift(keyword);
						}
						//最多10个纪录
						OldKeys_shop.length > 10 && OldKeys_shop.pop();
						uni.setStorage({
							key: 'OldKeys_shop',
							data: JSON.stringify(OldKeys_shop)
						});
						this.oldKeywordList = OldKeys_shop; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys_shop = [keyword];
						uni.setStorage({
							key: 'OldKeys_shop',
							data: JSON.stringify(OldKeys_shop)
						});
						this.oldKeywordList = OldKeys_shop; //更新历史搜索
					}
				});
			},
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		 onPullDownRefresh() {
			 // let data ={
			 // 	lng:that.longitude,
			 // 	lat:that.latitude
			 // };
			 //  this.getshopList(data);
			 this.queryData.pageNo = 1;
			 this.queryData.totalPage = 0;
			 this.getshopList(this.queryData,true);
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
		      this.getshopList(this.queryData,false);
		  }
		   
	}
</script>

<style lang="scss">
	.page{
		background:#fff;
	}
	.header1{
		     /* background-color: #E13F3F; */
			 background-color: #1195db;
		     height: 2rem;
		     line-height: 2rem;
		     padding: 0 1.6rem;
		     color: #fff;
		     font-size: 0.7rem;
		     position: relative;
	}
	.lbs-btn{
		    color: #fff;
		    display: inline-block;
		    height: 2rem;
		    line-height: 2rem;
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
	.allshop{
		padding: 0rem 1rem;
		margin-bottom: 5rem;
	}
	.shoplist{
		display: flex;
		padding: 1rem 0rem;
		border-bottom: 1px solid lightgray;
	}
/* 	.shoplist .shop_img{
		flex: 1;
	} */
	.shop_img_in{
		width: 2.5rem;
		height: 2.5rem;
		margin-top:0.5rem;
		border-radius:50%;
	}
	.shoplist .shop_info{
		padding-left: 0.3rem;
		flex: 2;
	}
	.shoplist .shop_name{
		font-size: 0.7rem;
		font-weight: 5rem;
		font-weight: bold;
	}
	.shoplist .shop_info .shop_busnesstime{
		    color: #AAD122;
		    font-family: Arial, 'microsoft yahei';
		    padding-left: 16px;
		    background: url(../../static/image/ic_fj_time.png) 0 50% no-repeat;
		    background-size: 12px 12px;
			font-size: 0.7rem
	}
	.shoplist .shop_info .shop_address{
		color: #999999;
		font-family: Arial, 'microsoft yahei';
		font-size: 0.7rem
	}
   .shoplist .shop_info .shop_tel{
		color: #999999;
		font-family: Arial, 'microsoft yahei';
		font-size: 0.7rem
   }
   .shoplist .shop_info .shop_distance{
   	    color: #ED6B2C;
   	    float: right;
   	    padding-left: 15px;
   	    background: url(../../static/image/ic_fj_position.png) 0 40% no-repeat;
   	    background-size: 12px 12px;
		display: block;
		margin-top: -2.7rem;
		margin-right: -4.3rem;
   }
  .shop_go{
  	       width: 40px;
  	       /* border-bottom: 1px solid #EBEBEB; */
		   flex: 1;
  }
    .shop_go label{
		   background: url(../../static/image/ic_fj_arrow.png) 50% 50% no-repeat;
		   background-size: 5.5px 16.5px;
		   color: transparent;
		   display: block;
		   margin-top: 1.1rem;
		   /* margin-right: -3.2rem; */
		   margin-top: 1.1rem;
		   float: right;
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
		
		
		.search-box {width:95%;background-color:rgb(242,242,242);padding:15upx 2.5%;display:flex;justify-content:space-between;}
		.search-box .mSearch-input-box{width: 100%;}
		.search-box .input-box {width:85%;flex-shrink:1;display:flex;justify-content:center;align-items:center;}
		.search-box .search-btn {width:15%;margin:0 0 0 2%;display:flex;justify-content:center;align-items:center;flex-shrink:0;font-size:28upx;color:#fff;background:linear-gradient(to right,#ff9801,#ff570a);border-radius:60upx;}
		.search-box .input-box>input {width:100%;height:60upx;font-size:32upx;border:0;border-radius:60upx;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0 3%;margin:0;background-color:#ffffff;}
		.placeholder-class {color:#9e9e9e;}
		.search-keyword {width:100%;background-color:rgb(242,242,242);}
		.keyword-list-box {height:calc(100vh - 110upx);padding-top:10upx;border-radius:20upx 20upx 0 0;background-color:#fff;}
		.keyword-entry-tap {background-color:#eee;}
		.keyword-entry {width:94%;height:80upx;margin:0 3%;font-size:30upx;color:#333;display:flex;justify-content:space-between;align-items:center;border-bottom:solid 1upx #e7e7e7;}
		.keyword-entry image {width:60upx;height:60upx;}
		.keyword-entry .keyword-text,.keyword-entry .keyword-img {height:80upx;display:flex;align-items:center;}
		.keyword-entry .keyword-text {width:90%;}
		.keyword-entry .keyword-img {width:10%;justify-content:center;}
		.keyword-box {height:calc(100vh - 110upx);border-radius:20upx 20upx 0 0;background-color:#fff;}
		.keyword-box .keyword-block {padding:10upx 0;}
		.keyword-box .keyword-block .keyword-list-header {width:94%;padding:10upx 3%;font-size:27upx;color:#333;display:flex;justify-content:space-between;}
		.keyword-box .keyword-block .keyword-list-header image {width:40upx;height:40upx;}
		.keyword-box .keyword-block .keyword {width:94%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
		.keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:28upx;color:#6b6b6b;}
		.keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:60upx;padding:0 20upx;margin:10upx 20upx 10upx 0;height:60upx;font-size:28upx;background-color:rgb(242,242,242);color:#6b6b6b;}
</style>
