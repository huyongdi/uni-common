<template>
	<view class="uni-flex uni-column">
		<image class="login-logo" src="/static/my.jpg"></image>
		<view class="text-input">
			<view class="iconfont icon-xm"></view>
			<text class="login-text">用户：</text>
			<input class="uni-input" v-model="name" focus placeholder="请输入用户名" />
		</view>
		<view class="text-input">
			<view class="iconfont icon-pwd"></view>
			<text class="login-text">密码：</text>
			<input class="uni-input" v-model="pwd" placeholder="请输入密码" :password="showPassword" />
			<text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword">&#xe568;</text>
		</view>
		<checkbox-group @change="remChange" class="rem-pwd">
			<label>
				<checkbox :checked="remPwd" />
				<text class="rem-text">记住密码</text>
			</label>
		</checkbox-group>
		<button class="login-btn" type="primary" @tap="login">登录</button>
		<uni-popup ref="popup" type="message">
			<uni-popup-message type="warn" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	export default {
		data() {
			return {
				remPwd: false,
				name: '',
				pwd: '',
				showPassword: true,
				message: ''
			}
		},
		components: {
			uniPopup,
			uniPopupMessage
		},
		onLoad() {
			this.getNamePwd()
		},
		methods: {
			//查看和隐藏密码
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			// 记住密码勾选和取消
			remChange: function(e) {
				const len = e.detail.value.length
				this.remPwd = !!len
			},
			// 判断缓存看是否填充用户名和密码
			getNamePwd: function() {
				const Hname = uni.getStorageSync('Hname');
				const Hpwd = uni.getStorageSync('Hpwd');
				if (Hname && Hpwd) {
					this.name = Hname;
					this.pwd = Hpwd;
					this.remPwd = true
				}
			},
			login: function() {
				const $this = this
				const {
					name,
					pwd
				} = this
				// 先判断是否用户名密码都填了
				if (name && pwd) { // 然后判断勾选了记住密码没
					uniCloud.callFunction({
							name: 'user',
							data: {
								name,
								pwd
							}
						})
						.then(res => {
							const {
								code,
								msg
							} = res.result

							if (code === 201) {
								uni.setStorageSync('Hname', $this.remPwd ? name : '')
								uni.setStorageSync('Hpwd', $this.remPwd ? pwd : '')
								console.log(222222)
								uni.navigateTo({
									url: '/pages/index/index?id=3'
								})
							} else {
								this.message = msg
								$this.$refs.popup.open()
							}
						})
				} else {
					this.message = '请输入用户名和密码！'
					this.$refs.popup.open()
				}
			}
		}
	}
</script>

<style lang="less">
	.login-logo {
		height: 40vh;
		width: 100%;
		margin-bottom: 2vh;
	}

	.flex-item-V {
		width: 100%;
		height: 250rpx;
		text-align: center;
		line-height: 150rpx;
	}

	.text-input {
		display: flex;
		font-size: 30rpx;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		margin-bottom: -1px;

		.iconfont {
			margin: 20rpx;
		}

		.login-text {
			height: 6vh;
			line-height: 6vh;
			width: 120rpx;
		}

		.uni-eye-active {
			color: #007AFF;
		}

		.uni-icon {
			height: 6vh;
			line-height: 6vh;
			margin-right: 10rpx;
		}
	}

	.rem-pwd {
		font-size: 30rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;

		.rem-text {
			margin-left: 10rpx;
		}
	}

	.login-btn {
		width: 500rpx;
		margin-top: 50rpx;
	}
</style>
