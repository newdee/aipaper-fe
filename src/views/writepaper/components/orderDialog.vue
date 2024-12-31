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
      :width="device == 'mobile' ? '90%' : '40%'"
      class="order-dialog"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <p class="dialog-text">
          订单状态:
          <span class="dialog_pay_text">{{
            payStatusObject[payTitleStatus]
          }}</span>
        </p>
        <!-- <button @click="clickffff">sssdd</button> -->
        <!-- 订单支付成功展示页面 -->
        <div
          v-if="
            payTitleStatus == 'TRADE_SUCCESS' ||
            this.payTitleStatus == 'TRADE_DEPOSIT_SUCCESS'
          "
        >
          <div class="paperProgress">
            <el-progress
              type="circle"
              :percentage="currentNumber"
            ></el-progress>
          </div>
          <p class="dialog-text">
            正在调取大量
            <span style="font-weight: bold" class="primary">真实文献</span
            >，加速生成正文中，
          </p>
          <p class="dialog-text">
            预计需要<span class="primary"> 30分钟 </span>，请耐心等待
          </p>
          <p class="dialog-text">
            如您关闭此弹窗,请在
            <span class="dialog_pay_text">我的订单</span>
            页面, 查看您生成的正文
          </p>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="jumpStep">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import eventBus from "@/utils/eventBus";
import { paperPack, orderDetailById } from "@/api/user";
import { mapGetters } from "vuex";

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
        TRADE_DEPOSIT_SUCCESS: "您已成功支付预付款, 论文生成中",
        TRADE_SUCCESS: "您已成功支付订单, 论文生成中",
        WAIT_BUYER_PAY: "未付款交易超时关闭，或支付完成后全额退款",
        PRE_CREATE: "交易创建，等待买家付款",
        TRADE_FINISHED: "交易结束!",
      },
      listData: [], // 存储请求返回的数据
      pollingInterval: 2000, // 轮询间隔时间，单位毫秒
      successIndex: 0,
    };
  },
  props: {
    payStatus: {
      type: Number,
      require: true,
      default: () => {
        return false;
      },
    },
    requestKey: {
      type: String,
      require: false,
    },
    timeData: {
      type: String,
      require: false,
    },
    paperPercent: {
      type: Number,
      require: false,
      default: 0,
    },
  },
  watch: {
    payStatus: {
      handler(newVal, oldVal) {
        this.$log("支付状态发生变化", "新值:", newVal, "旧值:", oldVal);
        // 在这里执行你需要的操作
        this.ownPayStatus = true;
        this.$store.dispatch("paper/setPollingStatus", true);
        this.getDetail();
      },
    },
    paperPercent: {
      handler(newVal, oldVal) {
        this.$log("进度条百分比", "新值:", newVal, "旧值:", oldVal);
        // 在这里执行你需要的操作
        this.currentNumber = newVal;
      },
      immediate: true, // 立即触发一次监听器
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
    ...mapGetters(["pollingStatus", "device", "currentOrder"]),
  },

  methods: {
    clickffff() {
      console.log(this.currentOrder);
    },
    handleClose(done) {
      if (
        this.payTitleStatus == "TRADE_SUCCESS" ||
        this.payTitleStatus == "TRADE_DEPOSIT_SUCCESS"
      ) {
        this.$confirm("关闭弹窗,不影响论文生成进度")
          .then((_) => {
            done();
            this.$store.dispatch("app/setActiveIndex", 0);
            this.$store.dispatch("paper/setPollingStatus", false);
            eventBus.emit("step0Reload", true); // 发布事件
          })
          .catch((_) => {});
      } else {
        done();
      }
    },
    jumpStep() {
      if (
        this.payTitleStatus == "TRADE_SUCCESS" ||
        this.payTitleStatus == "TRADE_DEPOSIT_SUCCESS"
      ) {
        this.$confirm("关闭弹窗,不影响论文生成进度")
          .then((_) => {
            // done();
            this.ownPayStatus = false;
            this.$store.dispatch("paper/setPollingStatus", false);
            this.$store.dispatch("app/setActiveIndex", 0);
            eventBus.emit("step0Reload", true); // 发布事件
          })
          .catch((_) => {});
      } else {
        this.ownPayStatus = false;
        this.$store.dispatch("paper/setPollingStatus", false);
        this.$store.dispatch("app/setActiveIndex", 0);
      }
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
      this.$log("执行一次");

      if (this.pollingStatus) {
        console.warn("轮询正在进行中...");
      } else {
        return false;
      }

      orderDetailById(data)
        .then((res) => {
          this.$log("res", res.result);
          let result = res.result;
          let orderData = res.result.order;
          // 判断支付状态
          if (orderData.payment_status) {
            this.payTitleStatus = orderData.payment_status;
            if (
              (this.payTitleStatus == "TRADE_SUCCESS" ||
                this.payTitleStatus == "TRADE_DEPOSIT_SUCCESS") &&
              this.successIndex <= 0
            ) {
              this.addE(1500);
              this.successIndex += 1;
            }
          }
          // 判断论文生成状态
          const { order_item_response, order, outline } = res.result;
          let caseStatus = true;
          if (order_item_response.length > 0) {
            this.$log("case", order_item_response[0].case.paper_case.stage);
            this.$log(
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
            let wordTypeList = [
              "EXTRA_PROPOSAL",
              "EXTRA_TASK_ASSIGNMENT",
              "PAPER_FINAL_STAGES",
            ];
            // 请求成功, 激活tab3
            if (wordTypeList.includes(orderData.order_type)) {
              // word
              this.$store.dispatch("paper/setPollingStatus", false);
              // 保存数据， 用于step3下载
              this.$store.dispatch("app/toggleCurrentOrder", orderData);
              this.ownPayStatus = false;
              // 下载word
              paperPack({ out_trade_no: order.out_trade_no }).then((res) => {
                // window.open(res.result.zip_url, "_blank");
                // Create a temporary link element
                const link = document.createElement("a");
                link.href = res.result.zip_url;

                // Set the download attribute to suggest a filename
                link.download = outline.title + ".zip"; // Change 'filename.zip' to the desired file name

                // Append the link to the body
                document.body.appendChild(link);

                // Programmatically click the link to trigger the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
              });
              // 结束
            } else {
              // pdf
              let pdfUrl2 = order_item_response[0].case.file_urls.pdf;
              let realUrl = pdfUrl2 ? pdfUrl2 : "";
              this.$log("realUrl", realUrl);

              // 满足停止轮询的条件，更新数据并结束轮询
              this.listData = order_item_response; // 假设这里是你想更新的数据
              this.$store.dispatch("paper/setPollingStatus", false);
              // 保存数据， 用于step3下载
              this.$store.dispatch("app/toggleCurrentOrder", order);
              this.ownPayStatus = false;
              eventBus.emit("pdfSuccessClick", realUrl); // 发布事件
            }
            // let pdfUrl = "https://file.mixpaper.cn/pdf/third_output.pdf";

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
            this.$store.dispatch("paper/setPollingStatus", false);

            console.error("达到最大重试次数，停止轮询");
          }
        });
    },
    getDetail() {
      this.$log("d1111", this.requestKey);
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
      this.$log("dddd", index, this.paperPercent);
      clearInterval(this.intervalId); // 达到目标数字时清除定时器

      this.countUpToHundred(index);
    },
    // 定义方法
    countUpToHundred(totalSeconds) {
      if (this.paperPercent > 0) {
        this.currentNumber = this.paperPercent;
      } else {
        this.currentNumber = 0.0; // 同样初始化时确保它是一个带有两位小数的数字
      }
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
    text-align: center;
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
      text-align: center;
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
