<template>
  <div class="plaStepCon">
    <!-- 页面名称 -->
    <div class="plaCon">
      <el-descriptions
        class="margin-top"
        title="核对订单信息"
        :column="3"
        border
      >
        <template slot="extra">
          <el-button type="primary" size="small" @click="beforeNext"
            >上一步</el-button
          >
        </template>
        <el-descriptions-item span="3">
          <template slot="label">
            <i class="el-icon-user"></i>
            系统名称
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item span="3">
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            文章标题
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            作者
          </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            字数
          </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            单价
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            总价
          </template>
          {{ payOrderDetail.pay_amount }} 元
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <p class="payTitle">支付订单</p>
    <div class="payPlaCode">
      <div class="ppcLeft">
        <p class="ppcLeftTitle">
          <svg class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#icon-zhifubaozhifu"></use>
          </svg>
          支付宝
        </p>
        <div class="codeImgBox">
          <iframe
            :src="payOrderDetail.pay_link"
            height="205"
            width="205"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <div class="ppcRight">
        <p>请用 <span>支付宝</span> 扫码</p>
        <p>
          应付金额: <span> {{ payOrderDetail.pay_amount }} </span>元
        </p>
        <p>
          订单号: <span>{{ payOrderDetail.out_trade_no }}</span> <i>点击复制</i>
        </p>
        <p>温馨提示：请保存好订单号 以便step3中查询报告</p>
        <p>温馨提示：您支付成功后, 查重报告会在10 - 30分钟后生成</p>
        <p>温馨提示：您可以在step3或我的查重记录(个人中心)查看/下载查重报告</p>

        <div class="stepNext">
          <el-button type="success" @click="stepNext"
            >我已付款,下一步</el-button
          >
        </div>
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
  props: {
    payOrderDetail: {
      type: Object,
      require: true,
    },
  },
  components: {
    // webinfo,
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
    stepNext(formName) {
      this.$emit("stepNext", 3);
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     // alert('submit!');
      //     this.$emit("stepNext", 2);
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    beforeNext(index) {
      this.$emit("stepNext", 1, { index: 2 });
    },
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
.payTitle {
  font-size: 16px;
  color: #303133;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;
}
.payPlaCode {
  display: flex;
  align-items: flex-start;
  .ppcLeft {
    width: 200px;

    .ppcLeftTitle {
      font-size: 20px;
      text-align: center;
    }
    .codeImgBox {
      width: 225px;
      height: 225px;
      padding: 10px;
      background: #f2f2f2;
      border-radius: 3px;
      margin-top: 15px;
    }
  }
  .ppcRight {
    margin-left: 60px;
    padding-top: 40px;

    font-size: 16px;
    line-height: 30px;
    span {
      font-weight: bold;
    }
  }
  .stepNext {
    margin-top: 30px;
  }
}
</style>
