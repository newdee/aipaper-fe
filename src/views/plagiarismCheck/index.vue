<template>
  <div class="mainContentSec bgWhite">
    <!-- 页面名称 -->
    <div class="stepPla">
      <el-steps :active="active" align-center>
        <el-step icon="el-icon-upload" title="步骤 1" description="上传文件">
        </el-step>
        <el-step title="步骤 2" description="付费"></el-step>
        <el-step
          icon="el-icon-picture"
          title="步骤 3"
          description="查看结果"
        ></el-step>
      </el-steps>
    </div>
    <div v-show="active == 1" class="plaStepCon">
      <plastep1 @stepNext="stepNext"></plastep1>
    </div>
    <div v-show="active == 2" class="plaStepCon">
      <plastep2 @stepNext="stepNext"></plastep2>
    </div>
    <div v-show="active == 3" class="plaStepCon">
      <plastep1 @stepNext="stepNext"></plastep1>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
import plastep1 from "./components/plastep1.vue";
import plastep2 from "./components/plastep2.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "myFooter",
  data() {
    return {
      // 定义变量
      active: 1,
    };
  },
  components: {
    plastep1,
    plastep2,
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
  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
    stepNext(index) {
      console.log("ddd", index);
      this.active = index;
      // 滚动到顶部.
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import "@/styles/mediaMain.scss";
// @import './index.scss';

.bgWhite {
  background: #fff;
}
.stepPla {
  margin-top: 30px;
  background: #fff;
  padding-top: 30px;
}
.plaStepCon {
  padding: 30px 50px;
}
</style>
