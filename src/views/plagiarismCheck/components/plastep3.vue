<template>
  <div class="stepCon3">
    <!-- 页面名称 -->
    <div class="step3Title">
      <p>
        <i class="el-icon-takeaway-box"></i>
        <b>报告查询</b>
        <span
          >填写检测的“订单编号”，点击查询报告，然后下载对应的检测报告！</span
        >
      </p>

      <el-button type="primary" size="small" @click="beforeNext"
        >返回第一步</el-button
      >
    </div>
    <div class="reportCon">
      订单号:
      <el-input
        class="inputWidth"
        v-model="orderText"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary" @click="getList">查询</el-button>
    </div>
    <p class="intro">订单号也可从我的查重记录中获取...</p>

    <el-divider></el-divider>

    <div class="reportList">
      <el-empty description="查询记录为空"></el-empty>
      <p class="introP">
        提醒：系统仅保留 7
        天以内的检测报告，用户检测完成后请尽快下载您的检测报告!
      </p>
      <el-alert title="错误提示的文案" type="error"> </el-alert>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "plaStep3",
  data() {
    return {
      // 定义变量
      orderText: "",
    };
  },
  components: {
    // webinfo,
  },
  watch: {
    preViewId: {
      immediate: true,
      handler(val) {
        this.orderText = val;
        console.log("preViewIdddd", val);
      },
    },
  },

  computed: {
    // 计算属性
    ...mapGetters(["preViewId"]),
  },
  methods: {
    // 定义方法
    getList() {
      // 报告id保存
      this.$store.dispatch("paper/setPreviewId", "456");
    },
    beforeNext(index) {
      this.$emit("stepNext", 1, { index: 2 });
    },
  },
  mounted() {
    // zhuge.track(`用户查看大纲`, {
    //   大纲标题: row.title,
    //   大纲key: row.key1,
    // });
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import "@/styles/mediaMain.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
// @media only screen and (max-width: 768px) {
// }
.step3Title {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #303133;
  b {
    margin-left: 5px;
  }
  span {
    margin-left: 20px;
    color: #909399;
    font-size: 12px;
  }
}
.stepCon3 {
  max-width: 800px;
  margin: 0 auto;
  .intro {
    margin-top: 10px;
    color: #909399;
    text-align: right;
    width: 260px;
  }
  .introP {
    color: #909399;
    text-align: right;
    text-align: center;
    margin-bottom: 40px;
  }
}
.reportCon {
  margin-top: 30px;
  display: flex;
  font-size: 16px;
  align-items: center;
  .inputWidth {
    width: 200px;
    margin: 0 15px;
  }
}
</style>
