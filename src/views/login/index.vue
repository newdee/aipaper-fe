<template>
  <div class="login_main">
    <div class="login_cont">
      <div class="left_width">
        <div class="grid-content app-left">
          <img
            data-v-5eb08d16=""
            class="left-bg"
            src="https://sso-cdn.lanhuapp.com/ssoweb/img/left.a267cc0b.svg"
            loading="lazy"
          />
          <img
            data-v-5eb08d16=""
            class="logo white"
            src="https://sso-cdn.lanhuapp.com/ssoweb/img/logo.ac863f07.svg"
            loading="lazy"
          />

          <div class="left_content">
            <p>
              提效增效，化繁为简。<br />我们的AI论文助手网站将耗时费力的文献调研与论文撰写变得简洁高效。<br />利用智能技术，我们将复杂写作任务简化，机械性的文献整理工作由先进算法完成。<br />创造性内容交由用户处理节省研究时间，使学术创作更便捷高效。
            </p>
          </div>
          <div data-v-5eb08d16="" class="name-box">
            <img
              data-v-5eb08d16=""
              class="avatar"
              src="https://sso-cdn.lanhuapp.com/ssoweb/img/liugaozheng.b6e3f007.png"
            />
            <div data-v-5eb08d16="" class="text-name">
              <div data-v-5eb08d16="" class="name">乔布斯</div>
              <div data-v-5eb08d16="" class="signature">APPLE · 设计负责人</div>
            </div>
          </div>
        </div>
      </div>
      <div class="app-right">
        <img
          data-v-5eb08d16=""
          class="logo blue"
          src="https://sso-cdn.lanhuapp.com/ssoweb/img/logo_blue.771c60ce.svg"
          loading="lazy"
        />

        <div v-show="phoneStatus" class="home app_router">
          <div class="loginView mainContent">
            <div>
              <div class="loginTitle">欢迎来到AIPaper</div>
              <div class="passView">
                <div class="inputTitle">手机号登录</div>
                <input
                  :class="['phoneView', butNoPhoneNum ? 'warning' : '']"
                  v-model="phoneNum"
                  placeholder="请输入手机号"
                  autocomplete="on"
                  name="username"
                  type="text"
                  style="margin-bottom: 4px"
                /><!---->
                <div class="tips">
                  <p v-if="!rightPhoneNum">这看起来不是一个有效的手机号</p>
                  <p v-if="rightPhoneNum">你需要输入一个手机号</p>
                </div>
              </div>
              <div
                class="loginButton registerButton center"
                @click="loginOrRegister(phoneNum)"
              >
                登录 / 注册
              </div>
              <div class="agreement lanhuText">
                <div data-v-688ca5dc="" class="checkBox" @click="canClick">
                  <img
                    data-v-688ca5dc=""
                    src="https://sso-cdn.lanhuapp.com/ssoweb/img/checked.eb4ff298.svg"
                    alt=""
                    v-show="agreeStatus"
                  />
                  <img
                    v-show="!agreeStatus"
                    data-v-688ca5dc=""
                    src="https://sso-cdn.lanhuapp.com/ssoweb/img/uncheck.b1534115.svg"
                    alt=""
                  />
                </div>
                <span class="lanhuParent">
                  <span class="canClick">我已阅读并同意</span>
                  <span class="lanhu" @click="openNewWindow">服务协议</span>
                  <span>和</span>
                  <span class="lanhu canClick">隐私协议</span>
                </span>
              </div>
              <div class="thirdLogin center">
                <div class="center" style="width: 100%; height: 100%">
                  <div class="line"></div>
                  <div class="text center">或</div>
                </div>
              </div>
              <div class="open_wx_btn center login-btn">
                <div class="wx-box center">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="微信"
                    placement="top"
                  >
                    <svg
                      class="svg-icon"
                      style="width: 40px; height: 40px; color: rgb(0, 0, 0)"
                    >
                      <use xlink:href="#icon-weixin" fill="#000"></use>
                    </svg>
                  </el-tooltip>
                </div>
                <div class="dingding-box center">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="飞书"
                    placement="top"
                  >
                    <svg
                      class="svg-icon"
                      style="width: 40px; height: 40px; color: rgb(0, 0, 0)"
                    >
                      <use xlink:href="#icon-feishu" fill="#000"></use>
                    </svg>
                  </el-tooltip>
                </div>
                <div class="sso-box center">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="GitHub"
                    placement="top"
                    ><svg
                      class="svg-icon"
                      style="width: 40px; height: 40px; color: rgb(0, 0, 0)"
                    >
                      <use xlink:href="#icon-github" fill="#000"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div class="wx_code_box" style="display: none"></div>
        </div>
        <!-- 验证码界面 -->
        <div v-show="!phoneStatus" class="home app_router">
          <div class="loginView mainContent">
            <div>
              <div class="loginTitle">
                <i @click="backInputPhone" class="el-icon-back g_poin"></i>
                输入验证码
              </div>
              <div class="passView">
                <div class="inputTitle">
                  请输入发送至 {{ phoneNum }} 的 6 位验证码，有效期15分钟。
                </div>
                <div
                  v-show="!codeTimeStatus"
                  @click="repeatCode"
                  class="retrieveCode g_poin"
                >
                  <span> 重新获取验证码 </span>
                </div>
                <div v-show="codeTimeStatus" class="timeText">
                  <span class="timeDetail"> {{ secondsLeft }} </span
                  >秒后尝试重新获取验证码
                </div>
                <div>
                  <input-code
                    :phone="phoneNum"
                    @codeChange="codeChange"
                  ></input-code>
                </div>
                <p v-if="codeEndStatus && !codeSuccess" class="codeTag">
                  <i class="el-icon-loading"></i>
                  验证中,请稍等 . . .
                </p>
                <div
                  v-if="!codeEndStatus && codeSuccess"
                  class="codeStatusMessage"
                >
                  <p v-if="!codeRegExrStatus" class="errorText">
                    <i class="el-icon-error"></i>
                    验证码无效，请重试
                  </p>
                  <p v-if="codeRegExrStatus" class="successText">
                    <i class="el-icon-success"></i>
                    验证通过,跳转中....
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="wx_code_box" style="display: none"></div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <span class="lanhuParent">
        <span class="canClick">点击确定表示您已阅读并同意</span>
        <span class="lanhu" @click="openNewWindow">服务协议</span>
        <span>和</span>
        <span class="lanhu canClick">隐私协议</span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setAgreeF">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import inputCode from "./components/inputCode.vue";

