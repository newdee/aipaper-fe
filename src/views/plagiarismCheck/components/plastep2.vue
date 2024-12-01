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
          {{ payOrderDetail.name }}
        </el-descriptions-item>
        <el-descriptions-item span="3">
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            文章标题
          </template>
          {{ payOrderDetail.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            作者
          </template>
          {{ payOrderDetail.author }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            字数
          </template>
          {{ payOrderDetail.word_nums }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            单价
          </template>
          {{ payOrderDetail.sellingPrice }} 元/ {{ payOrderDetail.unit }} 字
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
      <!-- 完全抵扣价格 -->
      <div v-show="payNumStatus" class="payNone">
        <div class="payCenterNone">
          <p>成功使用查重券, 当前支付价格: 0元</p>
          <p class="headerIntro">点击 <span>支付订单</span>,立即开始查重</p>
          <div>
            <el-button-group>
              <el-button
                @click="cancelUse"
                type="info"
                icon="el-icon-arrow-left"
              >
                取消使用
              </el-button>
              <el-button @click="userCouponJump" type="success">
                支付订单
                <i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </el-button-group>
          </div>
        </div>
      </div>
      <div class="ppcLeft">
        <p class="ppcLeftTitle">
          <svg class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#icon-zhifubaozhifu"></use>
          </svg>
          支付宝
        </p>
        <div v-if="codeStatus" class="codeImgBox">
          <iframe
            :src="codeUrl"
            height="205"
            width="205"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <div class="ppcRight">
        <!-- 查重券 -->
        <div v-show="payOrderDetail.jane_name == 'paperyy'" class="ppcHeader">
          <el-switch
            v-model="couponStatus"
            :active-value="1"
            :inactive-value="0"
            @change="switchChange"
            active-text="使用查重券"
          >
          </el-switch>
          <div class="rightCoupon">
            您剩余查重券:
            <b class="red">{{ payOrderResult.duplicate_check_nums }}</b> 张
          </div>
        </div>
        <p class="rightCouponItem">
          每张查重卷可免费查重10000字以内文章, 超出字数单独计费
        </p>
        <el-divider>温馨提示</el-divider>
        <p>请用 <span>支付宝</span> 扫码</p>
        <p>
          应付金额: <span class="red"> {{ pay_amount }} </span>元
        </p>
        <p class="copyBox">
          订单号：<span class="red"> {{ preViewId }}</span>
          <el-button
            class="rightBtnCopy"
            type="primary"
            v-clipboard:copy="preViewId"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            round
            size="mini"
          >
            复制订单号
          </el-button>
        </p>

        <p>温馨提示：请保存好订单号 以便 <i> 查询报告 </i></p>
        <p>温馨提示：您支付成功后, 查重报告会在10 - 30分钟后生成</p>
        <p>温馨提示：您可以在step3或我的查重记录(个人中心)查看/下载查重报告</p>

        <div class="stepNext">
          <el-button type="success" @click="stepNext">
            我已付款,下一步
          </el-button>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <reminder></reminder>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";
import { product, pre_create, passOrder } from "@/api/paper";
import reminder from "./reminder.vue";
import { pay_order, pay_discount } from "@/api/paper";

export default {
  name: "myFooter",
  data() {
    return {
      // 定义变量
      couponStatus: 0,
      payNumStatus: false,
      codeStatus: true,
      codeUrl: "",
      pay_amount: "",
    };
  },
  props: {
    payOrderDetail: {
      type: Object,
      require: true,
    },
    payOrderResult: {
      type: Object,
      require: true,
    },
  },
  components: {
    reminder,
  },
  watch: {
    payOrderResult: {
      handler(newVal, oldVal) {
        this.$log("payResult", newVal, oldVal);
        this.couponStatus = newVal.is_discount;
        this.codeUrl = newVal.pay_link;
        this.codeStatus = true;
        this.pay_amount = newVal.pay_amount;
      },
      deep: true, // Enable deep watching
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
    // this.intervalId = setInterval(() => {
    //   this.fetchData();
    // }, 3000);
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  computed: {
    // 计算属性
    ...mapGetters(["preViewId"]),
  },
  methods: {
    onCopy() {
      this.$message.success("复制成功!");
    },
    onError() {
      this.$message.success("复制失败!");
    },
    switchChange(val) {
      // 调用接口查看价格
      this.$log("va", val);
      let data = {
        title: this.payOrderDetail.title, // 文章标题，必传
        author: this.payOrderDetail.author, // 文章作者，必传
        jane_name: this.payOrderDetail.jane_name, // 产品简称，必传
        out_trade_no: this.payOrderDetail.out_trade_no, // 预创建的订单编号，必传
        is_discount: val == 1 ? 1 : 0, // 0-未使用抵扣，1-使用抵扣
        original_amount: this.payOrderResult.original_amount,
      };
      if (this.payOrderDetail.end_date) {
        data.end_date = this.payOrderDetail.end_date;
      } else {
        data.end_date = "";
      }
      // 发表日期，“维普职称版”必传 yyyy-MM-dd

      pay_order(data).then((res) => {
        if (res.result.pay_amount == 0) {
          this.payNumStatus = true;
          this.codeStatus = false;
          this.$nextTick(() => {});
        } else {
          this.codeUrl = res.result.pay_link;
          this.pay_amount = res.result.pay_amount;
        }
      });
    },
    cancelUse() {
      this.couponStatus = false;
      this.payNumStatus = false;
      this.codeStatus = true;
    },
    userCouponJump() {
      let data = {
        out_trade_no: this.payOrderDetail.out_trade_no,
      };
      pay_discount(data).then((res) => {});
      this.$emit("stepNext", 3);
      clearInterval(this.intervalId);
    },
    beginPolling() {
      this.intervalId = setInterval(() => {
        this.fetchData();
      }, 3000);
    },
    fetchData() {
      let data = {
        fileBackKey: this.preViewId,
      };
      passOrder(data)
        .then((res) => {
          this.$log("res", res);
          if (res.result.local_payment_status == "TRADE_SUCCESS") {
            this.$message.success("付款成功");
            clearInterval(this.intervalId);
          }
          // if(res)
        })
        .catch(() => {});
    },
    // 定义方法
    stepNext(formName) {
      this.$log("qqq");
      this.$emit("stepNext", 3);
      clearInterval(this.intervalId);
      this.codeStatus = false;
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     // alert('submit!');
      //     this.$emit("stepNext", 2);
      //   } else {
      //     this.$log("error submit!!");
      //     return false;
      //   }
      // });
    },
    beforeNext(index) {
      this.$emit("stepNext", 1, { index: 2 });
      clearInterval(this.intervalId);
      this.codeStatus = false;
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
  align-items: center;
  position: relative;
  .payNone {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    .payCenterNone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      p {
        margin-bottom: 20px;
      }
      .headerIntro {
        font-size: 12px;
        color: #67c23a;
      }
    }
  }
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
.ppcHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.copyBox {
  display: flex;
  align-items: center;
  .rightBtnCopy {
    margin-left: 20px;
  }
}
.red {
  color: #f56c6c;
}
.rightCoupon {
  position: relative;
}
.rightCouponItem {
  color: #909399;
  font-size: 12px;
}
</style>
