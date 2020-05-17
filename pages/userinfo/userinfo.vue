<template>
	<view class="container">
		<view class="content">
			<view class="listitem">
				<text class="text1">用户名</text><text>{{member.userName}}</text>
			</view>
			<view class="listitem gojiantou" @click="changeHeadphone">
				<text class="text1">头像</text><image class="headImgUrl" :src="temheadurl"></image>
			</view>
			<view class="listitem gojiantou" @click="changenick">
				<text class="text1">昵称</text><input class="inputtext1" v-model="member.nick" />
			</view>
			<view class="listitem gojiantou"  @click="changgader">
				<text class="text1">性别</text>
				<view>
					<view class="uni-list">
						 <view class="uni-list-cell">
							 <view class="uni-list-cell-db">
								 <picker @change="changgader" :value="index" :range="sexlist">
									 <view class="uni-input">{{sexlist[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="listitem gojiantou">
				<text class="text1" @click="changemail">邮箱</text><input class="inputtext1" v-model="member.email" />
			</view>
			<view class="listitem gojiantou" @click="changemoblie">
				<text class="text1">手机</text> <input class="inputtext1" v-model="member.mobile"  />
			</view>
			
			<view @click="saveInfo" class="savbtn" :style="{'display':isShow ? 'block':'none'}">保存修改</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				member:{
					userName:'zdh',
					nick:'阿木木',
					headImgUrl:'http://thirdwx.qlogo.cn/mmopen/HpicclFcicSt5tNZQSr2vPT1NVZSjiaoUCACetNbCd7Cy2ibIobUFJibHM7M8l7MTIRPqXaxZKoW1ZHuEjFYefhyyVkicvkZ1Fh10D/132',
					gender:1,//1男 2女
					email:'1096302465@qq.com',
					mobile:'15077144027'
				},
				temheadurl:'http://thirdwx.qlogo.cn/mmopen/HpicclFcicSt5tNZQSr2vPT1NVZSjiaoUCACetNbCd7Cy2ibIobUFJibHM7M8l7MTIRPqXaxZKoW1ZHuEjFYefhyyVkicvkZ1Fh10D/132',
				sexlist:['男','女'],
				index:0,
				name:'男',
				isShow:false,//保存按钮是否显示
			}
		},
		onShow:function(){
			this.getUserinf();
		},
		methods: {
			
			changeHeadphone(){
				let _token = {'accessToken': uni.getStorageSync('accessToken')};
				var that = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						var url = that.$config.hosturl+'/newapp/upload!uploadFile.action';
						uni.uploadFile({
							url: url, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header:_token,
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								  console.log( uploadFileRes.data);
								  var data = JSON.parse(uploadFileRes.data)
								   console.log(JSON.stringify(data.src));
								if(data.code=='0000'){
									that.temheadurl = that.$config.hosturl+data.src;
									 console.log(JSON.stringify(that.temheadurl));
									that.member.headImgUrl = data.src;
								}
							},
							fail:(res)=>{
								console.log('fail=='+JSON.stringify(res));
							}
						});
					}
				});
				this.isShow = true;
			},
			changenick(){
				this.isShow = true;
				
			},
			changgader(e){
				console.log(JSON.stringify(e.detail.value));
				var temp = e.detail.value;
				if(temp!='NaN' && temp!=undefined){
					this.isShow = true;
					this.index = e.detail.value;
					this.member.gender=parseInt(this.index)+1;
					console.log(JSON.stringify("this.member.gender=="+this.member.gender));
				}
			},
			changemail(){
				this.isShow = true;
				
			},
			// true:数值型的，false：非数值型
			  myIsNaN(value) {
			    return typeof value === 'number' && !isNaN(value);
			  },
			changemoblie(){
				this.isShow = true;
				
			},
			getUserinf(){
				this.$api.getUserInfo().then(res =>
					{
						 console.log(JSON.stringify(res));
						if(res.code=='0000'){
							this.member = res.member;
							this.temheadurl = this.$config.hosturl+res.member.headImgUrl;
							this.index = this.member.gender-1;
							if(this.temheadurl==null || this.temheadurl==''){
								this.temheadurl = '../../static/image/user_touxiang.png';
							}
						}
					}); 
			},
			saveInfo(){
				console.log(JSON.stringify(this.member));
				if (this.member.nick.length < 3 || this.member.nick.length>30) {
					uni.showToast({
						icon: 'none',
						title: '昵称不合法'
					});
					return false;
				}
				if (this.member.email.length < 3 || !~this.member.email.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法'
					});
				return false;
				}
				if (this.member.mobile.length !=11) {
					uni.showToast({
						icon: 'none',
						title: '手机不合法'
					});
					return false;
				}
				this.$api.modifyInfo(this.member).then(res =>
					{
						 console.log(JSON.stringify(res));
						if(res.code=='0000'){
							uni.showToast({
								title:'保存成功',
								duration:3000
							})
							this.isShow=false;
						}
					}); 
			},
			
			/**判断是否是手机号**/
			isPhoneNumber(tel) {
			    var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
			    return reg.test(tel);
			}

		}
	}
</script>

<style>
.container{
	background: lightgrey;
}
.content{
	 display: flex;
	        flex-flow: column;
/* 	        align-items: center; */
	background: white;
}
.listitem{
	display: flex;
	padding: 0.6rem 1rem;
	font-size: 0.8rem;
	border-bottom: 1px solid lightgrey;
	position: relative;
}
.text1{
	flex: 1;
	
}

.headImgUrl{
	height: 2.5rem;
	width: 2.5rem;
	border: 1px solid #CDCDCD;
	border-radius: 100%;
}
.inputtext1{
	text-align: right;
}
.gojiantou:after {

	/* 	content: '';
		display: block;
		width: 2%;
		background: url(../../static/image/ic_fj_arrow.png) 100% 50% no-repeat;
		position: absolute;
		right: 1rem;
		top:1rem;
		bottom: 1.1rem; */
	}
	.savbtn{
		    background: #007AFF;
		    color: white;
		    display: block;
		    padding: 1rem auto;
		    font-size: 0.9rem;
		    padding: 1rem auto;
		    margin: 3rem auto;
		    width: 40%;
		    height: 2rem;
		    line-height: 2rem;
		    text-align: center;
		    border-radius: 3px;
	}
	
	.savbtnshow{
		display: block;
	}
	.savbtnhide{
		display: none;
	}
</style>
