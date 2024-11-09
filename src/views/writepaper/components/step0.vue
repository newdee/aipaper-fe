<template>
  <div>
    <!-- 最近创建的大纲 最近生成的论文 -->
    <div :class="[device == 'desktop' ? 'recentListBox' : '']">
      <div class="outlineListClass" v-if="outlinesList.length > 0">
        <div class="lineNav">
          <p>最近创建的大纲</p>
        </div>
        <div
          v-for="(orderObj, index) in outlinesList"
          :key="index + 'outlineList'"
        >
          <div class="order">
            <div>
              <div class="orderTitle">{{ orderObj.title }}</div>
              <div class="orderText rowBetween handleRow">
                <div class="left">大纲状态：{{ orderObj.status }}</div>
                <div class="right" @click="jumpStep2(orderObj)">
                  <el-button
                    icon="el-icon-view"
                    :disabled="orderObj.status != '生成成功'"
                    type="text"
                    >查看大纲</el-button
                  >
                </div>
              </div>
            </div>

            <div class="orderText rowStart handleRow">
              <div class="left">
                类型:
                <span class="price">{{ orderObj.type }}</span>
              </div>
              <div class="left">
                科目:
                <span class="price">{{ orderObj.field }}</span>
              </div>
              <div class="left">
                生成时间：
                <span class="price">{{
                  orderObj.updated_at | dateFormatter
                }}</span>
              </div>
              <!-- <span class="price">￥: 0.01元</span> -->
              <!-- <span
                class="handle"
                v-if="orderObj.order.payment_status == 'WAIT_BUYER_PAY'"
                style="color: crimson"
                >去支付</span
              > -->
            </div>
          </div>
        </div>
      </div>
      <div class="outlineListClass" v-if="orderList.length > 0">
        <div class="lineNav">
          <p>最近生成的论文</p>
        </div>
        <div
          class="order"
          v-for="(orderObj, index) in orderList"
          :key="index + 'outlineList'"
        >
          <template>
            <div class="orderTitle" :key="'case2' + index">
              {{ orderObj.outline.title }}
            </div>
            <div
              v-if="orderObj.order_item_response.length > 0"
              class="orderText rowBetween handleRow orderTextImport"
              :key="'case3' + index"
            >
              <div class="left">
                生成状态：
                {{
                  orderObj.order_item_response[0].case.paper_case.stage
                    | orderStatusFormatter
                }}
              </div>
              <div class="right">
                <el-button
                  icon="el-icon-view"
                  type="text"
                  :disabled="
                    !orderObj.order_item_response[0].case.file_urls.pdf
                  "
                  @click="openPaper(orderObj)"
                >
                  预览
                </el-button>
                <el-button
                  v-if="orderObj.order_item_response[0].case.paper_case.stage"
                  icon="el-icon-download"
                  :disabled="
                    orderObj.order_item_response[0].case.paper_case.stage !=
                      2 || downStatus
                  "
                  type="text"
                  @click="downLoadPaper(orderObj)"
                >
                  下载
                </el-button>
              </div>
            </div>
            <div
              v-else
              class="orderText rowBetween handleRow"
              :key="'case3' + index"
            >
              <div class="left">生成状态：未生成</div>
              <div class="right"></div>
            </div>
          </template>
          <div class="orderText rowStart handleRow">
            <div class="left">
              类型:
              <span class="price">{{ orderObj.outline.type }}</span>
            </div>
            <div class="left">
              科目:
              <span class="price">{{ orderObj.outline.field }}</span>
            </div>
            <div class="left">
              生成时间：
              <span class="price">{{
                orderObj.order.created_at | dateFormatter
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import eventBus from "@/utils/eventBus";
import { getOutlineList, getOrderList, paperPack } from "@/api/user";
import { throttle } from "lodash";
import { getToken } from "@/utils/auth"; //

export default {
  name: "step0",
  data() {
    return {
      // 定义变量
      outlinesList: [], // 大纲列表
      orderList: [], // 订单列表
      downStatus: false,
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    const hasToken = getToken();
    if (hasToken) {
      this.handleCurrentChange();
    } else {
      this.$log("用户未登录,大纲不加载 step0!");
    }
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
    ...mapGetters(["device"]),
  },
  methods: {
    openPaper: _.debounce(function (item) {
      const targetPath = "/main/writepaper";
      const currentPath = this.$route.path;
      // 检查当前路径是否与目标路径相同
      if (currentPath !== targetPath) {
        this.$router
          .push({
            path: targetPath,
            query: {
              timeData: new Date().getTime(),
            },
          })
          .then(() => {
            // 确保 DOM 更新完成后再执行后续代码
            this.$nextTick(() => {
              this.$log("item", item);
              // 关闭弹窗
              eventBus.emit("orderDialogChange", false);
              // 保存订单ID
              this.$store.dispatch("app/toggleCurrentOrder", item.order);
              let realUrl = item.order_item_response[0].case.file_urls.pdf;
              eventBus.emit("pdfSuccessClick", realUrl); // 发布事件
            });
          });
      } else {
        // 如果已经在目标路径，直接执行后续逻辑
        this.$nextTick(() => {
          this.$log("item", item);
          eventBus.emit("orderDialogChange", false);
          this.$store.dispatch("app/toggleCurrentOrder", item.order);
          let realUrl = item.order_item_response[0].case.file_urls.pdf;
          eventBus.emit("pdfSuccessClick", realUrl);
        });
      }
    }, 300),
    jumpStep2(row) {
      this.$router
        .push({
          path: "/main/writepaper",
          query: {
            key1: row.key1,
            field: row.field,
            timeData: new Date().getTime(),
          },
        })
        .then(() => {
          this.$nextTick(() => {
            let requestForm = {
              title: row.title,
              threeCon: false,
              language: row.language,
              type: row.type,
              field: ["哲学", row.field],
            };
            eventBus.emit("setFormData", requestForm); // 发布事件
            eventBus.emit("orderDialogChange", false);
          });
        });
    },
    // 定义方法
    handleCurrentChange: throttle(async function () {
      // 这里可以添加你的分页逻辑，例如发送请求获取新的数据
      let params = {
        page_num: 1,
        page_size: 5,
      };
      // 查询大纲
      getOutlineList(params).then((res) => {
        let data = res.result;
        if (Object.keys(data).length > 0) {
          this.outlinesList = data.outline_list || [];
          this.$log("180---outlines", this.outlinesList);
          // this.page.page_num = data.page_num - 0;
          // this.page.total = data.total;
        }
      });
      // 查询订单
      getOrderList(params).then((res) => {
        let data = res.result;
        if (Object.keys(data).length > 0) {
          this.orderList = data.order_resp_list || [];
          this.$log("196---orderList", this.orderList);
        }
      });
    }, 300), // 300毫秒内最多执行一次

    downLoadPaper: _.debounce(function (item) {
      this.$log("item", item);
      this.downStatus = true;
      paperPack({ out_trade_no: item.order.out_trade_no }).then((res) => {
        this.$log("ad", res.result.zip_url);
        this.downStatus = false;
        // window.open(res.result.zip_url, "_blank");
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = res.result.zip_url;

        // Set the download attribute to suggest a filename
        link.download =
          item.order_item_response[0].case.paper_case.title + ".zip"; // Change 'filename.zip' to the desired file name

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      });
    }, 300),
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import "@/styles/mediaMain.scss";
// @import './index.scss';
.recentListBox {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列，每列占用相等的空间 */
  grid-gap: 10px; /* 格子间隔 */
  .outlineListClass {
    margin-bottom: 0px;
  }
}
.outlineListClass {
  margin-bottom: 10px;
  .ordersList {
    --border: 1px solid #0000001f;
    --border-bottom: 1px solid #0000001f;
    max-height: 90vh;
    overflow: auto;
    padding-right: 10px;
  }

  /* 整个滚动条 */
  .ordersList::-webkit-scrollbar {
    width: 8px;
    /* 滚动条宽度 */
    background-color: #f5f5f5;
    /* 背景颜色 */
  }

  /* 滚动条轨道 */
  .ordersList::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  /* 滚动条滑块 */
  .ordersList::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #555;
  }

  /* 当鼠标悬停在滑块上时的样式 */
  .ordersList::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }

  .orderBox {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
  }

  .orderBox .order {
    display: block;
    flex-grow: 1;
    height: fit-content;
    font-size: 14px;
    padding: 10px 15px;
    // border: 1px solid #0000001f;
    border: var(--border);
    border-radius: 5px;
    margin-left: 10px;
  }
  .order {
    background: #f2f2f2;
    // background: rgba(51, 85, 255, 0.1);

    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
  }
  .orderBox ::v-deep .el-checkbox .el-checkbox__label {
    display: none;
  }

  .rowBetween {
    display: flex;
    justify-content: space-between;
    line-height: 24px;
  }
  .rowStart {
    display: flex;
    line-height: 24px;
    justify-content: space-between;
  }

  .left {
    color: #666;
  }

  .rowBetween .right {
    color: #409eff;
  }

  .orderNum.rowBetween div {
    color: #999;
    font-size: 16px;
  }

  .orderTitle {
    color: #202020;
    font-weight: 600;
    font-size: 15px;
    line-height: 1.5em;
    min-height: 1.5em;
  }

  .handleRow:not(:last-child) {
    border-bottom: var(--border-bottom);
    margin-bottom: 10px;
  }

  .btns {
    text-align: right;
    // border-top: var(--border-bottom);
    padding: 15px 0;
  }

  .handle {
    cursor: pointer;
    margin-left: 5px;
  }
  .price {
    color: #303133;
  }
  padding: 20px;
  background: #fff;
  border-radius: 15px;
}
.lineNav {
  font-size: 16px;
  margin-top: 10px;
  color: #303133;
}
.orderTextImport {
  margin-bottom: 0px !important;
}
</style>
