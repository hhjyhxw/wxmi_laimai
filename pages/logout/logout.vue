<template>
	<view class="page">
		<view class="logout_btn" @click="logout">
			<view class="logout_text">退出</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:''
			}
		},
		methods: {
			logout(){
				try {
				    // uni.clearStorageSync();
					uni.removeStorageSync('accessToken');
					uni.clearStorageSync();
				} catch (e) {
				    // error
				}
				uni.switchTab({
					url: '/pages/mycenter/mycenter'
				});
				
			},
			
		}
	}
</script>

<style>
	.page{
		background: lightgrey;
	}
	.logout_btn{
		display: flex;
		background: white;
		margin-top: 1rem;
		padding: 1rem 0rem;
		justify-content: center;
		text-align: center;
		color: #0066CC;
	}
	.logout_text{
		
		    display: block;
		    width: 30%;
		    /* background: lightblue; */
			background-color: #1195db;
		    height: 2rem;
		    line-height: 2rem;
		    color: white;
			border-radius: 2rem;
	}
</style>
