<template>
  <div>
    <!-- 页面名称 -->
    <swiper-one></swiper-one>

    <!-- tabs写论文 -->
    <div class="tabsList">
      <div 
      :class="['tabLi', activeIndex == 1 ? 'activeTab': ''] "
      >
        <p class="tabsTitle">Step 1</p>
        <div class="tabIcon">
          <span></span>
        </div>
        <p class="tabIntro">
        填写需求 <span>生成大纲</span>
        </p>
      </div>
      <div 
      :class="['tabLi', activeIndex == 2 ? 'activeTab': ''] "
      >
        <p class="tabsTitle">Step 2</p>
        <div class="tabIcon">
          <span></span>
        </div>
        <p class="tabIntro">
        填写需求 <span>生成大纲</span>
        </p>
      </div>
      <div 
      :class="['tabLi', activeIndex == 3 ? 'activeTab': ''] "
      >
        <p class="tabsTitle">Step 3</p>
        <div class="tabIcon">
          <span></span>
        </div>
        <p class="tabIntro">
        填写需求 <span>生成大纲</span>
        </p>
      </div>
    </div>
    <div @click="tabStapAdd" class="tabsContent">
      下一步
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
import swiperOne from "@/views/home/components/inputMain.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "myFooter",
  data() {
    return {
      // 定义变量
      activeIndex: 1
    };
  },
  components: {
    // webinfo,
    swiperOne
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
    tabStapAdd() {
      if (this.activeIndex <=3) {
        this.activeIndex += 1
      }
    }
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
.tabsList {
  // : 1200px;
  width: 100%;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #E6EDFF;
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
      background: #FFFFFF;
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
      color:#3355FF;
      margin-left: -5px;
    }
  }
  .activeTab {
    background-color: #fff !important;
    .tabsTitle {
      color: #3355FF;
    }
  .tabIcon {
      background-color: #3355FF;
    }
  }
}
</style>
