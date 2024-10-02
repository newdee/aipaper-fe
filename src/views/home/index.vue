<template>
  <div>
    <!-- <el-button type="success" @click="jump">跳转到原页面</el-button> -->
    <!-- 页面名称 -->
    <!-- <el-button type="success" @click="jump2">跳转详情页</el-button> -->
    <search-paper class="searchPaper"></search-paper>
    <input-main class="swiper swiper1"></input-main>
    <swiper-three class="swiper swiper2"></swiper-three>
    <!-- 优势页面 -->
    <advantage class="swiper swiper3"></advantage>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";

import { getHomeInfo } from "@/api/user";

import inputMain from "./components/inputMain.vue";
import swiperThree from "./components/swiperThree.vue";
import advantage from "./components/advantage.vue";
import searchPaper from "./components/searchPaper.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "index",
  data() {
    return {
      // 定义变量
    };
  },
  components: {
    inputMain,
    advantage,
    searchPaper,
    swiperThree,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
    // 获取首页数据
    this.$nextTick(() => {
      getHomeInfo().then((res) => {
        console.log(res.result, "res");
        this.$store.dispatch("app/setHomeData", res.result);
      });
    });
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
    jump() {
      this.$router.push("/dashboard");
    },
    jump2() {
      this.$router.push("/main/explore");
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
@import "./index.scss";
</style>
