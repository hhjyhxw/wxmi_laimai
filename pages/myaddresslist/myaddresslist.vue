<template>
	<view style="margin-bottom: 3rem;">
		<view class="content">
			<view class="people" v-for="(item,index) in addresslist" :key="index">
				<view class="wrap">
					<view class="info">
						<view class="name">{{item.name}}</view>
						<view class="phone">{{item.mobile}}</view>
					</view>
					<view class="address">
						收货地址：{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.address}}       
					</view>
				</view>
				<view class="edit-address">
					<view class="defautaddress">
						<!-- <radio :value="item.isDefault" :checked="item.isDefault===true">默认地址</radio> -->
						<view class="input switchs">
							<switch :checked="item.isDefault" @change="setDefault(index,$event)" />默认地址
						</view>
					</view>
					<view><text class="edit" @click="editeAddress(item.id)">编辑</text></view>
					<view><text class="deladdress" @click="deleteAddress(index,item.id)">删除</text></view>
				</view>
			</view>
			
			<view class="address-add" @click="toAddAddress">
				<view class="adda">
					<text>新增收货地址</text>
				</view>
			</view>
		</view>
		
<!-- 			<view  class="footer">
						<view class="menus">
							<view  class="menu"  @click="firstPage">
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
							
							<view class="menu active"  @click="toMyCenter" >
									<view  id="wode">
											<span class="menu-icon menu-icon4"></span>
											<view id="headerMemberCenter">我的</view></view>
									</view>
							</view>
			</view> 
			-->
		<!-- 	<view class="container999">
				<tabBar :currentPage="currentPage"></tabBar>
			</view> -->
			
			<backTop :src="backTop.src"  :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	// import tabBar from '../../components/zwy-tabBar/tabBar.vue';
	import backTop from '@/components/back-top/back-top.vue';
	export default {
		components: {
			// tabBar
			backTop
		},
		data() {
			return {
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				scrollTop: 0,
				
				currentPage:'mycenter',
				addresslist:[
					{
						name:'zdh',
						mobile:'15077144027',
						provinceName:'广西壮族自治区',
						cityName:'南宁市',
						areaName:'西乡塘区',
						village:'衡阳街道',
						address:'天海苑'
					},
					{
						name:'哈哈哈',
						mobile:'15077144027',
						provinceName:'广西壮族自治区',
						cityName:'南宁市',
						areaName:'西乡塘区',
						village:'衡阳街道',
						address:'天海苑'
					}
				]
			}
		},
		onShow:function(){
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
			setDefault(index,e){
				console.log("e==="+JSON.stringify(e.detail.value));
				console.log("index==="+JSON.stringify(index));
				if(e.detail.value==true){
					this.$api.setDefaut({id:this.addresslist[index].id}).then(res =>
					{
						 console.log(JSON.stringify(res));
						if(res.code=='0000'){
							this.addresslist.forEach(function(p){
								console.log("p===="+JSON.stringify(p));
								p.isDefault=false;
							});
							this.addresslist[index].isDefault = true;
						}
					}); 
				}
				
			},
			deleteAddress(index,id){
				this.$api.deleteAddress({id:id}).then(res =>
				{
					 console.log(JSON.stringify(res));
					if(res.code=='0000'){
						this.addresslist.splice(index,1);
						uni.showToast({
							title:'删除成功'
						})
					}
				}); 
			},
			editeAddress(id){
				uni.navigateTo({
				    url: '/pages/add-address/add-address?id='+id+'&formpage=myaddresslist'
				});
			},
			toAddAddress(){
				uni.navigateTo({
				    url: '/pages/add-address/add-address?formpage=myaddresslist'
				});
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
			
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
	}
</script>

<style>
	.content {
	    background-color: #F7F7F7;
		margin-bottom: 5rem;
	}
	 .address-add{
		padding: 1rem 2rem;
	}
	 .address-add  .adda{
		    display: block;
		    width: 100%;
		    height: 2rem;
		    line-height: 2rem;
		    text-align: center;
		    color: #666;
		    border: 1px solid #5C5E68;
		    border-radius: 5px;
		    background: #fff;
			font-size:0.7rem;
	}
	.content .people {
	    background-color: #fff;
	    border-top: 1px solid #ddd;
	    border-bottom: 1px solid #ddd;
	    padding: 8px 16px;
	    margin-top: 8px;
	}
	.content .people .wrap {
	    padding-right: 0.6rem;
	}
	.content .people .info {
	        font-size: 0.7rem;
	        padding: 4px 0;
	        display: flex;
	        align-items: center;
	    padding: 4px 0;
	}
	.address {
	     padding: 0.5rem 0;
	     /* background-image: url(../../static/image/pic_ddqr_dzt.png),url(../../static/image/pic_ddqr_dzt.png); */
	     background-position: 0 0, 0 100%;
	     background-repeat: repeat-x, repeat-x;
	     background-size: auto 2px, auto 2px;
	     background-color: #fff;
	     font-size: 0.7rem;
		 border-bottom: 1px solid lightgray;
		 color: #999;
	}
	.content .people .info .name {
	    float: right;
	    color: #333;
		flex: 1;
	}
	.content .people .info .phone {
	    float: right;
	    color: #333;
		flex: 1;
	}
	.content .people.selected .wrap {
	    background: url(../../static/image/but_gou_light.png) right center no-repeat;
	    background-size: 18px 18px;
	}
	.address-add .adda text {
	    /* padding-left: 1.6rem;
	    background: url(../../static/image/pic_ddqr_dzt.png) 0 50% no-repeat;
	    background-size: 1.15rem auto; */
	}

.edit-address{
	display: flex;
	align-items: center;
	font-size: 0.7rem;
	padding: 0.3rem;
	color: #428bca;
}
.edit-address .defautaddress{
	flex: 2;
}
.edit-address .edit{
	padding: 0.5rem;
	background: url(../../static/image/btn_wz_bj_down.png) 0 50% no-repeat;
	background-size: 0.8rem auto;
	padding-left: 1rem;
}
.edit-address .deladdress{
	padding: 0.5rem;
	background: url(../../static/image/but_delete.png) 0 50% no-repeat;
	background-size: 0.7rem auto;
	padding-left: 0.8rem;
}


	.footer .active {
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
