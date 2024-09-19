<template>
  <div class="wrapper">
    <div class="topBar">
      <i class="el-icon-arrow-left" @click="goBack"></i>
      账号设置
    </div>
    <div class="userInfoBox">
      <!-- 页面名称 -->
      <div class="info">
        <div class="info_left">
          <span class="userNameIcon">高</span>
        </div>
        <div class="info_right"></div>
      </div>
      <div class="info">
        <div class="info_left">
          <p class="infoLabel">用户名</p>
          <p class="InfoValue">高高</p>
        </div>
        <div class="info_right">
          <el-button @click="$devf">编辑</el-button>
        </div>
      </div>
      <div class="info">
        <div class="info_left">
          <p class="infoLabel">手机号</p>
          <p class="InfoValue">13612344321</p>
        </div>
        <div class="info_right">
          <el-button @click="$devf">编辑</el-button>
        </div>
      </div>
      <div class="info">
        <div class="info_left">
          <p class="infoLabel">密码</p>
          <p class="InfoValue">******</p>
        </div>
        <div class="info_right">
          <el-button @click="$devf">编辑</el-button>
        </div>
      </div>
      <div class="info">
        <el-button @click="loginOut">退出登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import { getToken, removeToken } from "@/utils/auth"; // get token from cookie

export default {
  name: "UserInfo",
  data() {
    return {
      // 定义变量
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // 页面初始化
  },

  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
    goBack() {
      // 使用 history.back() 方法返回上一页
      history.back();
    },
    loginOut() {
      removeToken();
      this.$router.push("/home");
      // location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
* p {
  margin: 0px;
}
.wrapper .topBar {
  line-height: 3em;
  padding: 0 2em;
  border-bottom: 1px solid #0000001f;
  user-select: none;
}
.wrapper .topBar i {
  margin-right: 20px;
}
.userInfoBox {
  min-width: 400px;
  max-width: 600px;
  margin: 0 auto;
  // background: rgb(136, 134, 134);
  padding: 20px 0;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #0000001f;
  padding: 10px;
}
.info:first-child {
  border-bottom: 0px;
}
.info:last-child {
  border-bottom: 0px;
  padding: 20px 0;
}
.info_left .userNameIcon {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  background: pink;
  color: #fff;
}
.info_left .infoLabel {
  line-height: 2em;
  font-size: 16px;
  color: #000;
}
.info_left .InfoValue {
  line-height: 2em;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
