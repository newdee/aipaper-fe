<template>
  <div>
    <!-- 页面名称 -->
    <!-- 付款成功弹窗 -->
    <el-dialog
      :append-to-body="true"
      :lock-scroll="false"
      :close-on-click-modal="false"
      title="订单查询"
      :visible.sync="ownPayStatus"
      width="40%"
      class="order-dialog"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <p class="dialog-text">
          正在查询订单:
          <span class="dialog_pay_text">{{
            payStatusObject[payTitleStatus]
          }}</span>
        </p>
        <!-- 订单支付成功展示页面 -->
        <div v-if="payTitleStatus == 'TRADE_SUCCESS'">
          <div class="paperProgress">
            <el-progress
              type="circle"
              :percentage="currentNumber"
            ></el-progress>
          </div>
          <p class="dialog-text">正文生成中, 预计时间30分钟, 请稍等</p>
          <p class="dialog-text">
            如您关闭此弹窗,请在
            <span class="dialog_pay_text">我的订单</span>
            页面, 查看您生成的正文
          </p>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ownPayStatus = false">取消</el-button>
        <el-button type="primary" @click="jumpStep">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import eventBus from "@/utils/eventBus";
import { getOrder, orderDetailById } from "@/api/user";

export default {
  name: "myFooter",
  data() {
    return {
      // 定义变量
      ownPayStatus: false,
      currentNumber: 0,
      intervalId: "",
      payTitleStatus: "PRE_CREATE",
      payStatusObject: {
        TRADE_SUCCESS: "交易支付成功",
        WAIT_BUYER_PAY: "未付款交易超时关闭，或支付完成后全额退款",
        PRE_CREATE: "交易创建，等待买家付款",
        TRADE_FINISHED: "交易结束!",
      },
      listData: [], // 存储请求返回的数据
      pollingInterval: 2000, // 轮询间隔时间，单位毫秒
      isPolling: false, // 是否正在进行轮询
      successIndex: 0,
    };
  },
  props: {
    payStatus: {
      type: Boolean,
      require: true,
      default: () => {
        return false;
      },
    },
    requestKey: {
      type: String,
      require: false,
    },
  },
  watch: {
    payStatus: {
      handler(newVal, oldVal) {
        console.log("支付状态发生变化", "新值:", newVal, "旧值:", oldVal);
        // 在这里执行你需要的操作
        this.ownPayStatus = newVal;
      },
      immediate: true, // 立即触发一次监听器
    },
    requestKey: {
      handler(newVal, oldVal) {
        console.log("订单编号", "新值:", newVal, "旧值:", oldVal);
        // 在这里执行你需要的操作
        this.getDetail(newVal);
      },
      immediate: false, // 立即触发一次监听器
    },
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
    handleClose(done) {
      this.$confirm("关闭弹窗,不影响论文生成进度")
        .then((_) => {
          done();
          this.$store.dispatch("app/setActiveIndex", 0);
        })
        .catch((_) => {});
    },
    jumpStep() {
      this.$store.dispatch("app/setActiveIndex", 0);
    },
    /**
     * 获取列表数据，支持轮询
     * @param {Object} data 请求参数
     * @param {Number} delay 轮询间隔时间，默认2000ms
     * @param {Number} maxRetries 最大重试次数，默认为5次
     * @param {Number} currentRetry 当前重试次数，默认为0
     */
    getList(
      data,
      delay = this.pollingInterval,
      maxRetries = 5,
      currentRetry = 0
    ) {
      console.log("执行一次");
      if (this.isPolling) {
        console.warn("轮询正在进行中...");
      }

      this.isPolling = true;

      orderDetailById(data)
        .then((res) => {
          console.log("res", res.result);
          let result = res.result;
          let orderData = res.result.order;
          // 判断支付状态
          if (orderData.payment_status) {
            this.payTitleStatus = orderData.payment_status;
            if (
              this.payTitleStatus == "TRADE_SUCCESS" &&
              this.successIndex <= 0
            ) {
              this.addE(1500);
              this.successIndex += 1;
            }
          }
          // 判断论文生成状态
          const { order_item_response } = res.result;
          let caseStatus = true;
          if (order_item_response.length > 0) {
            console.log("case", order_item_response[0].case.paper_case.stage);
            console.log(
              "case",
              order_item_response[0].case.paper_case.stage == 2
            );
            if (order_item_response[0].case.paper_case.stage == 2) {
              caseStatus = false;
            }
          }

          if (caseStatus) {
            // 如果满足继续轮询的条件，则设置延时后再次调用此方法
            let _this = this;
            setTimeout(() => {
              _this.getList(data, delay, maxRetries, currentRetry);
            }, delay);
          } else {
            // 请求成功, 激活tab3

            let pdfUrl = "https://file.mixpaper.cn/pdf/third_output.pdf";
            let pdfUrl2 = order_item_response[0].case.file_urls.pdf;
            let realUrl = pdfUrl2 ? pdfUrl2 : pdfUrl;
            console.log("realUrl", realUrl);

            // 满足停止轮询的条件，更新数据并结束轮询
            this.listData = order_item_response; // 假设这里是你想更新的数据
            this.isPolling = false;
            eventBus.emit("pdfSuccessClick", realUrl); // 发布事件
            // this.$nextTick(() => {
            //   this.$store.dispatch("app/togglePDFUrl", realUrl);
            // });
          }
        })
        .catch((error) => {
          console.error("请求失败", error);
          if (currentRetry + 1 < maxRetries) {
            // 如果当前重试次数小于最大重试次数，则等待一段时间后再次尝试
            let _this = this;
            setTimeout(() => {
              _this.getList(data, delay, maxRetries, currentRetry + 1);
            }, delay);
          } else {
            // 如果已经达到最大重试次数，则停止轮询
            this.isPolling = false;
            console.error("达到最大重试次数，停止轮询");
          }
        });
    },
    getDetail(index) {
      console.log("d1111", this.requestKey);
      if (this.requestKey) {
        this.getList({ key: this.requestKey }, 10000);
      } else {
        this.$message({
          type: "warning",
          message: "订单号未返回!",
        });
      }
    },
    addE(index) {
      console.log("dddd", index);
      clearInterval(this.intervalId); // 达到目标数字时清除定时器
      this.currentNumber = 0;
      this.countUpToHundred(index);
    },
    // 定义方法
    countUpToHundred(totalSeconds) {
      this.currentNumber = 0.0; // 同样初始化时确保它是一个带有两位小数的数字
      const targetNumber = 99.99; // 目标数字是 100%
      const stepSize = targetNumber / totalSeconds; // 每秒增加的步长

      this.intervalId = setInterval(() => {
        this.currentNumber += stepSize; // 增加数值
        this.currentNumber = parseFloat(this.currentNumber.toFixed(2)); // 保留两位小数

        if (this.currentNumber >= targetNumber) {
          clearInterval(this.intervalId); // 达到目标数字时清除定时器
          this.currentNumber = targetNumber; // 确保最终值与目标值完全相同
        }
      }, 1000); // 每秒执行一次
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

.order-dialog {
  .el-dialog__header {
    text-align: center;
    font-size: 1.2rem;
    padding: 20px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
  }

  .el-dialog__body {
    padding: 20px;
    text-align: center;
  }

  .dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .dialog-text {
    font-size: 1rem;
    margin: 10px 0;
    color: #555;
  }

  .paperProgress {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
  }

  .el-button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 1rem;
  }
}

// 响应式设计
@media only screen and (max-width: 768px) {
  .order-dialog {
    .el-dialog {
      width: 95%; // 更小的宽度以适应手机屏幕
    }

    .el-dialog__header {
      font-size: 1.1rem;
      padding: 15px;
    }

    .el-dialog__body {
      padding: 15px;
    }

    .dialog-text {
      font-size: 0.9rem;
      margin: 10px 0;
    }

    .paperProgress {
      margin: 20px 0;
    }

    .el-button {
      margin: 10px;
      padding: 8px 15px;
      font-size: 0.9rem;
    }

    .dialog-footer {
      padding: 15px;
    }
  }
}
.dialog_pay_text {
  color: #409eff;
}
</style>
