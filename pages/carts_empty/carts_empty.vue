<template>
	<view class="container">
		<view class="content">
			<view class="uni-cart-imgbox">
				<image class="uni-cart-img" src="../../static/image/pic_gw_k.png"></image>
			</view>
			<view class="uni-cart-text1">您的购物车空空哒~</view>
			<view class="uni-cart-btn" @click="goToIndex"><text class="uni-cart-text1">首页逛逛</text></view>
		</view>
		<!-- <view class="container999">
			<tabBar :currentPage="currentPage"></tabBar>
		</view> -->
	</view>
</template>

<script>
	// import tabBar from '../../components/zwy-tabBar/tabBar.vue';
	export default {
		components: {
			// tabBar
		},
		data() {
			return {
				currentPage:'carts',
			}
		},
		methods: {
			goToIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	.container{
		background: white;
	}
	.content{
		margin: 10rem auto;
		font-size: 0.7rem;
	}
	.uni-cart-imgbox{
		display: flex;
		justify-content: center;
	}
	.uni-cart-img{
		width: 3rem;
		height: 3rem;
		
	}
	.uni-cart-text1{
		padding-top:1rem;
		text-align: center;
	}

	.uni-cart-btn{
		display: block;
		background: #E13F3F;
		margin: 1rem auto;
		width: 60%;
		height: 2rem;
		line-height: 2rem;
		color: white;
		text-align: center;
		border-radius: 3px;
		
	}
	
</style>
