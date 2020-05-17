<template>
	<view>
		<view class="flex">
			<view v-if="themeType==1" class="body zone1">
					
					<view class="adlist">
							<uni-swiper-dot  :current="current" field="content" :mode="mode" class="uni-swiper-dot_class">
							    <swiper class="swiper-box" @change="change" :autoplay="autoplay" :interval="interval" :duration="duration">
							        <swiper-item>
							            <view class="swiper-item">
											<!-- <image src="../../static/image/banner_1.png"></image> -->
							            </view>
							        </swiper-item>
							    </swiper>
							</uni-swiper-dot>
					</view>
					
					<view class="link">
						<view class="wrap over" v-for="(item,index) in goodList" :key="index" @click="toGoodsDetail(item.id)">
							<text class="tags"></text>
							<view class="good goodbefore">
								<view class="img">
									<image :src="item.defaultSourceImagePath" ></image>
								</view>
								<view class="txt-normal">
									 {{item.name}}
								</view>
								<view class="price">
									  ￥{{item.marketPrice}} 
								</view>
								<!-- <view class="addToCaret">添加购物车</view> -->
							</view>
						</view>
					
					
				</view>
			</view>
			
			
			<view v-if="themeType==2" class="body zone2">
					<view class="adlist">
							<uni-swiper-dot  :current="current" field="content" :mode="mode" class="uni-swiper-dot_class">
							    <swiper class="swiper-box" @change="change" :autoplay="autoplay" :interval="interval" :duration="duration">
							        <swiper-item>
							            <view class="swiper-item">
											<!-- <image src="../../static/image/banner_2.png"></image> -->
							            </view>
							        </swiper-item>
							    </swiper>
							</uni-swiper-dot>
					</view>
				
					<view class="link">
						<view class="wrap over" v-for="(item,index) in goodList" :key="index" @click="toGoodsDetail(item.id)">
							<text class="tags"></text>
							<view class="good goodbefore">
								<view class="img">
									<image :src="item.defaultSourceImagePath" ></image>
								</view>
								<view class="txt-normal">
									 {{item.name}}
								</view>
								<view class="price">
									  ￥{{item.marketPrice}} 
								</view>
								<!-- <view class="addToCaret">添加购物车</view> -->
							</view>
						</view>
					
					
				</view>
			</view>
			
			
			<view v-if="themeType==3" class="body zone3">
					<view class="adlist">
							<uni-swiper-dot  :current="current" field="content" :mode="mode" class="uni-swiper-dot_class">
							    <swiper class="swiper-box" @change="change" :autoplay="autoplay" :interval="interval" :duration="duration">
							        <swiper-item>
							            <view class="swiper-item">
										<!-- 	<image src="../../static/image/banner_3.png"></image> -->
							            </view>
							        </swiper-item>
							    </swiper>
							</uni-swiper-dot>
					</view>
					
					<view class="link">
						<view class="wrap over" v-for="(item,index) in goodList" :key="index" @click="toGoodsDetail(item.id)">
							<text class="tags"></text>
							<view class="good goodbefore">
								<view class="img">
									<image :src="item.defaultSourceImagePath" ></image>
								</view>
								<view class="txt-normal">
									 {{item.name}}
								</view>
								<view class="price">
									  ￥{{item.marketPrice}} 
								</view>
								<!-- <view class="addToCaret">添加购物车</view> -->
							</view>
						</view>
					
					
				</view>
			</view>
			
			
			<view v-if="themeType==4" class="body zone4">
					<view class="adlist">
							<uni-swiper-dot  :current="current" field="content" :mode="mode" class="uni-swiper-dot_class">
							    <swiper class="swiper-box" @change="change" :autoplay="autoplay" :interval="interval" :duration="duration">
							        <swiper-item>
							            <view class="swiper-item">
											<!-- <image src="../../static/image/banner_4.png"></image> -->
							            </view>
							        </swiper-item>
							    </swiper>
							</uni-swiper-dot>
					</view>
					
					<view class="link">
						<view class="wrap over" v-for="(item,index) in goodList" :key="index" @click="toGoodsDetail(item.id)">
							<text class="tags"></text>
							<view class="good goodbefore">
								<view class="img">
									<image :src="item.defaultSourceImagePath" ></image>
								</view>
								<view class="txt-normal">
									 {{item.name}}
								</view>
								<view class="price">
									  ￥{{item.marketPrice}} 
								</view>
								<!-- <view class="addToCaret">添加购物车</view> -->
							</view>
						</view>
					
					
				</view>
			</view>
			
			
			<view v-if="themeType==5" class="body zone5">
					<view class="adlist">
							<uni-swiper-dot  :current="current" field="content" :mode="mode" class="uni-swiper-dot_class">
							    <swiper class="swiper-box" @change="change" :autoplay="autoplay" :interval="interval" :duration="duration">
							        <swiper-item>
							            <view class="swiper-item">
											<!-- <image src="../../static/image/banner_5.png"></image> -->
							            </view>
							        </swiper-item>
							    </swiper>
							</uni-swiper-dot>
					</view>
					
					<view class="link">
						<view class="wrap over" v-for="(item,index) in goodList" :key="index" @click="toGoodsDetail(item.id)">
							<text class="tags"></text>
							<view class="good goodbefore">
								<view class="img">
									<image :src="item.imgUrl" ></image>
								</view>
								<view class="txt-normal">
									 {{item.name}}
								</view>
								<view class="price">
									  ￥{{item.marketPrice}} 
								</view>
								<!-- <view class="addToCaret">添加购物车</view> -->
							</view>
						</view>
					
					
				</view>
			</view>
			
			
			<backTop :src="backTop.src"  :scrollTop="backTop.scrollTop"></backTop>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue";
	import backTop from '@/components/back-top/back-top.vue';
	export default {
		components: {
			uniSwiperDot,
			backTop
			// tabBar
		},
		data() {
			return {
				current: 0,//广告列表属性
				mode: 'dot',//广告列表属性
				autoplay: true,
				interval: 2500,
				duration: 500,
				pid:null,
				themeType:0,
				goodList:[],
				queryData:{
					pageNo: 1,//商品列表 页码
					pageSize:10,
					totalPage: 0,//商品列表总页数
					pid:'',
				},
				
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				scrollTop: 0
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
					console.log(option); //打印出上个页面传递的参数。
					this.pid = option.pid;
					this.themeType = option.themeType;
					this.queryData.pid=option.pid;
					// this.getGoods(data);
					
				},
		onShow:function(){
			if(this.pid!=null && this.pid!=''){
				this.getGoodlistByPid(this.queryData,true)
			}
		},
		methods: {
			//跳转商品详情情页
			toGoodsDetail(goodId) {
				uni.navigateTo({
					 url: '/pages/gooddetail/gooddetail?goodId='+goodId
				})
			},
			
			//异步获取商品列表
			async getGoodlistByPid(data,first) {
				console.log(JSON.stringify(data));
			    let result = await this.$api.getGoodlistByPid(data);
				console.log(JSON.stringify(result));
			    if(result.code != '0000') return;
			    this.queryData.totalPage = result.total;
				let list = result.list;
			   list.forEach(p => p.imgUrl = this.$config.imghosturl+p.imgUrl);
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
		    this.getGoodlistByPid(this.queryData,true);
		   
			 setTimeout(function () {
			            uni.stopPullDownRefresh();
			        }, 500);
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
		    this.getGoodlistByPid(this.queryData,false);
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
.zone1 .link {
    background-color: #673bb8;
}

  .link:after {
    content: '';
    display: table;
    clear: both; }
  .link .wrap {
    font-size: 1.2rem;
    padding: 0.5rem;
    box-sizing: border-box;
    width: 50%;
    display: inline-block;
    position: relative;
    min-height: 13.5rem;
    vertical-align: top; }
    .link .wrap .good {
      padding: 1rem;
      background-color: #fff; }
      .link .wrap .good .img {
        text-align: center;
        margin: 0 auto 0.3rem auto;
        height: 6rem; 
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
            -ms-flex-align: center;
                align-items: center;
        overflow: hidden; }
        .link .wrap .good .img image {
          max-width: 12rem;
          max-height: 100%; }
      .link .wrap .good .txt-normal {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #666; 
            font-size: 0.8rem;
            height: 2rem;
            line-height: 2rem;
		}
      .link .wrap .good .txt-fav {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: #666; }
      .txt-fav-icon {
        display: block;
        width: 100%;
        color: transparent;
        background: url(../../static/image/ic_gg_hyjx.png) 0 center no-repeat scroll;
        background-size: auto 13px; }
      .goods-info .txt-fav-icon {
        margin-top: -7px; }
      .link .wrap .good .price {
        line-height: 2rem;
        font-family: Arial;
        color: #F24335;
		  font-size: 0.8rem;
	 }
    .link .wrap .tags {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem; }
      .link .wrap .tags i {
        display: block;
        float: left;
        width: 3rem;
        height: 3.5rem;
        color: #FFF;
        text-align: center;
        font-size: 1rem;
        font-style: normal;
        font-weight: bold; }
     
    
    .link .wrap.over .good {
      position: relative; }
     /* .link .wrap.over .good:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(../../static/image/ic_hdzt_qgl.png) 50% 35% no-repeat rgba(0, 0, 0, 0.3);
        background-size: 6.75rem auto; } */
  .addToCaret {
    display: block;
    color: transparent;
    position: absolute;
    height: 24px;
    width: 24px;
    right: 1.5rem;
    bottom: 1.5rem;
    background: url(../../static/image/btn_gg_tj_normal.png) 100% 100% no-repeat scroll;
    background-size: 24px 24px; }
    .addToCaret.disabled {
     /* background: url(../../static/image/btn_gg_tj_disabled.png) 100% 100% no-repeat scroll; */
      background-size: 24px 24px; }
	  
	  .link .wrap.over .goodbefore:before {
	      content: '';
	      display: block;
	      position: absolute;
	      top: 0;
	      left: 0;
	      right: 0;
	      bottom: 0;
	      background: url(../../static/image/ic_hdzt_qgl.png) 50% 35% no-repeat rgba(0, 0, 0, 0.3);
	      background-size: 4.75rem auto;
		      z-index: 2;
	  }
	  
	  .zone1 .link {
	    background-color: #673bb8; }
	  
	  .zone2 .link {
	    background-color: #95c023; }
	  
	  .zone3 .link {
	    background-color: #1f96f3; }
	  
	  .zone4 .link {
	    background-color: #fe5722; }
	  
	  .zone5 .link {
	    background-color: #fec10a; }
		
		.adlist{
			height: 100%;
		}
		.adlist image{
			height: 150px;
			width: 100%;
		}
</style>
