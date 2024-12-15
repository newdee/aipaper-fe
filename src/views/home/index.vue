<template>
  <div>
    <!-- <el-button type="success" @click="jump">跳转到原页面</el-button> -->
    <!-- 公告管理 -->
    <!-- <announcement></announcement> -->
    <!-- 页面名称 -->
    <div class="carouselBox" v-if="carouseStatus">
      <div class="carouselCon">
        <el-carousel height="44px" direction="vertical" :autoplay="true">
          <el-carousel-item v-for="item in 3" :key="item">
            <p class="homeSwiper">
              <img
                src="https://mixpaper.cn/static/img/MIXPAPER.d3c7dfc9.png"
                alt=""
              />
              热烈庆祝万象写作获得RRE 300万美金风投！
            </p>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- <el-button type="success" @click="jump2">跳转详情页</el-button> -->
    <search-paper class="searchPaper"></search-paper>

    <div class="swiperBg">
      <input-main class="swiper swiper1"></input-main>
      <div class="swiperBg swiperNews pwrapper">
        <p class="swiper swiperListTitle1">
          <span> 用户心声</span>
        </p>
      </div>
      <swiper-three class="swiper swiper2"></swiper-three>
    </div>
    <!-- 优势页面 -->
    <advantage class="swiper swiper3"></advantage>
    <!-- <el-button @click="getList">点击</el-button> -->
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";

import inputMain from "./components/inputMain.vue";
import swiperThree from "./components/swiperThree.vue";
import advantage from "./components/advantage.vue";
import searchPaper from "./components/searchPaper.vue";
// import eventBus from "@/utils/eventBus";
import { getDomain } from "@/utils/index.js";
// import announcement from "@/components/announcement/index.vue";
export default {
  name: "index",
  data() {
    return {
      // 定义变量
      carouseStatus: true,
    };
  },
  components: {
    inputMain,
    advantage,
    searchPaper,
    swiperThree,
    // announcement,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // window.zhuge.load("aecb263210174e7994293e947ccaedba", { debug: true });
  },
  created() {
    console.log("getDomain", getDomain());

    // eventBus.on("sendOutline", this.addE); // 订阅事件
    zhuge.track(`访问域名`, {
      domain: getDomain(),
    });
    // zhuge.track("购买商品", {
    //   name: "手机",
    //   price: "iPhone XS",
    //   num: 2,
    // });
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
    getList() {
      console.log(window.zhuge);
      window.zhuge.track("首页点击按钮", {
        path: "MyButton",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
@import "./index.scss";

.swiperBg {
  background: #fff;
  padding-bottom: 40px;
}

.pwrapper {
  padding-bottom: 0px;
  // margin-top: 60px;
  .swiperListTitle1 {
    text-align: left;
    padding-top: 22px;

    span {
      display: inline-block;
      text-align: center;
      background: rgb(19, 34, 122);
      border-radius: 30px;
      line-height: 60px;
      font-size: 30px;
      color: #fff;
      padding: 0 1.7em;
    }
  }
}
// ddd

.carouselBox {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  .carouselCon {
    width: 1100px;
  }
}
.homeSwiper {
  font-size: 14px;
  line-height: 44px;
  text-align: center;
  color: #1d1d1f;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 115px;
    height: 19px;
    margin-right: 10px;
  }
}
</style>
