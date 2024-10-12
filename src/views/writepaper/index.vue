<template>
  <div class="mainContentSec" ref="mainSec">
    <!-- 页面名称 -->
    <div style="padding: 0 10px">
      <swiper-one class="topSwiper"></swiper-one>
    </div>

    <!-- tabs写论文  -->
    <div class="tabsListWrapper" ref="tasListWrapper">
      <div class="tabsList">
        <div
          :class="[
            'tabLi',
            activeIndex == 1 || activeIndex == 0 ? 'activeTab' : '',
          ]"
        >
          <p class="tabsTitle">Step 1</p>
          <div class="tabIcon">
            <span></span>
          </div>
          <p class="tabIntro">填写需求 <span>生成大纲</span></p>
        </div>
        <div :class="['tabLi', activeIndex == 2 ? 'activeTab2' : '']">
          <p class="tabsTitle">Step 2</p>
          <div class="tabIcon">
            <span></span>
          </div>
          <p class="tabIntro">检查大纲 <span>生成正文</span></p>
        </div>
        <div :class="['tabLi', activeIndex == 3 ? 'activeTab3' : '']">
          <p class="tabsTitle">Step 3</p>
          <div class="tabIcon">
            <span></span>
          </div>
          <p class="tabIntro">查收正文 <span>无限改稿</span></p>
        </div>
      </div>
    </div>
    <!-- step3不展示论文 -->
    <div v-if="activeIndex !== 3" class="outlineBox">
      <outline></outline>
    </div>
    <div class="stepContent">
      <step1 v-if="activeIndex == 1"></step1>
      <step2 :outlineData="outlineData" v-if="activeIndex == 2"></step2>
      <step3
        v-if="activeIndex == 3"
        :class="[isScrollActive ? 'fixed' : '']"
      ></step3>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
import swiperOne from "./components/swiperOne.vue";
// import eventBus from "@/utils/eventBus";
import step1 from "./components/step1.vue";
import step2 from "./components/step2.vue";
import outline from "./components/outline.vue";
import step3 from "./components/step3.vue";
import { getHomeInfo } from "@/api/user";
import eventBus from "@/utils/eventBus";
import emitter from "@/utils/eventBus";

export default {
  name: "writepaper",
  data() {
    return {
      // 定义变量
      activeIndex: 2,
      isScrollActive: false,
      outlineData: {},
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
    window.addEventListener("scroll", this.handleScroll);
    // 获取首页数据
    this.$nextTick(() => {
      getHomeInfo().then((res) => {
        console.log(res.result, "res");
        this.$store.dispatch("app/setHomeData", res.result);
      });
    });
  },
  created() {
    eventBus.on("emitOulineClick", this.showIndex); // 订阅事件
    eventBus.on("successOutline", this.showOutLine); // 订阅事件
  },
  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
    // 点击生成大纲
    showIndex() {
      console.log("ddddd", this.activeIndex);
      this.activeIndex = 1;
      this.$nextTick(() => {
        eventBus.emit("beginTime", 5);
      });
    },
    showOutLine(data) {
      console.log("indexOutline", data);
      this.outlineData = data;
      this.tabsClick(2);
    },
    tabsClick(val) {
      this.activeIndex = val;
      if (val == 2) {
        this.$nextTick(() => {
          this.$scrollTo("#top", 500, { offset: -100 });
        });
      }
    },
    tabStapAdd() {
      if (this.activeIndex <= 3) {
        this.activeIndex += 1;
      }
    },
    handleScroll() {
      const element = this.$refs.mainSec;
      const elementTop = element.getBoundingClientRect().top; // 当元素顶部到达页面顶部时添加 active 类

      if (elementTop <= -300) {
        this.isScrollActive = true;
      } else {
        this.isScrollActive = false;
      }
    },
  },
  beforeDestroy() {
    eventBus.off("emitOulineClick", this.showIndex); // 移除事件监听
    window.removeEventListener("scroll", this.handleScroll);
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

.topSwiper ::v-deep .swiperBox {
  margin-top: 0px;
}

.mainContentSec {
  // background-color: #f5f8ff;
  overflow: hidden;
}

.tabsListWrapper {
  // : 1200px;
  width: 100%;
  max-width: 1200px;
  padding-top: 16px;
}
.tabsList {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #e6edff;
}

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
  background: url("../../assets/images/shape-left.png") no-repeat 0 0 / 100%
    100% !important;

  .tabsTitle {
    color: #3355ff;
  }

  .tabIcon {
    background-color: #3355ff;
  }
}

.activeTab2 {
  background: url("../../assets/images/shape.png") no-repeat 0 0 / 100% 100% !important;

  .tabsTitle {
    color: #3355ff;
  }

  .tabIcon {
    background-color: #3355ff;
  }
}

.activeTab3 {
  background: url("../../assets/images/shape-right.png") no-repeat 0 0 / 100%
    100% !important;

  .tabsTitle {
    color: #3355ff;
  }

  .tabIcon {
    background-color: #3355ff;
  }
}
.stepContent {
  margin-top: 16px;
  margin-bottom: 16px;
}

.fixed ::v-deep .stickyBox {
  width: 100%;
  position: fixed;
  top: 90px;
  z-index: 100;
}
</style>
