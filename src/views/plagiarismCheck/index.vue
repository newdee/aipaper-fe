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
      <plastep1 ref="step1Ref" @stepNext="stepNext"></plastep1>
    </div>
    <div v-show="active == 2" class="plaStepCon">
      <plastep2
        ref="step2Ref"
        :payOrderDetail="payOrderDetail"
        :payOrderResult="payOrderResult"
        @stepNext="stepNext"
      ></plastep2>
    </div>
    <div v-show="active == 3" class="plaStepCon">
      <plastep3 @stepNext="stepNext"></plastep3>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import { pay_order } from "@/api/paper";
import plastep1 from "./components/plastep1.vue";
import plastep2 from "./components/plastep2.vue";
import plastep3 from "./components/plastep3.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "myFooter",
  data() {
    return {
      // 定义变量
      active: 1,
      payOrderDetail: {},
      payOrderResult: {
        out_trade_no: "",
        pay_amount: 0,
        pay_link: "",
        original_amount: "", //产品原价
      },
    };
  },
  components: {
    plastep1,
    plastep2,
    plastep3,
  },
  mounted() {},
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
    stepNext(index, data) {
      console.log("ddsd");
      // 滚动到顶部.
      if (index === 3) {
        this.active = index;
      }
      if (index === 2) {
        pay_order(data).then((res) => {
          this.payOrderDetail = { ...data };
          this.payOrderResult = { ...res.result };
          this.active = index;
          this.$nextTick(() => {
            this.$refs.step2Ref.beginPolling();
          });
        });
      }
      if (index == 1 && data.index == 2) {
        this.payOrderDetail = {};
        this.$refs.step1Ref.resetFrom();
        this.active = index;
      }
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
  background: #fff;
  padding-top: 30px;
}
.plaStepCon {
  padding: 30px 50px;
}
</style>
