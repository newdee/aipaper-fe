<template>
  <div class="mainContentSec">
    <!-- 页面名称 -->
    <swiper-one class="topSwiper"></swiper-one>

    <!-- tabs写论文 -->
    <div class="tabsList">
      <div :class="['tabLi', activeIndex == 1 ? 'activeTab' : '']">
        <p class="tabsTitle">Step 1</p>
        <div class="tabIcon">
          <span></span>
        </div>
        <p class="tabIntro">填写需求 <span>生成大纲</span></p>
      </div>
      <div :class="['tabLi', activeIndex == 2 ? 'activeTab' : '']">
        <p class="tabsTitle">Step 2</p>
        <div class="tabIcon">
          <span></span>
        </div>
        <p class="tabIntro">填写需求 <span>生成大纲</span></p>
      </div>
      <div :class="['tabLi', activeIndex == 3 ? 'activeTab' : '']">
        <p class="tabsTitle">Step 3</p>
        <div class="tabIcon">
          <span></span>
        </div>
        <p class="tabIntro">填写需求 <span>生成大纲</span></p>
      </div>
    </div>
    <div class="outlineBox">
      <outline></outline>
    </div>
    <div class="stepContent">
      <step1></step1>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
import swiperOne from "@/views/home/components/inputMain.vue";
// import eventBus from "@/utils/eventBus";
import step1 from "./components/step1.vue";
import step2 from "./components/step2.vue";
import outline from "./components/outline.vue";
import step3 from "./components/step3.vue";
import { getHomeInfo } from "@/api/user";

export default {
  name: "writepaper",
  data() {
    return {
      // 定义变量
      activeIndex: 1,
    };
  },
  components: {
    // webinfo,
    swiperOne,
    outline,
    step3,
    step2,
    step1,
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
    tabStapAdd() {
      if (this.activeIndex <= 3) {
        this.activeIndex += 1;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.topSwiper ::v-deep .sliderImgBox img {
  width: 100%;
  height: 100%;
}
.mainContentSec {
  // background-color: #f5f8ff;
}
.tabsList {
  // : 1200px;
  width: 100%;
  max-width: 1200px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e6edff;
  .tabLi {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 130px;
  }

  .tabsTitle {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #000000;
    line-height: 25px;
    text-align: left;
    font-style: normal;
  }

  .tabIcon {
    width: 38px;
    height: 38px;
    background: #999999;
    border-radius: 19px;
    margin: 7px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: #ffffff;
      border-radius: 8px;
    }
  }

  .tabIntro {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 22px;
    text-align: center;
    font-style: normal;

    span {
      color: #3355ff;
      margin-left: -5px;
    }
  }

  .activeTab {
    background-color: #fff !important;

    .tabsTitle {
      color: #3355ff;
    }
    .tabIcon {
      background-color: #3355ff;
    }
  }
}
.stepContent {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
