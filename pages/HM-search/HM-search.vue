<template>
	<view class="content">
		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<mSearch class="mSearch-input-box" :mode="2" button="inside" @touchstart="sboxblur" :placeholder="defaultKeyword" @search="doSearch(false)" @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch>
			<!-- 原样式 如果使用原样式，恢复下方注销代码 -->
			<!-- 			
			<view class="input-box">
				<input type="text" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
				 placeholder-class="placeholder-class" confirm-type="search">
			</view>
			<view class="search-btn" @tap="doSearch(false)">搜索</view> 
			-->
			<!-- 原样式 end -->
		</view>
		<view class="search-keyword" @touchstart="blur"   v-show="shSearchbox">
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
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'/static/HM-search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 商品列表 -->
		<view class="goods_list" v-show="goodslistbox">
			<view class="container999" >
				<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
			</view>
			<view class="goodlist">
				<view class="gooditem" v-for="(item,index) in goodList" :key="index"  @click="toGoodsDetail(item.id)">
					<view class="goodimgbox"><image class="goodimg" :src="item.defaultSourceImagePath" ></image></view>
					<view class="goodinfobox">
						<view class="goodname">{{item.name}}</view>
						<view class="priceinfo">
							<view class="goodsales">已售 <text>{{item.freezeStore}}</text></view>
							<view class="goodprice">￥{{item.marketPrice}} <text class="originprice">原价 ￥{{item.originalPrice}}</text></view>
						</view>
					</view>
				</view>
				<view v-if="goodList==null || goodList.length==0" class="nonegoods">~暂无搜索结果哦，请换个关键词试试看吧~

</view>
			</view>
		</view>
		
		<backTop :src="backTop.src"  :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import navTab from "@/components/navTab.vue";
	import backTop from '@/components/back-top/back-top.vue';
	export default {
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch,navTab,backTop
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
				goodslistbox:false,
				shSearchbox:true,
				
				 currentTab: 0, //sweiper所在页
				 tabTitle:['默认','热门','新品','促销','优选'], //导航栏格式
				 goodList:[],
				 queryData:{
				 	pageNo: 1,//商品列表 页码
					pageSize:10,
				 	totalPage: 0,//商品列表总页数
					
					
				 	isHot:'',//热门
					isNew:'',//新品
					isDiscount:'',//促销
					isSelect:'',//优选
					keyword:'',//搜索关键字
				 },
				 
				 backTop: {
				 	src: '../../static/back-top/top.png',
				 	scrollTop: 0
				 },
				 scrollTop: 0
				 
			}
		},
		onLoad(option) {
			this.init();
			if(option.keyword!=null && option.keyword!=undefined && option.keyword!=''){
				this.doSearch(option.keyword);
			}
			
		},
		filters: {
			//空值过滤
		  nullPriceFilter (value) {
			if(value==null || value=='null'){
				return '';
			}
		  },
		},
		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();

			},
			//跳转商品详情情页
			toGoodsDetail(goodId) {
				uni.navigateTo({
					 url: '/pages/gooddetail/gooddetail?goodId='+goodId
				})
			},
			//选择分类
		   changeTab(index){
				this.currentTab = index;
				//'热门','新品','促销','优选'
				//isHot  isNew   isDiscount isSelect
				if(index==0){
					this.queryData.isHot = '';
					this.queryData.isNew = '';
					this.queryData.isDiscount = '';
					this.queryData.isSelect = '';
				}
				if(index==1){
					this.queryData.isHot = 1;
					this.queryData.isNew = '';
					this.queryData.isDiscount = '';
					this.queryData.isSelect = '';
				}
				if(index==2){
					this.queryData.isHot = '';
					this.queryData.isNew = 1;
					this.queryData.isDiscount = '';
					this.queryData.isSelect = '';
				}
				if(index==3){
					this.queryData.isHot = '';
					this.queryData.isNew = '';
					this.queryData.isDiscount =1;
					this.queryData.isSelect = '';
				}
				if(index==4){
					this.queryData.isHot = '';
					this.queryData.isNew = '';
					this.queryData.isDiscount = '';
					this.queryData.isSelect = 1;
				}
				this.queryData.pageNo=1;
				this.getGoodlistByKeyword(this.queryData,true);
			},
			// swiper 滑动 如果tab关联swiper需要写下面的方法 否则不写
			//swiperTab: function(e) {
