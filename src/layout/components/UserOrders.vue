<template>
  <div class="ordersList">
    <div class="btns">
      <el-button type="primary" round @click="delList">删除订单</el-button>
      <el-button type="primary" round @click="refresh">刷新订单</el-button>
    </div>
    <!-- 订单列表 -->
    <el-checkbox-group v-model="checkList" @change="handleCheckAllChange">
      <div
        class="orderBox"
        v-for="(orderObj, i) in orderList"
        :key="orderObj.order.id + '-' + i"
      >
        <el-checkbox
          :label="orderObj.order.out_trade_no"
          :value="orderObj.order.out_trade_no"
        ></el-checkbox>
        <div class="order">
          <div class="orderNum rowBetween">
            <!-- <div class="left">订单号：{{ orderObj.order.out_trade_no }}</div> -->
            <div class="left"></div>
            <div class="right">
              时间：{{ orderObj.order.created_at | dateFormatter }}
            </div>
          </div>
          <div v-if="orderObj.order_item_response.length > 0">
            <template v-for="(item, j) in orderObj.order_item_response">
              <div class="orderTitle" :key="'case2' + j">
                论文题目: {{ item.case.paper_case.title }}
              </div>
              <div class="orderTitle" :key="'case3' + j">
                生成状态:
                <el-link
                  :type="
                    item.case.paper_case.stage == 1
                      ? 'primary'
                      : item.case.paper_case.stage == 2
                      ? 'success'
                      : item.case.paper_case.stage === 3
                      ? 'danger'
                      : 'warning'
                  "
                  >{{
                    item.case.paper_case.stage | orderStatusFormatter
                  }}</el-link
                >
              </div>
              <div class="orderTitle" :key="'title' + j">
                {{ item.product.name }}
              </div>
              <div class="orderText rowBetween handleRow" :key="'case' + j">
                <div class="left"></div>
                <div class="right">
                  <el-button
                    icon="el-icon-view"
                    type="text"
                    :disabled="item.case.paper_case.stage !== 1"
                    @click="pushStep3(orderObj)"
                  >
                    查看论文进度
                  </el-button>
                  <el-button
                    icon="el-icon-view"
                    type="text"
                    :disabled="!item.case.file_urls.pdf"
                    @click="openPaper(item)"
                  >
                    预览
                  </el-button>
                  <el-button
                    icon="el-icon-download"
                    :disabled="item.case.paper_case.stage != 2"
                    type="text"
                    @click="downLoadPaper(orderObj)"
                  >
                    下载
                  </el-button>
                </div>
              </div>
            </template>
          </div>
          <!-- <div class="orderOutline rowBetween handleRow">
            <div class="left">[本科·约2万字]</div>
            <div class="right">
              查看大纲
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-view"></use>
              </svg>
            </div>
          </div>
          <div class="orderText rowBetween handleRow">
            <div class="left">正文（含无限改稿）</div>
            <div class="right">
              改稿下载
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-download"></use>
              </svg>
            </div>
          </div> -->
          <div class="orderText rowBetween handleRow">
            <div class="left">订单价格:</div>
            <div class="right">
              <span class="price">￥{{ orderObj.order.total_price }}</span>
              <span
                class="handle"
                v-if="orderObj.order.payment_status == 'WAIT_BUYER_PAY'"
                style="color: crimson"
                >去支付</span
              >
            </div>
          </div>
        </div>
      </div>
    </el-checkbox-group>
    <div class="block">
      <el-pagination
        background
        small
        layout="total, prev, pager, next"
        :total="page.total"
        :page-size="page.page_size"
        :current-page="page.page_num"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import { getList } from "@/api/table";
import { getOrderList, delOrder, paperPack } from "@/api/user";
import { throttle } from "lodash";
import eventBus from "@/utils/eventBus";

export default {
  name: "UserOrders",
  props: {
    listId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 定义变量
      checkList: [],
      orderList: [],
      downStatus: false,
      page: {
        page_num: 0,
        page_size: 5,
        total: null,
      },
    };
  },
  components: {
    // webinfo,
  },
  watch: {
    // 当listId发生变化时执行此回调
    listId(newVal, oldVal) {
      console.log("listId changed from " + oldVal + " to " + newVal);
      // 在这里处理listId变化后需要做的事情
      this.handleCurrentChange(1);
    },
  },
  mounted() {
    // 页面初始化
    this.handleCurrentChange(1);
  },

  computed: {
    // 计算属性
  },
  methods: {
    pushStep3(row) {
      console.log("statsrow", row);
      // 跳转到写论文页面
      this.$router.push({
        path: "/main/writepaper",
        // query: { key1: row.key1, field: row.field },
      });
      eventBus.emit("orderDialogChange", false);
      // 关闭弹窗
      this.$nextTick(() => {
        eventBus.emit("showEmitPaperDialog", {
          requestKey: row.order.out_trade_no,
          payStatus: true,
          paperPercent: 40,
        });
      });
    },
    downLoadPaper(item) {
      console.log("item", item.order.out_trade_no);
      this.downStatus = true;
      paperPack({ out_trade_no: item.order.out_trade_no }).then((res) => {
        console.log("ad", res.result.zip_url);
        this.downStatus = false;

        window.open(res.result.zip_url, "_target");
      });
      // window.open(item.case.file_urls.pdf, "_target");
    },
    openPaper(item) {
      console.log("item", item);
      window.open(item.case.file_urls.pdf, "_target");
    },
    refresh() {
      this.handleCurrentChange(1);
    },
    handleCheckAllChange(val) {
      console.log("val", val);
      this.checkList = val;
      // if (val.length > 1) {
      //   this.$message({
      //     type: "warning",
      //     message: "只能同时选择一条数据!",
      //   });
      //   this.checkList.pop();
      // }
    },
    delList() {
      console.log(this.checkList);
      let data = {
        trade_no_list: this.checkList,
      };
      delOrder(data).then((res) => {
        console.log(res);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.checkList = [];
        this.handleCurrentChange();
      });
    },
    handleCurrentChange: throttle(function (newPage) {
      console.log("当前页:", newPage);
      // 这里可以添加你的分页逻辑，例如发送请求获取新的数据
      let params = {
        page_num: newPage ? newPage : this.page.page_num,
        page_size: this.page.page_size,
      };
      getOrderList(params).then((res) => {
        let data = res.result;
        if (Object.keys(data).length > 0) {
          this.orderList = res.result.order_resp_list || [];
          this.page.page_num = data.page_num - 0;
          this.page.total = data.total;
        }
      });
    }, 300), // 300毫秒内最多执行一次
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

.orderBox ::v-deep .el-checkbox .el-checkbox__label {
  display: none;
}

.rowBetween {
  display: flex;
  justify-content: space-between;
  line-height: 2em;
}

.rowBetween .left {
  color: #666;
}

.rowBetween .right {
  color: #409eff;
}

.orderNum.rowBetween div {
  color: #999;
  font-size: 12px;
}

.orderTitle {
  color: #202020;
  font-weight: 600;
  margin-top: 6px;
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
</style>