import { sms } from "@/api/login";

export default {
  data() {
    return {
      secondsLeft: 60,
      codeTimeStatus: false,
      countdownInterval: null,
      phoneStatus: true,
      codeEndStatus: false,
      codeSuccess: false,
      agreeStatus: false,
      dialogVisible: false,
      phoneNum: "",
      butNoPhoneNum: false,
      rightPhoneNum: true,
      codeRegExrStatus: true,
    };
  },
  components: { inputCode },
  methods: {
    // 重新获取验证码
    repeatCode() {
      // 60秒倒计时
      // 请求成功
      this.codeTimeStatus = false;
      if (this.codeTimeStatus) return; // 如果已经在倒计时，不重复开始
      this.secondsLeft = 60; // 重置为 60 秒
      this.codeTimeStatus = true;
      this.countdownInterval = setInterval(() => {
        this.secondsLeft--;
        if (this.secondsLeft <= 0) {
          clearInterval(this.countdownInterval);
          this.codeTimeStatus = false;
          this.secondsLeft = 0;
          // 可以在这里添加倒计时结束后的处理逻辑
        }
      }, 1000);

      // 失败
      // this.codeTimeStatus = true;
    },
    codeChange(val) {
      if (val == "loading") {
        this.codeEndStatus = true;
        this.codeSuccess = false;
      } else {
        this.codeEndStatus = false;
        this.codeSuccess = true;
        if (val == "success") {
          // 验证码验证成功,页面跳转
          this.codeRegExrStatus = true;
          this.$router.push({ path: "/home" || "/" });
        } else {
          // 验证码验证失败
          this.codeRegExrStatus = false;
        }
      }
    },
    backInputPhone() {
      this.phoneStatus = true;
    },
    setAgreeF() {
      this.agreeStatus = true;
      this.dialogVisible = false;
      this.getCode();
    },
    openNewWindow() {
      window.open(
        "https://lhcdn.lanhuapp.com/declaration/%E8%93%9D%E6%B9%96%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AEV2.pdf",
        "_blank"
      );
    },
    canClick() {
      this.agreeStatus = !this.agreeStatus;
    },
    loginOrRegister(phoneNum) {
      if (phoneNum.trim() == "") {
        console.log("178---无输入内容", phoneNum);
        this.butNoPhoneNum = true;
        this.rightPhoneNum = true;
      } else {
        console.log("189--有输入内容");
        this.butNoPhoneNum = true;
        this.rightPhoneNum = this.checkPhoneNum(phoneNum);

        if (this.rightPhoneNum) {
          console.log("191--有输入内容且正确", this.rightPhoneNum);
          this.butNoPhoneNum = false;
          // 提交用户手机号
          // 判断是否点击已阅读
          if (this.agreeStatus) {
            this.getCode();
          } else {
            this.dialogVisible = true;
          }
        }
      }
    },
    getCode() {
      // 获取验证码
      let data = {
        phone: this.phoneNum,
        // phone: "13164661907",
      };
      console.log("this.data", data);

      sms(data).then((res) => {
        console.log("res", res);
        this.phoneStatus = false;
      });
    },
    checkPhoneNum(phoneNum) {
      let phoneRegex = /^1[3-9]\d{9}$/;
      console.log("199---", phoneRegex.test(phoneNum));

      return phoneRegex.test(phoneNum);
    },
  },
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 939px) {
  .app-left,
  .app_logo {
    display: none;
  }
  .blue {
    display: block !important;
  }
}
.successText {
  color: #67c23a;
}
.codeTag {
  color: #2878ff;
}
.errorText {
  color: #c33026;
}
.retrieveCode {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  color: #2878ff;
  letter-spacing: 0;
  margin-bottom: 40px;
}
.timeText {
  color: rgba(31, 33, 38, 0.7);
  margin: 0 0 40px 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
}
.timeDetail {
  color: #606266;
  font-weight: bold;
}
.app_router {
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-size: 16px;
  font-family: PingFang SC;
  text-align: left;
  width: 100%;
  flex-grow: 1;
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}
.app-right {
  position: relative;
  flex-grow: 1;
}
.loginTitle {
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: 0;
  color: #1f2126;
  margin: 0 0 40px 0;
}
.home .loginView .inputTitle {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  color: rgba(31, 33, 38, 0.7);
  margin: 0 0 8px 0;
}
.phoneView {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  --leave-note: 30px;
  -webkit-font-smoothing: antialiased;
  width: calc(100% - 2px);
  margin: 0 1px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid #e4e4e5;
  height: 50px;
  padding: 11px 12px;
  display: flex;
  font-size: 16px;
  margin-bottom: 4px;
}
.phoneView:focus {
  border: 2px solid #2878ff !important;
  margin: 0 !important;
  background-color: #fff !important;
  outline: none !important;
}
.loginButton {
  width: 100%;
  height: 50px;
  background: #2878ff;
  border-radius: 50px;
  margin-top: 40px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  font-weight: 500;
  cursor: pointer;
}
.agreement {
  margin: 17px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #2f2e3fa6;
  font-size: 14px;
}
.lanhu {
  color: #2878ff;
  margin: 0 7px;
  cursor: pointer;
  font-weight: 500;
}
::v-deep .el-dialog {
  margin-top: 35vh !important;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.open_wx_btn {
  background: #fff !important;
  color: #2f2e3f !important;
  margin-top: 24px !important;
  display: flex;
  justify-content: space-around;
  padding: 0 60px;
}
.open_wx_btn > div :hover {
  cursor: pointer;
}
.thirdLogin .line {
  height: 1px;
  background: #eeeff1;
  width: 100%;
  position: absolute;
}
.thirdLogin .text {
  width: 24px;
  height: 100%;
  font-weight: 500;
  font-size: 14px;
  color: rgba(47, 46, 63, 0.45);
  background: #fff;
  z-index: 1;
}
.thirdLogin {
  margin-top: 32px;
  position: relative;
}
.checkBox {
  width: 24px;
  height: 24px;
  display: inline-block;
}
.home .mainContent {
  width: 400px;
  min-height: 500px;
}
.blue {
  display: none;
}
.app-right {
  position: relative;
}
.login_cont {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.login_main {
  height: 100vh;
  overflow: hidden;
}
.app-left {
  height: 100vh;
  width: 560px;
  background: #216bee;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  text-align: left;
  overflow: hidden;
  .left-bg {
    width: 100%;
  }
  .left_content {
    font-size: 20px;
    font-weight: 500;
    line-height: 40px;
    letter-spacing: 0;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 448px;
    transform: translate(-50%, -50%);
  }
  .name-box {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    left: 56px;
    bottom: 60px;
    width: 448px;
  }
  .avatar {
    border-radius: 50%;
    width: 50px;
    display: block;
  }
  .text-name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1px 8px;
    .name {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0;
      color: #fff;
      opacity: 80%;
    }
    .signature {
      opacity: 0.7;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0;
      color: #fff;
    }
  }
}
.logo {
  position: absolute;
  left: 56px;
  top: 56px;
  z-index: 10;
  width: 108px;
  height: 38px;
}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

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
      background-color: rgba(30, 144, 255, 0.5);
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
  background-image: linear-gradient(-90deg, #1e90ff 50%, #00bfff 100%);
  border-radius: 100px;
  font-size: 26px;
  text-align: center;
  color: #fff;
}

input.phoneView.warning {
  border: 2px solid #ea4f3d;
  margin: 0;
  background-color: #fff5f5;
}
input.phoneView + div.tips {
  display: none;
  color: #ea4f3d;
}
input.phoneView.warning + div.tips {
  display: block;
}
</style>
