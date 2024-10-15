<template>
  <div class="step1Box">
    <!-- 编辑大纲，生成全文 -->
    <div class="outlineIntroNew">
      <p class="introTitle">编辑大纲，生成全文</p>
      <p class="introSubtitle">
        🔔
        大纲可直接<span>点击编辑</span>，点击小节右侧按钮，为小节增加<span>参考资料、数据(表)、图、公式、代码段</span>，对该小节进行<span
          >增加、删减</span
        >
      </p>
    </div>
    <!-- 论文标题
        -->
    <p class="oulineTitlePaper"><span>题目: </span>{{ requestForm.title }}</p>
    <p class="outlineTitleDesc">
      <span>科目: </span>{{ requestForm.field[1] }}
    </p>
    <!-- 页面名称 -->
    <div class="progressBox">
      <div class="pgBoxEl">
        <el-progress
          :text-inside="true"
          :percentage="currentNumber"
          type="circle"
          :width="150"
        ></el-progress>
        <div class="progressText">
          <p>大纲生成<i class="el-icon-loading"></i></p>
          <p class="progressNumber">{{ currentNumber }}%</p>
        </div>
      </div>
    </div>
    <!-- 滚动标签 -->
    <div id="step1"></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";
import { title } from "@/settings";
import eventBus from "@/utils/eventBus";

export default {
  name: "step1",
  data() {
    return {
      // 定义变量
      currentNumber: 0,
      title: "艺术批评的时间作用及发展历程",
      descri: "1201 艺术学理论类",
      intervalId: null,
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
    eventBus.on("beginTime", this.addE); // 订阅事件
  },
  beforeDestroy() {
    eventBus.off("beginTime", this.addE); // 移除事件监听
  },
  computed: {
    ...mapGetters(["requestForm"]),
    // 计算属性
  },
  methods: {
    // 定义方法
    // 生成大纲
    addE(index) {
      clearInterval(this.intervalId); // 达到目标数字时清除定时器
      this.currentNumber = 0;
      this.countUpToHundred(index);
    },
    countUpToHundred(seconds) {
      this.currentNumber = 0;
      const targetNumber = 99;
      const totalSteps = targetNumber - this.currentNumber;

      // 计算每一步所需的时间（毫秒）
      const stepTimeMs = (seconds * 1000) / totalSteps;

      this.intervalId = setInterval(() => {
        this.currentNumber++;

        if (this.currentNumber >= targetNumber) {
          clearInterval(this.intervalId); // 达到目标数字时清除定时器
          this.getList();
        }
      }, stepTimeMs);
    },
    // 渲染大纲
    getList() {
      // this.outLineStatus = false;
      // 判断展示那个大纲
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
.step1Box {
  // width: ;
  height: 500px;
  background-color: #fff;
  max-width: 1200px;
}

.progressBox {
  margin-top: 30px;
  width: 150px;
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .pgBoxEl {
    width: 150px;
    position: relative;
  }

  .progressNumber {
    margin-top: 10px;
  }

  .progressText {
    position: absolute;
    font-weight: bold;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 18px;

    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}

.outlineIntroNew {
  max-width: 688px;
  padding-top: 50px;
  margin: 0 auto;
  text-align: center;

  .introTitle {
    font-size: 16px;
    font-weight: bold;
    color: #3b82f6;
  }

  .introSubtitle {
    font-size: 14px;
    line-height: 20px;
    margin-top: 30px;

    span {
      color: #d75300;
    }
  }
}

.oulineTitlePaper {
  font-size: 20px;
  color: #000;
  margin: 20px 0;
  margin-top: 30px;
  text-align: center;
  font-weight: bold;
}

.outlineTitleDesc {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}
</style>
