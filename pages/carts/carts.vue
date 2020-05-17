<template>
	<view class="page">
			
			<view class="main-container" v-if="supplierList!=null && supplierList.length>0">
				<view class="header">
				<!-- 	<view class="btn-back" @click="backPage"></view> -->
					<view class="gwc"></view>
					<view class="del-caret" @click="deleteAll"></view>
				</view>
				
				<view class="caret-list" v-for="(item,index) in supplierList" :key="index">
					<view class="shop_header">
						<view class="selectshoplabl"><radio class="selectShop" :checked="item.checked" @click="selectShop(index)"></radio></view>
						<label class="shop_name">{{item.supplierName}}</label>
						<label class="arr" @click="toShopDetail(item.id)"></label>
					</view>
					<view class="goodsList" v-for="(item2,index2) in item.careItemList" :key="index2">
						<view class="col1">
							<radio class="selectOne" :checked="item2.checked" @click="selectOne(index,index2)"></radio>
						</view>
						<view class="col2">
							<image class="good_img" :src="item2.listImgPath"></image>
						</view>
						<view class="col3">
							<view class="goodName">{{item2.pName}}</view>
							<view class="calc">
								<label class="minus" @click="minus(index,index2)">减一</label>
								<input  type="number" class="goodsNum" :value="item2.quantity" @input="updateGoodNum(index,index2,$event)"/>
								<label class="plus"  @click="plus(index,index2)">加一</label>
							</view>
						</view>
						<view class="col4">
							<view class="p1"></view>
							<view class="p2">￥{{item2.price}}</view>
							<view class="del-list" @click="deleteOne(index,index2)">删除</view>
						</view>
					</view>
					<!-- goodsList end -->
				</view>
				<!-- caret-list end -->
			</view>
			<!-- main-container end -->
			
			<!-- 底部 -->
			<view class="footer-count" v-if="supplierList!=null && supplierList.length>0">
				<view class="total">
					<view class="flex">
						<view class="sp1">
							<radio class="selectAll" :checked="selectAllChecked" @click="selectAll">全选</radio>
						</view>
						<view class="sp2">
							合计:￥<label>{{totalMoney}}</label>
						</view>
					</view>
				</view>
				
				<view class="submit" @click="toPrepay">去结算</view>
			</view>
			
			
			<view class="content" v-if="(supplierList==null || supplierList=='' || supplierList.length==0) && accessToken!=null">
					
					<view class="uni-cart-imgbox">
						<image class="uni-cart-img" src="../../static/image/pic_gw_k.png"></image>
					</view>
					<view class="uni-cart-text1">您的购物车空空哒~</view>
					<view class="uni-cart-btn" @click="goToIndex"><text class="uni-cart-text1">去逛逛</text></view>
				</view>
				<!-- <view class="container999">
					<tabBar :currentPage="currentPage"></tabBar>
				</view> -->
			
			<view class="content" v-if="accessToken==null">
					<view class="login_btn" @click="tologin" >
						<view class="login_text">登陆/注册</view>
					</view>
				</view>
				<!-- <view class="container999">
					<tabBar :currentPage="currentPage"></tabBar>
				</view> -->
			<!-- </view> -->
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				supplierList:null,
				selectAllChecked:true,
				totalMoney:0.00,
				accessToken:null,
			}
		},
		onLoad(){
			
		},
		onShow(){
			 this.supplierList = null;
			this.selectAllChecked = false;
			this.totalMoney = 0;
			if(uni.getStorageSync('accessToken')!='undefined' && uni.getStorageSync('accessToken')!=null && uni.getStorageSync('accessToken')!=''){
				this.accessToken = uni.getStorageSync('accessToken')
				this.getcartItemList();
			}else{
				this.accessToken = null;
			} 
		},
		methods: {
			//返回
			backPage() {
				uni.switchTab({
				     url: '/pages/index/index'
				});
			},
			goToIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			//获取购物车商品
			getcartItemList(){
				this.$api.cartItemList().then(res =>
					{
						 console.log(JSON.stringify(res));
						  console.log(this.$config.imghosturl);
						if(res.list!=null && res.list.length>0){
							let supplierList = res.list;
							 supplierList.forEach((p) => {
									p.careItemList.forEach((k) => {
										k.listImgPath = this.$config.imghosturl+k.listImgPath
									});
							 });
							 this.supplierList = supplierList;
							 this.recaculate();
						}else{
							//uni.redirectTo({
							//	url:'/pages/carts_empty/carts_empty'
							//})
						}
					}); 
			},
			//跳转店铺详情页
			toShopDetail(shopId) {
				uni.navigateTo({
					 url: '/pages/shopdetail/shopdetail?shopId='+shopId
				})
			},
			//去结算
			toPrepay() {
				var careItemids ='';
				this.supplierList.forEach((p) => {
						if(p.checked){
							p.careItemList.forEach((k) => {
								if(k.checked){
									careItemids+=k.productId+'@@@';
								}
							});
						}
						
				});
				 console.log(JSON.stringify("careItemids=="+careItemids));
				uni.navigateTo({
					  url: '/pages/preorder/preorder?pids='+careItemids+'&buyType=cartiem',
				})
			},
			
			//减一
			minus(index,index2){
				var good = this.supplierList[index].careItemList[index2];
				if(good.quantity<=1){
					good.quantity = 1;
				}else{
					var data ={pid:good.productId};
					console.log("data==="+JSON.stringify(data)); //打印出上个页面传递的参数。
					this.$api.ajaxMinuses(data).then(res =>
						{
							 console.log(JSON.stringify(res));
							if(res.code=='0000'){
								good.quantity--;
								this.recaculate();
								// uni.showToast({
								//     title: '减少成功',
								//     duration: 2000
								// });
							}else if(res.code=='0001'){
								uni.showToast({
								    title: res.message,
								    duration: 2000
								});
							}else{
								uni.showToast({
								    title: '操作失败',
								    duration: 2000
								});
							}
						}); 
				}
				
			},
			//加一
			plus(index,index2){
				var good = this.supplierList[index].careItemList[index2];
				if(good.quantity<=0){
					good.quantity = 1;
				}else{
					if(good.quantity>=100){
						good.quantity = 100;
					}else{
								var data ={pid:good.productId};
								console.log("data==="+JSON.stringify(data)); //打印出上个页面传递的参数。
								this.$api.ajaxAdd(data).then(res =>
									{
										 console.log(JSON.stringify(res));
										if(res.code=='0000'){
											good.quantity++;
											this.recaculate();
											// uni.showToast({
											// 	title: '增加成功',
											// 	duration: 2000
											// });
											
										}else if(res.code=='0001'){
											uni.showToast({
												title: res.message,
												duration: 2000
											});
										}else{
											uni.showToast({
												title: '操作失败',
												duration: 2000
											});
										}
									}); 
					}
					
				}
				
			},
			updateGoodNum(index,index2,e){
					console.log("e==="+JSON.stringify(e)); //打印出上个页面传递的参数。
					console.log("e.detail.value==="+JSON.stringify(e.detail.value)); //打印出上个页面传递的参数。
					var quantity = e.detail.value;
					if(quantity==null || quantity==''){
						return;
					}
					quantity = parseInt(quantity);
				var good = this.supplierList[index].careItemList[index2];
				var oldnum = good.quantity;
				if(quantity<=0){
					quantity = 1;
					good.quantity = 1;
					this.supplierList[index].careItemList[index2].quantity = 1;
				}else{
						if(quantity>=20){
							quantity = 20;
							this.supplierList[index].careItemList[index2].quantity = 20;
						}
						var data ={pid:good.productId,quantities:quantity};
						console.log("data==="+JSON.stringify(data)); //打印出上个页面传递的参数。
						this.$api.updatecarItem(data).then(res =>
							{
								 console.log(JSON.stringify(res));
								if(res.code=='0000'){
									//good.quantity = quantity;
									this.supplierList[index].careItemList[index2].quantity = quantity;
									this.recaculate();
									// uni.showToast({
									// 	title: '修改成功',
									// 	duration: 2000
									// });
									
								}else if(res.code=='0001'){
									good.quantity = oldnum;
									uni.showToast({
										title: res.message,
										duration: 2000
									});
								}else{
									good.quantity = oldnum;
									uni.showToast({
										title: '操作失败',
										duration: 2000
									});
								}
							}); 
			
					
				}
			},
			//单选
			selectOne(index,index2){
				var good = this.supplierList[index].careItemList[index2];
				if(good.checked){
					good.checked = false;
					//判断是否全部都取消
					var flag = false;
					this.supplierList[index].careItemList.forEach(function(item){
						if(item.checked){
							flag = true;
						}
					});
					if(!flag){
						this.supplierList[index].checked = false;
					}
				}else{
					good.checked = true;
					this.supplierList[index].checked = true;
				}
				this.recaculate();
			},
			//选中指定店铺
			selectShop(index){
				var shop = this.supplierList[index]
				if(shop.checked){
					shop.checked = false;
					shop.careItemList.forEach(function(item){
						item.checked = false;
					});
				}else{
					shop.checked = true;
					shop.careItemList.forEach(function(item){
						item.checked = true;
					});
				}
				this.recaculate();
			},
			//全选
			selectAll(){
				if(this.selectAllChecked){
					this.selectAllChecked = false;
					this.supplierList.forEach(function(item){
						item.checked = false;
						item.careItemList.forEach(function(item2){
							item2.checked = false;
						});
					});
				}else{
					this.selectAllChecked = true;
					this.supplierList.forEach(function(item){
						item.checked = true;
						item.careItemList.forEach(function(item2){
							item2.checked = true;
						});
					});
				}
				this.recaculate();
			},
			//删除单个选中
			deleteOne(index,index2){
				
				var good =  this.supplierList[index].careItemList[index2];
				var that = this;
				uni.showModal({
				    title: '提示',
				    content: '确认删除商品"'+good.pName+'"吗?',
				    success: function (res) {
				        if (res.confirm) {
							  var data = {pids:good.productId+";"};
							  that.$api.deleteCarItems(data).then(res =>
							  	{
							  		 console.log(JSON.stringify(res));
							  		if(res.code=='0000'){
							  			
							  			that.supplierList[index].careItemList.splice(index2,1);
							  			//删除完商品则把 店铺页删除
							  			if(that.supplierList[index].careItemList.length==0){
							  				that.supplierList.splice(index,1);
							  			}
							  			that.recaculate();
							  			// uni.showToast({
							  			// 	title: '删除成功',
							  			// 	duration: 2000
							  			// });
							  			
							  		}else if(res.code=='0001'){
							  			uni.showToast({
							  				title: res.message,
							  				duration: 2000
							  			});
							  		}else{
							  			good.quantity = oldnum;
							  			uni.showToast({
							  				title: '删除失败',
							  				duration: 2000
							  			});
							  		}
							  	}); 
							  
				        } else if (res.cancel) {
				            return;
				        }
				    }
				});
				
			},
			//删除全部选中
			deleteAll(){
				var that = this;
				uni.showModal({
				    title: '提示',
				    content: '确认删除全部商品?',
				    success: function (res) {
				        if (res.confirm) {
							var pids='';
							that.supplierList.forEach((p)=>{
								p.careItemList.forEach((k)=>{
									 console.log(k.checked);
									if(k.checked){
										pids+=k.productId+";";
									}
								});
							});
							var data = {pids:pids};
							that.$api.deleteCarItems(data).then(res =>
								{
									 console.log(JSON.stringify(res));
									if(res.code=='0000'){
										// that.supplierList = null;
										// that.recaculate();
										 //that.totalMoney = 0.00;
										// uni.showToast({
										// 	title: '删除成功',
										// 	duration: 2000
										// });
										that.getcartItemList();
										
									}else if(res.code=='0001'){
										uni.showToast({
											title: res.message,
											duration: 2000
										});
									}else{
										good.quantity = oldnum;
										uni.showToast({
											title: '删除失败',
											duration: 2000
										});
									}
								}); 
						
				        } else if (res.cancel) {
				            return;
				        }
				    }
				});
				
			},
			//计算选中商品金额
			recaculate(){
				var total = 0;
				if(this.supplierList!=null){
					this.supplierList.forEach(function(item){
						if(item.checked){
							item.careItemList.forEach(function(item2){
								if(item2.checked){
									total += item2.quantity*item2.price;
								}
							});
						}
					});
					total = total.toFixed(2);
					this.totalMoney = total;
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
	
	.page{
		background: white;
	}
	.main-container {
	    padding-bottom: 4rem;
	    // background-color: #EBEBEB;
		background: white;
	    position: relative;
	    z-index: 1;
	    opacity: 1;
	    -webkit-transition: -webkit-transform .3s ease;
	    transition: transform .3s ease;
	}
	.main-container .header {
	    position: relative;
	    height: 2.5rem;
	    line-height: 2.5rem;
	    background: #ffffff;
	    box-shadow: 0 1px 1px #E2E2E2;
		display: flex;
	}
	
	.btn-back {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 2.5rem;
	    height: 2.5rem;
	    background: url(../../static/image/top_but_black.png) 50% 50% no-repeat;
	    background-size: 20px auto;
	    text-indent: -9999px;
	}
	.gwc{
		flex: 1;
		text-align: center;
	}
	.del-caret {
	    position: absolute;
	    top: 0;
	    right: 0;
	    width: 2.5rem;
	    height: 2.5rem;
	    background: url(../../static/image/but_delete.png) 50% 50% no-repeat;
	    background-size: 12px auto;
	    text-indent: -9999px;
	}
	.caret-list {
	    margin: 0.7rem 0;
	    background-color: #fff;
	    // border-top: 1px solid #E2E2E2;
	    border-bottom: 10px solid lightblue;
	}
	.shop_header{
		position: relative;
		display: flex;
		border-bottom: 1px solid #E3E3E3;
	}
	.selectshoplabl{
		margin: 0.3rem auto;
		margin-left: 1rem;
	}
	.selectShop{
		
	}
	.col1{
		  display: flex;
		  margin: 0.3rem auto;
		  align-items: center;
		  flex: 1;
		 padding-left: 1rem;
	}
	.col1 .selectOne{
		align-self: left;
	}
	.col2{
		    padding: 1rem 1rem 1rem 0;
		    width: 70px;
			border-bottom: 1px solid #E3E3E3;
			 flex: 1;
	}
	.col3{
		    padding: 20px 10px 20px 0;
		    vertical-align: top;
		    position: relative;
		    width: 110px;
			border-bottom: 1px solid #E3E3E3;
			 flex: 2;
	}
	.col3 .goodName{
		    font-size: 0.7rem;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    -webkit-box-orient: vertical;
	}
	.col3 .calc {
	    position: absolute;
	    left: -2px;
	    font-size: 0.7rem;
		bottom: 0.5rem;
	}
	.col3 .calc .minus {
	    background: url(../../static/image/but_1_minus_light.png) 50% 50% no-repeat;
	    background-size: auto 22px;
		display: inline-block;
		height: 1.4rem;
		width: 28px;
		text-indent: -9999px;
	}
	 .col3 .calc .plus {
	   background: url(../../static/image/but_1_add_light.png) 50% 50% no-repeat;
	   background-size: auto 22px;
	   display: inline-block;
	   height: 1.4rem;
	   width: 28px;
	   text-indent: -9999px;
	}
	 .col3 .calc .goodsNum {
	    display: inline-block;
	    vertical-align: top;
	    width: 3rem;
	    height: 1.4rem;
	    font-size: 0.7rem;
	    box-sizing: border-box;
	    border-radius: 0;
	    text-align: center;
	    border: 1px solid #DADADA;
	    -webkit-appearance: none;
	}
	uni-input {
	    display: block;
	    font-size: 16px;
	    line-height: 1.4rem;
	    height: 1.4rem;
	    min-height: 1rem;
	    overflow: hidden;
	}
	.col4 {
	    position: relative;
	    vertical-align: top;
	    padding: 1rem 1rem 1rem 0;
	    text-align: right;
		border-bottom: 1px solid #E3E3E3;
		 flex: 2;
	}
	.col4 .p1 {
	    font-size: 0.6rem;
	    line-height: 1.2rem;
	}
	.col4 .p2 {
	    font-size: 0.6rem;
	    line-height: 1.2rem;
		color: red;
	}
	.col4 .del-list {
	    position: absolute;
	    bottom: -1px;
	    right: 1rem;
	    width: 20%;
	    height: 35px;
	    background: url(../../static/image/but_delete.png) 100% 50% no-repeat;
	    background-size: auto 15px;
	    border-bottom: 1px solid #E3E3E3;
	    color: transparent;
	}
	.shop_name{
		    padding: 10px 10px 10px 0;
		    text-align: left;
		    font-weight: normal;
			flex: 1;
			font-size: 0.8rem;
	}
	.caret-list .arr {
	    background: url(../../static/image/ic_fj_arrow.png) 100% 50% no-repeat;
	    background-size: 5.5px auto;
	    height: 2rem;
	    width: 2rem;
	    display: block;
	    position: absolute;
	    right: 1.6rem;
	    top: 0;
	}
	.goodsList{
		display: flex;
		justify-content: center;
	}
	.good_img{
		width: 2.5rem;
		height: 2.5rem;
	}
	
	.footer-count {
		    position: fixed;
		    bottom: 0;
		    left: 0;
		    right: 0;
		    z-index: 10;
			    height: 2rem;
			    line-height: 2rem;
			    font-size: 0.7rem;
			    display: -webkit-box;
			    display: -webkit-flex;
			    display: flex;
			   /* border: 1px solid lightgrey; */
			    /* border-radius: 22px; */
	}
	.footer-count .total {
	    float: left;
		left: 1rem;
	   padding: 0;
	   width: 76%;
	   // background-color: rgba(0,0,0,0.8);
	    color: black;
	    box-sizing: border-box;
	    // background-color: #262626;
		background-color:white;
		 border: 1px solid lightgrey;
	}
	
	 .flex {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.flex .sp1 {
	  /*  position: relative; */
	    display: block;
	    padding: 0 0 0 40px;
	    font-size: 0.7rem;
	    color: #D2D2D2;
	    white-space: nowrap;
		}
		
	.sp1 .checked {
		    background: url(../../static/image/but_gou_light.png) 13px 50% no-repeat transparent;
		    background-size: 18px 18px;
		}
	.flex .sp1 .selectAll {
		position: absolute;
		top: 0;
		left: 1rem;
		right: 0;
		bottom: 0;
		display: block;
		width: 20%;
		height: 100%;
		-webkit-appearance: none;
		/* background: url(../../static/image/but_gou_gray.png) 13px 50% no-repeat transparent; */
		/* background-size: 18px 18px; */
		border: none;
		border-radius: 0;
		outline: none;
	}
	
	.total .flex .sp2 {
	    display: block;
	    font-size: 0.7rem;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    text-align: center;
		}
	.footer-count .submit {
		float: left;
		width: 25%;
		color: #fff;
		display: block;
		text-align: center;
		background-color: #E35151;
		/* border-radius: 2rem; */
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
		/* background: #E13F3F; */
		background-color: #1195db;
		margin: 1rem auto;
		width: 50%;
		height: 2rem;
		line-height: 2rem;
		color: white;
		text-align: center;
		border-radius: 3px;
		
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
			width: 35%;
			/* background: lightblue; */
			background-color: #1195db;
			height: 2rem;
			line-height: 2rem;
			color: white;
			border-radius: 1rem;
			font-size: 0.8rem;        
	}
</style>
