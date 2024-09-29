<template>
  <div class="step1Box">
    <!-- 页面名称 -->
    <div class="progressBox">
      <div class="pgBox">
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="currentNumber"
          status="success"
        ></el-progress>
      </div>
      <p>大纲生成中 <i class="el-icon-loading"></i>....</p>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "step1",
  data() {
    return {
      // 定义变量
      currentNumber: 0,
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
    // 生成大纲
    addE(index) {
      this.countUpToHundred(index);
    },
    countUpToHundred(seconds) {
      this.currentNumber = 0;
      const targetNumber = 100;
      const totalSteps = targetNumber - this.currentNumber;

      // 计算每一步所需的时间（毫秒）
      const stepTimeMs = (seconds * 1000) / totalSteps;

      this.intervalId = setInterval(() => {
        console.log(this.currentNumber);
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
  max-width: 1200px;
}
</style>