//
			//			this.$refs.navTab.longClick(index);
			//		},
			//},
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
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['海韵玉香丝', '芒果', '九百万矿泉水', '今世缘', '香脆小吃', '家政', '牛肉', '香蕉', '草莓'];
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
								key: 'OldKeys'
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
				this.goodslistbox = false;
				this.shSearchbox = true;
				this.forbid = '';//显示关键字列表
			},
			//执行搜索
			doSearch(key) {
				key = key ? key : this.keyword ? this.keyword : this.defaultKeyword;
				this.keyword = key;
				this.saveKeyword(key); //保存为历史 
				
				
				
				//关闭热门搜索、搜索列表 并显示商品列表
				//this.forbid = '_forbid';
				//this.isShowKeywordList = false;
				this.goodslistbox = true;
				this.shSearchbox = false;
				this.queryData.keyword = key;
				this.getGoodlistByKeyword(this.queryData,true);
				//以下是示例跳转淘宝搜索，可自己实现搜索逻辑
				//#ifdef APP-PLUS
				//plus.runtime.openURL(encodeURI('taobao://s.taobao.com/search?q=' + key));
				//#endif
				//#ifdef H5
				//window.location.href = 'taobao://s.taobao.com/search?q=' + key
				//#endif
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						console.log(res.data);
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			},
			//异步获取商品列表
			async getGoodlistByKeyword (data,first) {
				
				console.log(JSON.stringify(data));
			    let result = await this.$api.getGoodlistByKeyword(data);
				console.log(JSON.stringify(result));
			    if(result.code != '0000') return;
			    this.queryData.totalPage = result.total;
				let list = result.list;
			   list.forEach(p => p.defaultSourceImagePath = this.$config.imghosturl+p.defaultSourceImagePath);
			   //console.log("result.list=="+JSON.stringify(result.list));
			   if(first) {//是否是刷新 或者第一次加载
			       this.goodList = list ;
			   } else {
			       this.goodList = this.goodList.concat(list);
			   }
			},
			
			
			
			
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		onPullDownRefresh(){//下拉刷新
		    this.queryData.pageNo = 1;
		    this.queryData.totalPage = 0;
		    this.getGoodlistByKeyword(this.queryData,true);
			try {
			    uni.stopPullDownRefresh();
			} catch (e) {
			    // error
			}
		   
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
		    this.getGoodlistByKeyword(this.queryData,false);
		}
	}
</script>
<style>
	
	view{display:block;}
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
	
	.content{
		background:#fff;
	}
	
	.goods_list{
		/* z-index: 9999; */
	}
	.showsClass{
		display: block;
	}
	.hidesClass{
		display: none;
	}
	
	.goodlist{
		z-index: 9999;
	}
	.nonegoods{
		    text-align: center;
		    margin-top: 2rem;
		    font-size: 0.8rem;
		    display: block;
	}
	.gooditem{
		display: flex;
		padding: 0.1rem;
		border-bottom: 1px solid lightgrey;
	}
	.goodimgbox{
		display: flex;
		-webkit-justify-content: center;
		justify-content: center;
		flex: 2;
		align-items: center;
	}
	.goodimgbox .goodimg{
		width:100%;
		height: 5rem;
		overflow: hidden;
		display: flex;
		padding: 0.1rem;
	}
	.goodinfobox{
		padding: 0.5rem;
		position: relative;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 3;
	}
	.goodname{
		font-size: 0.8rem;
	}
	.priceinfo{
		font-size: 0.7rem;
		color: red;
		display: block;
		position: absolute;
		bottom: 0;
		
	}
	.goodprice{
			
	}
	.originprice{
			text-decoration: line-through;
			margin-left: 0.1rem;
			font-size: 0.7rem;
			color: lightgrey;
	}
	.goodsales{
		font-size: 0.6rem;
		color: black;
	}
	
</style>
