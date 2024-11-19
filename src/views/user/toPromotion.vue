<template>
  <div>
    <!-- 推广活动宣传页 -->
    <!-- banner -->
    <div class="sec sec1">
      <div class="bannerBox">
        <div class="banner">
          <!-- <img src="" alt=""> -->
        </div>
        <img src="" class="imgRight" alt="" />
      </div>
      <div class="txtBox">
        <h1>万象写作推广大使邀新奖励</h1>
        <h2 class="gray">推荐好友XXXX现金，推广大使仅限个人实名认证用户参与</h2>
        <el-button type="primary" class="btn">我要推广</el-button>
      </div>
    </div>
    <!-- 推荐福利 -->
    <div class="sec sec2">
      <p class="title1">推荐福利</p>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "promotion",
  data() {
    return {
      // 定义变量
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";
@import "@/styles/mediaMain.scss";
@import "@/styles/index.scss";

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
// @media only screen and (max-width: 768px) {
// }
.sec {
  position: relative;
}

// 媒体查询
@media only screen and (max-width: 769px) {
  sec1 {
    width: 100%;
    height: 400px;
    background-image: linear-gradient(-45deg, #3967ff, #b500fe);
  }
  .txtBox {
    width: 100%;
    padding: 260px 20px 0;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    padding-top: 216px;
    h1 {
      font-size: 24px;
      margin-bottom: 0.5em;
    }
    h2 {
      font-size: 14px;
    }
  }
}
@media screen and (min-width: 769px) {
  .sec1 {
    width: 100%;
    height: 500px;
    background-image: linear-gradient(-45deg, #3967ff, #b500fe);
  }
  .txtBox {
    width: 1180px;
    height: 100%;
    margin: 0 auto;
    padding-top: 158px;
    position: relative;
    z-index: 30;
    h1 {
      font-size: 42px;
      margin-bottom: 1em;
    }
    h2 {
      font-size: 16px;
    }
  }
  .bannerBox {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.txtBox {
  .btn {
    padding: 10px 20px;
    font-size: 16px;
    width: 136px;
    height: 44px;
    margin-top: 100px;
  }
}
.title1 {
  font-size: 18px;
  margin: 10px 0;
}
</style>
