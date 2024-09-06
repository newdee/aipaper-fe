# cc-loginTabs

#### 使用方法 
```使用方法
<!-- selIndex: 选中序列  tabs-arr：tabs数组  @tabClick:tab点击事件 -->
<cc-loginTabs :selIndex="type" :tabs-arr="tabArr" @tabClick="tabClick"></cc-loginTabs>

// tab点击序列赋值
tabClick(tag) {

   this.type = tag;
},
```

#### HTML代码实现部分
```html
<template>
	<view class="register_page">

		<!-- selIndex: 选中类型  tabs-arr：tabs数组  @tabClick:tab点击事件 -->
		<cc-loginTabs :selIndex="type" :tabs-arr="tabArr" @tabClick="tabClick"></cc-loginTabs>

		<!-- triangle设置三角形 -->
		<view class="input_box triangle" :class="[type == 0 ? 'left_triangle': 'right_triangle']">
			<input type="text" v-model="phone" @input="onInput" placeholder="请输入您的手机号" placeholder-class="grey" />
		</view>
		<view class="input_box" v-if="type == 1">
			<input type="number" v-model="code" placeholder="请输入您的验证码" placeholder-class="grey" @input="onInput"
				maxlength="6" @confirm="onSubmit" />
			<button class="active" @click="onSetCode">{{ codeText }}</button>
		</view>
		<view class="input_box" v-if="type == 0">
			<input class="input_item" v-model="password" @input="onInput" :password="!isSee" placeholder="请输入密码"
				placeholder-class="grey" @confirm="onSubmit" />
			<image v-if="isSee" src="../../static/icon/ic_logon_display.png" mode="aspectFit" @click="isSee = false">
			</image>
			<image v-else-if="!isSee" src="../../static/icon/ic_logon_hide.png" mode="aspectFit" @click="isSee = true">
			</image>
		</view>


		<!-- agree：是否同意勾选  protocolArr：协议数组 @click：勾选同意点击 @protocolClick：协议点击 -->
		<cc-protocolBox :agree="agree" :protocolArr="protocolArr" @click="agree = !agree"
			@protocolClick="protocolClick"></cc-protocolBox>

		<view class="btn_box">
			<button @click="onSubmit" class="active" v-if="btnShow">登录</button>
			<button v-else>登录</button>
		</view>

		<view class="password_register">
			<text @click="onPageJump('/pages/user/register')">注册账号</text>
			<text v-if="type == 0" @click="onPageJump('/pages/user/forget')">忘记密码？</text>
		</view>

	</view>
</template>

<script>
	var clear;
	export default {
		data() {
			return {
				tabArr: ["账号登录", "验证码登录"],
				protocolArr: ["<App登录协议>", "<App隐私协议>"],

				title: 'Hello',
				type: 0,
				isSee: false,
				code: '',
				phone: '',
				password: '',
				//验证码
				codeText: '获取验证码',
				//验证码已发
				readonly: false,
				btnShow: false,
				logo: "",
				agree: false,
				isIos: true,
				isWeixin: true,
				system: 13,
				clearTime: null,

			}
		},
		onLoad() {

		},
		methods: {

			protocolClick(tag) {

				console.log('点击协议序列 = ' + tag);
			},
			// tab点击序列赋值
			tabClick(tag) {

				this.type = tag;
			},

			onPageJump(url) {
				uni.navigateTo({
					url: url
				});
			},

			onInput() {
				this.clearTime && clearTimeout(this.clearTime)
				this.clearTime = setTimeout(() => {
					if (this.type == 1) {
						if (this.phone && this.code) {
							this.btnShow = true;
						} else {
							this.btnShow = false;
						}
					} else {
						if (this.phone && this.password) {
							this.btnShow = true;
						} else {
							this.btnShow = false;
						}
					}
				}, 500);
			},
			//验证码按钮文字状态
			getCodeState() {
				clear && clearInterval(clear);
				const _this = this;
				this.readonly = true;
				this.codeText = '60S';
				var s = 60;
				clear = setInterval(() => {
					s--;
					_this.codeText = s + 'S';
					if (s <= 0) {
						clearInterval(clear);
						_this.codeText = '获取验证码';
						_this.readonly = false;
					}
				}, 1000);
			},
			// 发送验证码
			onSetCode() {
				if (this.readonly) {
					return;
				}
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}
				if (!this.$base.phoneRegular.test(this.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					});
					return;
				}

				this.getCodeState();

			},
			onSubmit() {
				if (!this.agree) {
					uni.showToast({
						title: '请先同意《用户协议》和《隐私协议》',
						icon: 'none'
					});
					return;
				}
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}
				// 手机号校验
				if (!this.$base.phoneRegular.test(this.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					});
					return;
				}
				let httpData = {
					phone: this.phone
				};
				if (this.type == 1) {
					if (!this.code) {
						uni.showToast({
							title: '请输入验证码',
							icon: 'none'
						});
						return;
					}
					httpData.code = this.code;
				} else {
					if (!this.password) {
						uni.showToast({
							title: '请输入密码',
							icon: 'none'
						});
						return;
					}
					httpData.password = (this.password);
				}

			},


		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.register_page {
		padding: calc(var(--status-bar-height) + 30rpx) 50rpx 50rpx 50rpx;
		background-color: #fff;
		min-height: 100vh;
		position: relative;

		.logo {
			image {
				margin: 0 auto;
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
			}
		}


		.triangle {
			position: relative;

			&::before {
				content: '';
				position: absolute;
				top: -20rpx;
				border-left: 18rpx solid transparent;
				border-right: 18rpx solid transparent;
				border-bottom: 18rpx solid #efeef4;
				transition: all 0.4s;
			}

			&::after {
				content: '';
				position: absolute;
				top: -18rpx;
				border-left: 18rpx solid transparent;
				border-right: 18rpx solid transparent;
				border-bottom: 18rpx solid #f8f9fb;
				transition: all 0.4s;
			}
		}

		.left_triangle {
			&::before {
				left: 140rpx;
			}

			&::after {
				left: 140rpx;
			}
		}

		.right_triangle {
			&::before {
				left: 470rpx;
			}

			&::after {
				left: 470rpx;
			}
		}

		.input_box {
			display: flex;
			align-items: center;
			height: 104rpx !important;
			background-color: #f8f9fb;
			border-radius: 8rpx;
			border: solid 2rpx #efeef4;
			padding: 0rpx 40rpx;
			margin-top: 20rpx;

			image {
				width: 36rpx;
				height: 24rpx;
			}

			input {
				flex: 1;
				font-size: 28rpx;
				color: #333;
				height: 60rpx;
			}

			.input_item {
				font-size: 28rpx;
				border: 0px;
				flex: 1;
				background-color: #f8f9fb;
				height: 88rpx;
				width: 100%;
				outline: none;
				//margin-left: 32rpx;
			}

			button {
				height: 60rpx;
				background-color: #f8f9fb;
				font-size: 28rpx;
				padding: 0 14rpx;
				color: $themeColor;
				line-height: 60rpx;
				margin-left: 20rpx;
				//margin-right: 40rpx;
			}

			.grey {
				color: #999999;
			}
		}

		.btn_box {
			margin-top: 40rpx;

			button {
				font-size: 32rpx;
				background-color: #e5e5e5;
				color: #fff;
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 8rpx;

				&.active {
					@include theme('btn_bg') color: #fff;
				}
			}
		}

		.password_register {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			//text-align: center;

			text {
				font-size: 28rpx;
				color: #333333;
				//text-decoration: underline;
			}
		}

	}

	.station {
		height: 230rpx;
	}

	.third_party_login_box {
		position: fixed;
		bottom: 60rpx;
		width: 100%;
		left: 0;
		padding: 0 30rpx;

		.third_party_title {
			display: flex;
			align-items: center;

			&:before,
			&:after {
				content: '';
				flex: 1;
				height: 2rpx;
				background-color: #f5f5f5;
			}

			text {
				font-size: 24rpx;
				color: #999999;
				flex-shrink: 0;
				padding: 0 20rpx;
			}
		}

		.third_party_content {
			margin-top: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 80upx;
				height: 80upx;
				margin: 0 20rpx;
			}
		}
	}
</style>

```