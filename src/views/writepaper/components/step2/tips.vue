<template>
  <div class="tipContain">
    <!-- tip1 -->
    <div class="tipBox">
      <p class="tipTitle">Tips1:</p>
      <div class="tipCon">
        <p>
          点击
          <span> 【 <i class="el-icon-delete"></i>】 </span>
          可以删除本章/小节
        </p>
        <p>
          点击
          <span> 【 <i class="el-icon-circle-plus-outline"></i>】 </span>
          ，在本章/小节后新增一章/小节
        </p>
        <p>
          点击
          <span> 【<i class="el-icon-edit-outline"></i>插入图表】 </span>
          点击，可以在对应的章节中加入不同的内容，包含公式、数据表、图表、代码
        </p>
        <p>
          请在所有的编辑都完成后，如果有不想写具体描述而留空的部分，可以点击一次
          <span> 【<i class="el-icon-circle-plus-outline"></i>AI帮写】 </span>
          ，注意这个会有等待时间。
        </p>
      </div>
    </div>
    <div class="tipBox">
      <p class="tipTitle">Tips2:</p>
      <div class="tipCon">
        <p>
          大纲不满意可以点击下边的<span
            >【重新生成按钮<i class="el-icon-refresh"></i>】</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "myFooter",
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
// @import "@/styles/variables.scss";
// @import "@/styles/mediaMain.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
// @media only screen and (max-width: 768px) {
// }
.tipContain {
  position: absolute;
  right: 20px;
  top: 250px;
}
.tipBox {
  width: 189px;
  padding: 9px;
  background: #fff;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}
.tipTitle {
  font-size: 14px;
  color: #000;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin-bottom: 10px;
}
.tipCon {
  line-height: 20px;
  & > p {
    margin-top: 10px;
    span {
      color: #d75300;
    }
  }
}
</style>
