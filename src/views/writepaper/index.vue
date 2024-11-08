<template>
  <div class="mainContentSec" ref="mainSec">
    <!-- 页面名称 -->
    <!-- <div style="padding: 0 10px">
      <swiper-one class="topSwiper"></swiper-one>
    </div> -->
    <global-modal ref="globalModal"> </global-modal>
    <!-- tabs{{ $t("route.writePaper") }}  -->
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
      <outline @errorBack="errorBack"></outline>
    </div>

    <div class="stepContent">
      <step0 v-if="activeIndex != 3"></step0>

      <step1 v-if="activeIndex == 1"></step1>
      <step2 :outlineData="outlineData" v-if="activeIndex == 2"></step2>
      <step3
        v-if="activeIndex == 3"
        :class="[isScrollActive ? 'fixed' : '']"
      ></step3>
    </div>

    <!-- 论文查询生辰弹窗 -->
    <order-dialog
      :requestKey="requestKey"
      :payStatus="payStatus"
      :paperPercent="paperPercent"
    ></order-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";

import swiperOne from "./components/swiperOne.vue";
// import eventBus from "@/utils/eventBus";
import step0 from "./components/step0.vue";
import step1 from "./components/step1.vue";
import step2 from "./components/step2.vue";
import outline from "./components/outline.vue";
import step3 from "./components/step3.vue";
import eventBus from "@/utils/eventBus";
import emitter from "@/utils/eventBus";
import { outlineStatus } from "@/api/user";
import orderDialog from "./components/orderDialog.vue";

export default {
  name: "writepaper",
  data() {
    return {
      // 定义变量
      isScrollActive: false,
      outlineData: [],
      requestKey: "", //out_trade_no
      payStatus: 0,
      paperPercent: 0,
    };
  },
  components: {
    // webinfo,
    swiperOne,
    outline,
    step3,
    step2,
    step1,
    step0,
    orderDialog,
  },
  mounted() {
    // 页面初始化
    window.addEventListener("scroll", this.handleScroll);
    // this.$store.dispatch("app/setActiveIndex", 2);
  },
  created() {
    eventBus.on("showEmitPaperDialog", this.showPaperDialog); // 订阅事件

    eventBus.on("emitOulineClick", this.showIndex); // 订阅事件
    eventBus.on("successOutline", this.showOutLine); // 订阅事件
    eventBus.on("pdfSuccessClick", this.showIndex3); // 订阅事件
  },
  beforeDestroy() {
    eventBus.off("showEmitPaperDialog", this.showPaperDialog); // 订阅事件

    eventBus.off("emitOulineClick", this.showIndex); // 移除事件监听
    eventBus.off("successOutline", this.showOutLine); // 移除事件监听
    eventBus.off("pdfSuccessClick", this.showIndex3); // 订阅事件

    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    device: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val == "mobile") {
          eventBus.emit("open-modal", true); // 发布事件
        }
      },
    },
  },
  computed: {
    // 计算属性
    ...mapGetters(["activeIndex", "device"]),
  },
  methods: {
    // 展示论文加载弹窗
    showPaperDialog(data) {
      this.requestKey = data.requestKey;
      this.payStatus = Date.now();
      if (data.paperPercent && data.paperPercent > 0) {
        this.paperPercent = data.paperPercent;
      }
    },
    // 定义方法
    errorBack() {
      // this.tabsClick(0);
      // this.activeIndex = 0;
      this.$store.dispatch("app/setActiveIndex", 0);
    },
    // 点击生成大纲
    showIndex() {
      console.log("ddddd", this.activeIndex);
      // this.activeIndex = 1;
      this.$store.dispatch("app/setActiveIndex", 1);
      this.$nextTick(() => {
        eventBus.emit("beginTime", 500);
        this.$scrollTo("#step1", 500, { offset: -100 });
      });
    },
    showIndex3(pdfUrl) {
      console.log("showIndex3showIndex3showIndex3showIndex3");
      // let pdfUrl =
      // "https://file.mixpaper.cn/paper/case/4fd240e4-cad3-4e87-a8d4-1eda7a2cbe4d/second/output.pdf";
      // this.activeIndex = 3;
      this.$store.dispatch("app/setActiveIndex", 3);

      this.$nextTick(() => {
        this.$store.dispatch("app/togglePDFUrl", pdfUrl);
      });
    },
    showOutLine(data) {
      console.log("indexOutline", data);
      this.outlineData = {};

      this.outlineData = data;
      this.tabsClick(2);
    },
    tabsClick(val) {
      // this.activeIndex = val;
      this.$store.dispatch("app/setActiveIndex", val);

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

  beforeRouteUpdate(to, from, next) {
    // 当路由的查询参数发生变化时，这个方法会被调用
    // this.activeIndex = to.query.activeIndex || 0;
    // console.log("dddddddddddddddddddd---------", to, from,);

    if (to.query.key1) {
      let data = {
        key: to.query.key1,
      };
      outlineStatus(data).then((res) => {
        this.showOutLine(res.result.outline.outline);
        // 复现大纲接口
        let data = {
          title: res.result.title,
          language: res.result.language,
          field: ["查看大纲", to.query.field],
          // type: this.requestForm.type,
          key: to.query.key1,
          type: "本科",
        };
        // 保存大纲输入信息
        this.$store.dispatch("app/setRequestForm", data);
        // 填充大纲列表数据
      });
    }
    console.log("Query parameter changed:", to.query);
    next();
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
    font-weight: bold;
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
