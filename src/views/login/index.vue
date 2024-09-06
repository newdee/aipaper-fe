<template>
  <div class="phone-verify-wrap">


    <section class="phone-verify">
      <div class="phone-input">
        <div class="label-text">手机号</div>
        <div class="input-box">
          <input class="phone-input-num" type="number" pattern="[0-9]*" v-model="phone" placeholder="输入手机号" />
          <a
            href="javascript:;"
            v-if="!getCodeLock"
            class="get-code"
            @click="getCodeAction()"
          >{{codeButtonText}}</a>
          <a href="javascript:;" v-else class="get-code"><em>{{codeButtonText}}</em></a>
        </div>
      </div>
      <div class="phone-input">
        <div class="label-text">验证码</div>
        <div class="input-box">
          <input class="phone-input-code" type="number" pattern="[0-9]*" v-model="verifyCode" placeholder="输入验证码" />
        </div>
      </div>
    </section>
    <div class="verify-button" @click="validate">登录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getCodeLock: false,
      codeButtonText: '获取验证码',
      phone: '',
      verifyCode: ''
    }
  },
  methods: {
    // 获取json数据
    getJsonData() {
      this.$http.get('../../static/user.json').then((res) => {
        const number = res.data.phoneList.verifyCode
        this.verifyCode = number
      })
    },
    // 获取验证码
    getCodeAction() {
      if (!this.phone) {
        alert('请填写手机号')
        return
      }

      if (!/^1\d{10}$/.test(this.phone)) {
        alert('请输入正确的手机号码')
        return
      }

      this.getJsonData()

      if (this.getCodeLock) {
        return
      }

      this.getCodeLock = true
      this.timer()
    },
    // 倒计时
    timer() {
      let that = this
      let count = 60

      function setInvalTime() {
        if (count === 0) {
          that.codeButtonText = '获取验证码'

          clearInterval(phoneTimer)

          that.getCodeLock = false
        } else {
          that.codeButtonText = count + '秒后重试'
        }

        count--
      }

      setInvalTime()

      let phoneTimer = setInterval(() => {
        setInvalTime()
      }, 1000)
    },
    // 提交验证
    validate() {
      if (!this.phone) {
        alert('请输入您的手机号码')
        return
      }

      if (!this.verifyCode) {
        alert('请输入您收到的验证码')
        return
      }

      if (this._loginLocked) {
        return
      }

      this.getUserInfo()
    },
    // 为home页传值
    getUserInfo() {
      const userName = this.phone
      console.log(userName)
      this.$router.push({
        path: './home',
        query: {
          userName: userName
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.phone-verify {
  width: 100%;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.phone-input {
  display: flex;
  align-items: center;

  .label-text {
    width: 100px;
    text-align: center;
    justify-conent: center;
    font-size: 20px;
    color: #222;
  }

  .input-box {
    position: relative;
    flex: 1;

    .phone-input-num,
    .phone-input-code {
      width: 100%;
      font-size: 20px;
      color: #666;
      height: 80px;
      border: none;
    }

    .get-code {
      position: absolute;
      top: 15px;
      right: 20px;
      bottom: 15px;
      width: 130px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: rgba(30, 144, 255, .5);
      border-radius: 8px;
      font-size: 18px;
      color: #fff;
    }
  }

  &:not(:last-child) {
    .input-box {
      border-bottom: 1dpx solid #e5e5e5;
    }
  }
}

.verify-button {
  display: block;
  margin: 40px 20px 0;
  height: 70px;
  line-height: 70px;
  border: none;
  background-image: linear-gradient(-90deg, #1E90FF 50%, #00BFFF	 100%);
  border-radius: 100px;
  font-size: 26px;
  text-align: center;
  color: #fff;
}
</style>
