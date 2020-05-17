<template>
	<view>
			<view class="carousel">
				<view class="userInfo" @click="toMyinfo">
					<image class="heardurl" :src="temheadurl"></image>
					<view class="user" v-if="accessToken!=null">
						<view class="name">{{member.userName}}</view>
						<!-- <view class="phone"><text></text>{{member.mobile | nullFilter}}</view> -->
					</view>
					<view class="user" v-if="accessToken==null">
						<view class="login_btn" @click="tologin" >
							<view class="login_text">登陆/注册</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="list-group">
				<!-- <view class="list-group-item" @click="toOrderList('UNCOMPLETED')">
					<label class="icon icon1"></label>
					<label class="iconinfo">全部订单</label>
					<label class="arr"></label>
					<label class="badge2">2</label>
				</view> -->
				<view class="list-group-item" @click="toOrderList('UNPAID')">
					<label class="icon icon1"></label>
					<label class="iconinfo">待付款</label>
					<label class="arr"></label>
					<label class="badge2">{{unpaidNum}}</label>
				</view>
				<view class="list-group-item"  @click="toOrderList('UNSHIPPED')">
					<label class="icon icon2"></label>
					<label class="iconinfo">待收货</label>
					<label class="arr"></label>
					<label class="badge2">{{unshippedNum}}</label>
				</view>
				<view class="list-group-item"  @click="toOrderList('COMPLETED')">
					<label class="icon icon3"></label>
					<label class="iconinfo">已完成</label>
					<label class="arr"></label>
					<label class=""></label>
				</view>
				<view class="list-group-item" @click="toMyaddresslist()">
					<label class="icon icon5"></label>
					<label class="iconinfo">收货地址</label>
					<label class="arr"></label>
					<label class=""></label>
				</view>
				<view class="list-group-item" @click="calling('07718098670')">
					<label class="icon icon6"></label>
					<label class="iconinfo">客服电话</label>
					<label class="arr"></label>
					<label class=""></label>
				</view>
				<view class="list-group-item" @click="logout()">
					<label class="icon icon7"></label>
					<label class="iconinfo">设置</label>
					<label class="arr"></label>
					<label class=""></label>
				</view>
				<!--
				<navigator url="../login/login">
					<view class="list-group-item">
				
						<label class="icon icon6"></label>
						<label class="iconinfo">登陆</label>
						<label class="arr"></label>
						<label class=""></label>
						
				</view>
				</navigator>
				-->
			</view>
			
			
		<!-- 	<view  class="footer">
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
				     		
							<view class="menu active"  @click="toMyCenter">
									<view  id="wode">
											<span class="menu-icon menu-icon4"></span>
											<view id="headerMemberCenter">我的</view></view>
									</view>
							</view>
			</view> -->
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
				// currentPage:'mycenter',
				member:{
					userName:'..',
					mobile:'15077144027'
				},
				unshippedNum:0,//待收货
				unpaidNum:0,//待付款
				temheadurl:'../../static/image/user_touxiang.png',
				accessToken:null
				
			}
		},
		onLoad(){
			
		},
		onShow:function(){
			this.member ={userName:''};
			this.temheadurl = '../../static/image/user_touxiang.png';
			this.unpaidNum = 0;
			this.unshippedNum = 0;
			if(uni.getStorageSync('accessToken')!='undefined' && uni.getStorageSync('accessToken')!=null && uni.getStorageSync('accessToken')!=''){
				this.accessToken = uni.getStorageSync('accessToken');
				this.myinfoAndOrderCount();
			}else{
				this.accessToken = null;
			}
			console.log("【uni.getStorageSync('accessToken')】 结果：" + JSON.stringify(uni.getStorageSync('accessToken')))
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
			//获取用户待收货，待支付订单数
			myinfoAndOrderCount(){
				this.$api.myinfo().then(res =>
					{
						 console.log(JSON.stringify(res));
						if(res.code=='0000'){
							this.member = res.member;
							this.unpaidNum = res.unpaidNum;
							this.unshippedNum = res.unshippedNum;
							
							this.temheadurl = this.$config.hosturl+res.member.headImgUrl;
							if(this.temheadurl==null || this.temheadurl==''){
								this.temheadurl = '../../static/image/user_touxiang.png';
							}
						}
					}); 
			},
			//
			toOrderList(status) {
				if(uni.getStorageSync('accessToken')!='undefined' && uni.getStorageSync('accessToken')!=null && uni.getStorageSync('accessToken')!=''){				uni.navigateTo({
					    url: '/pages/orderlist/orderlist?status='+status
					});
				}else{
					uni.navigateTo({url: '/pages/login/login'});
				}
				
			},
			//打电话
			calling(phone){
				uni.makePhoneCall({
				    phoneNumber: phone //仅为示例
				});
			},
			logout(){
				if(uni.getStorageSync('accessToken')!='undefined' && uni.getStorageSync('accessToken')!=null && uni.getStorageSync('accessToken')!=''){				uni.navigateTo({
					   url: '/pages/logout/logout'
					});
				}else{
					uni.navigateTo({url: '/pages/login/login'});
				}
				// try {
				//     uni.clearStorageSync();
				// } catch (e) {
				//     // error
				// }
				// uni.switchTab({
				// 	url: '/pages/mycenter/mycenter'
				// });
				
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
			toMyaddresslist() {
				if(uni.getStorageSync('accessToken')!='undefined' && uni.getStorageSync('accessToken')!=null && uni.getStorageSync('accessToken')!=''){				uni.navigateTo({
						url: '/pages/myaddresslist/myaddresslist'
					});
				}else{
					uni.navigateTo({url: '/pages/login/login'});
				}
			},
			toMyinfo(){
				if(uni.getStorageSync('accessToken')!='undefined' && uni.getStorageSync('accessToken')!=null && uni.getStorageSync('accessToken')!=''){				uni.navigateTo({
						url: '/pages/userinfo/userinfo'
					});
				}else{
					uni.navigateTo({url: '/pages/login/login'});
				}
			},
			tologin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.carousel{
		box-sizing: border-box;
	}
	
	.userInfo{
		    width: 100%;
		    padding: 1rem;
		    box-sizing: border-box;
		  /*  background-color: lightblue; */
		  background-color:white;
		    border-bottom: 1px solid #EBEBEB;
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: -ms-flexbox;
		    display: flex;
		    -webkit-box-align: center;
		    -webkit-align-items: center;
		    -ms-flex-align: center;
		    align-items: center
	}
	.heardurl{
		width: 2.5rem;
		height: 2.5rem;
		    display: block;
		    margin-right: 0.5rem;
		    border: 1px solid #CDCDCD;
		    border-radius: 100%;
	}
	.userInfo .user {
	    display: block;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    color: black;
	    line-height: 1.6;
	    background: url(../../static/image/ic_fj_arrow.png) 100% 50% no-repeat;
	    background-size: 5.5px auto;
	}
	.carousel .userInfo .user .name {
	    font-size: 0.8rem;
	}
	.userInfo .user .phone {
	    font-size: 0.7rem;
	}
	.userInfo .user .phone text {
	    width: 1.2rem;
	    height: 2rem;
		 color: black;
	    background: url(../../static/image/ico.png) left no-repeat;
		background-position: -0.5rem 0;
		background-size: 3.1rem;
	    display: inline-block;
	    vertical-align: middle;
	}
	.list-group{
		padding: 0 0 0 1.2rem;
		margin: 0.5rem 0;
		border-top: 1px solid #EBEBEB;
		border-bottom: 1px solid #EBEBEB;
		background-color: #fff;
	}
	.list-group .list-group-item {
	    position: relative;
	    display: block;
	    padding: 0 1.5rem 0 0;
			border-bottom: 1px solid #EBEBEB;
		height: 2.3rem;
		line-height: 2.3rem;
		border-bottom: 1px solid #EBEBEB;
		font-size: 0.7rem
	}
	
	.list-group .list-group-item .icon {
	    width: 2rem;
	    background-size: 18px 18px;
	    vertical-align: middle;
		display: inline-block;
		height: 2rem;
		vertical-align: middle;
		padding-right: .4rem;
	}
	
	.list-group .list-group-item .arr {
	    background: url(../../static/image/ic_fj_arrow.png) 100% 50% no-repeat;
	    background-size: 5.5px auto;
	    height: 2rem;
	    width: 2rem;
	    display: block;
	    position: absolute;
	    right: 1.6rem;
	    top: 0;
	}
	.list-group-item .badge2 {
	       display: block;
	       position: absolute;
	       right: 3.6rem;
	       top: 0.4rem;
	       background-color: #E13F3F;
	       height: 1.2rem;
	       line-height: 1.2rem;
	       padding: 0 .6em;
	       font-size: 1rem;
	       color: #fff;
	       text-align: center;
	       white-space: nowrap;
	       vertical-align: baseline;
	       border-radius: 20%;
	}
	
	.list-group .list-group-item .icon1 {
	    background: url(../../static/image/ic_wd_dzf.png) 0 50% no-repeat;
		background-size: 2rem 2rem;
	}
	.list-group .list-group-item .icon2 {
	    background: url(../../static/image/ic_wd_dsh.png) 0 50% no-repeat;
		background-size: 2rem 2rem;
	}
	 .list-group .list-group-item .icon3 {
		background: url(../../static/image/ic_wd_ywc.png) 0 50% no-repeat;
		background-size: 2rem 2rem;
	}
	.list-group .list-group-item .icon4 {
		background: url(../../static/image/ic_wd_ywc.png) 0 50% no-repeat;
		background-size: 2rem 2rem;
	}
	.list-group .list-group-item .icon5 {
		background: url(../../static/image/ic_wd_shdz.png) 0 50% no-repeat;
		background-size: 2rem 2rem;
	}
	.list-group .list-group-item .icon6 {
		background: url(../../static/image/ic_wd_kfdh.png) 0 50% no-repeat;
		background-size: 2rem 2rem;
	}
	.list-group .list-group-item .icon7 {
		background: url(../../static/image/set1.png) 23% 50% no-repeat;
		background-size: 1.5rem 1.5rem;
	}
	.active {
	    background-color: #E13F3F;
	}
	.footer{
			position: absolute;
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
	
	.login_btn{
		display: flex;
		background: white;
		margin-top: 1rem;
		padding: 1rem 0rem;
		justify-content: center;
		text-align: center;
		color: #0066CC;
	}
	.login_text{
		
		    display: block;
		    width: 50%;
		   /* background: lightblue; */
			background-color: #1195db;
		    height: 2rem;
		    line-height: 2rem;
		    color: white;
			border-radius: 2rem;
			font-size: 0.8rem;
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
