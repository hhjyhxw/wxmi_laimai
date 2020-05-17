<template>
	<view class="address-wrap">
		
		<view class="address">
			<view class="list">
				<view class="item" v-for="(item,index) in addresslist" :key="index"  @click="goBackPreorder(item.id)">
					<view class="persion"><text>{{item.name}}</text><text class="tel">{{item.mobile}}</text></view>
					<view class="addressdetail">
						<text>{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.village}}{{item.address}}</text>
					</view>
					<view>
						<label class="arr"></label>
					</view>
				</view>
			</view>
		</view>
		<view class="address-add" @click="toAddAddress">
			<view class="adda">
				<text>新增收货地址</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				addresslist:[
					{
						name:'zdh',
						mobile:'15077144027',
						provinceName:'广西壮族自治区',
						cityName:'南宁市',
						areaName:'西乡塘区',
						village:'衡阳街道',
						address:'北湖路23号'
					},
					{
						name:'哈哈哈',
						mobile:'15077144027',
						provinceName:'广西壮族自治区',
						cityName:'南宁市',
						areaName:'西乡塘区',
						village:'衡阳街道',
						address:'北湖路23号'
					},
					{
						name:'alfjlaj',
						mobile:'15077144027',
						provinceName:'广西壮族自治区',
						cityName:'南宁市',
						areaName:'西乡塘区',
						village:'衡阳街道',
						address:'北湖路23号'
					},
				]
			}
		},
		onShow: function (option) { //option为object类型，会序列化上个页面传递的参数
			
			this.getAddressList();
			
		},
		methods: {
			//获取我的地址列表
			getAddressList(){
				this.$api.addresslist().then(res =>
					{
						 console.log(JSON.stringify(res));
				
						if(res.list!=null){
							 this.addresslist = res.list;
						}
					}); 
			},
			//点击切换地址
			goBackPreorder(id) {
				this.$api.setDefaut({id:id}).then(res =>
				{
					 console.log(JSON.stringify(res));
					if(res.code=='0000'){
						uni.navigateBack()
					}
				}); 
			},
			//跳转新增地址页面
			toAddAddress() {
				uni.navigateTo({
					url: '/pages/add-address/add-address?formpage=formpreorder'
				})
			},
		}
	}
</script>

<style>

.address-wrap {
	font-size: 0.7rem;
	padding-top: 0.7rem;
	background: #EBEBEB
}

.address-wrap .address {
	background: #fff;
	margin: 0;
	padding: 0
}

.address-wrap .address .list {
	border-top: none;
	border-bottom: 1px solid #ddd;
	padding: 0;
	margin: 0
}

.address-wrap .address .list .item {
	display: block;
	color: #666;
	padding: 1rem;
	border-left: 3px solid #fff;
	position: relative;
	border-bottom: 1px solid lightgray;
	position: relative;
}

.address-wrap .address .list .item text {
	color: #999;
	line-height: 1.7
}

.address-wrap .address .list .item  .persion {
	color: #666;
	padding-right: 4em
}

.address-wrap .address .list .item  .tel {
	color: #666;
	padding-left:1rem;
}

.address-wrap .address .list .item .addressdetail {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis
}

.address-wrap .address-add{
	padding: 1rem 2rem;
}
.address-wrap .address-add  .adda{
	    display: block;
	    width: 100%;
	    height: 2rem;
	    line-height: 2rem;
	    text-align: center;
	    color: #666;
	    border: 1px solid #5C5E68;
	    border-radius: 5px;
	    background: #fff;
}
.address-wrap .address-add .adda text {
    /* padding-left: 1.6rem;
    background: url(../../static/image/pic_ddqr_dzt.png) 0 50% no-repeat;
    background-size: 1.15rem auto; */
}
.address-wrap .address .list .item .arr {
	background: url(../../static/image/ic_fj_arrow.png) 100% 50% no-repeat;
	background-size: 5.5px auto;
	height: 2rem;
	width: 2rem;
	display: block;
	background-position: center;
	position: absolute;
	right: 0;
	top: 26px;
	bottom: 0;
}

</style>
