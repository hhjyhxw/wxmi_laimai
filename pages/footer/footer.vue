<template>
	<view  class="footer">
		  		<view class="menus">
		    		<view  class="menu" :class="{active: homeisActive}" @click="firstPage">
		      			<view id="shouye">
							<span class="menu-icon menu-icon1"></span>
							<view>首页</view>
						</view>
		    		</view>
		    		<view class="menu" @click="shoplist" :class="{active: shopisActive}"> 
		      			<view id="fujin">
							<span class="menu-icon menu-icon2"></span>
							<view>附近小店</view>
						</view>
		    		</view>
		    		<view class="menu gwc"  @click="toCart" :class="{active: cartisActive}">
		      			<view id="gouwu">
		        			<span class="menu-icon menu-icon3"></span>
							<div>购物车</div>
							<span  id="headerCarItemQuantity" class="count"></span>
		      			</view>
		    		</view>
		     		
					<view class="menu"  @click="toMyCenter" :class="{active: mycenterisActive}">
							<view  id="wode">
									<span class="menu-icon menu-icon4"></span>
									<view id="headerMemberCenter">我的</view></view>
							</view>
					</view>
	</view>
</template>

<script>
	export default {
		props:["selectType"],
		data() {
			return {
				homeisActive:true,
				shopisActive:false,
				cartisActive:false,
				mycenterisActive:false,
				
			}
		},
		mounted(){
			//debugger;
			uni.$on('shoplist', this.changeColors);
			
			
		},
		methods: {
			firstPage() {
				uni.navigateTo({
				    url: '/pages/index/index'
				});
			},
			shoplist() {
				uni.navigateTo({
				    url: '/pages/shoplist/shoplist'
				});
				
			},
			toCart() {
				uni.navigateTo({
				    url: '/pages/carts/carts'
				});
			},
			toMyCenter() {
				uni.navigateTo({
				    url: '/pages/mycenter/mycenter'
				});
				//this.changeColors('mycenterisActive');
			},
			changeColors(type){
				debugger;
				if(type=='homeisActive'){
					this.homeisActive = true;
					this.shopisActive = false;
					this.cartisActive = false;
					this.mycenterisActive = false;
				}else if(type=='shopisActive'){
					this.homeisActive = false;
					this.shopisActive = true;
					this.cartisActive = false;
					this.mycenterisActive = false;
				}else if(type=='cartisActive'){
					this.homeisActive = false;
					this.shopisActive = false;
					this.cartisActive = true;
					this.mycenterisActive = false;
				}else if(type=='mycenterisActive'){
					this.homeisActive = false;
					this.shopisActive = false;
					this.cartisActive = false;
					this.mycenterisActive = true;
				}
			}
		}
	}
</script>

<style lang="scss">
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
