<template>
	<view>
		<!-- 商品搜索-->
		 
		 <view class="search">
			<input  placeholder="搜索商品" placeholder-class="holderclass"/>
		</view>
		<view class="modal-search">
			<view class="search-hot">
				<view class="hottitle">热门搜索</view>
				<view class="hotwords">
					<view class="hotitem">海韵玉丝香</view>
					<view class="hotitem">九百万</view>
					<view class="hotitem">牛排</view>
					<view class="hotitem">杨桃</view>
					<view class="hotitem">芒果</view>
					<view class="hotitem">小吃</view>
					<view class="hotitem">酒水</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
		    border-radius: 26px;
		    font-size: 0.7rem;
	}
	.modal-search{
		    position: absolute;
		    z-index: 1000;
		    top: 3rem;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    overflow: auto;
		    -webkit-overflow-scrolling: touch;
		    background-color: rgba(255,255,255,.95);
	}
	.search-hot{
		padding: 0 0 1rem 1.3rem;
		/* border-bottom: 1px solid #d2d2d2; */
	}
	.hottitle{
		padding-left: 1.2rem;
		height: 2rem;
		line-height: 2rem;
		color: #999;
		border-bottom: 1px solid #EBEBEB;
		background: url(../../static/image/ic_search_hot.png) 0 50% no-repeat;
		background-size: 1rem auto;
		 font-size: 1rem;
		
	}
	.hotwords{
			padding: 0 0 1rem 1.6rem;
			border-bottom: 1px solid #d2d2d2;
		}
		.hotwords .hotitem {
		    font-size: 0.7rem;
		    display: inline-block;
		    padding: 0.2rem 1.2rem;
		    margin: .3rem .5rem .5rem 0;
		    border-radius: 1.3rem;
		    border: 1px solid #DDD;
		    color: #666;
		}
</style>
