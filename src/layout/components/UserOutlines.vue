<template>
  <div class="ordersList">
    <div class="btns">
      <!-- <el-button type="primary" round @click="delList">删除大纲</el-button> -->
      <el-button type="primary" round @click="refresh">刷新大纲</el-button>
    </div>
    <!-- 大纲列表 -->
    <el-checkbox-group v-model="checkList" @change="handleCheckAllChange">
      <div
        class="orderBox"
        v-for="(orderObj, index) in orderList"
        :key="index + 'outline'"
      >
        <!-- <el-checkbox :label="orderObj.id" :value="orderObj.id"></el-checkbox> -->
        <div class="order">
          <div class="orderNum rowBetween">
            <!-- <div class="left">大纲号：{{ orderObj.order.out_trade_no }}</div> -->
            <div class="left"></div>
            <div class="right">
              时间：
              {{ orderObj.updated_at | dateFormatter }}
              <!-- 创建时间还是生成时间? -->
            </div>
          </div>
          <div>
            <div class="orderTitle">{{ orderObj.title }}</div>
            <div class="orderText rowBetween handleRow">
              <div class="left">大纲状态：{{ orderObj.status }}</div>
              <div class="right">
                <el-button
                  @click="downLoadLine(orderObj)"
                  icon="el-icon-download"
                  :disabled="orderObj.status != '生成成功'"
                  type="text"
                >
                  付费下载
                </el-button>
                <el-button
                  @click="jumpStep2(orderObj)"
                  icon="el-icon-view"
                  :disabled="orderObj.status != '生成成功'"
                  type="text"
                >
                  查看大纲
                </el-button>
              </div>
            </div>
          </div>

          <div class="orderText rowBetween handleRow">
            <div class="left">
              类型:
              <span class="price">{{ orderObj.type }}</span>
            </div>
            <div class="left">
              科目:
              <span class="price">{{ orderObj.field }}</span>
            </div>
            <div class="right">
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
import { getOutlineList } from "@/api/user";
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
    downLoadLine(row) {
      let requestForm = {
        title: row.title,
        threeCon: false,
        language: row.language,
        type: row.type,
        field: ["哲学", row.field],
        key: row.key1,
      };
      this.$store.dispatch("app/setRequestForm", requestForm);
      eventBus.emit("showDownOutline", requestForm);
      eventBus.emit("orderDialogChange", false);
    },
    jumpStep2(row) {
      zhuge.track(`用户查看大纲`, {
        大纲标题: row.title,
        大纲key: row.key1,
      });
      // row.key1
      this.$router.push(
        {
          path: "/main/writepaper",
          query: {
            key1: row.key1,
            field: row.field,
            timeData: new Date().getTime(),
          },
        },
        () => {
          this.$nextTick(() => {
            let requestForm = {
              title: row.title,
              threeCon: false,
              language: row.language,
              type: row.type,
              field: ["哲学", row.field],
              key: row.key1,
            };
            this.$store.dispatch("app/setRequestForm", requestForm);

            eventBus.emit("setFormData", requestForm); // 发布事件
            eventBus.emit("orderDialogChange", false);
          });
        }
      );
    },
    refresh() {
      this.handleCurrentChange(1);
    },
    handleCheckAllChange(val) {
      if (val.length > 1) {
        this.$message({
          type: "warning",
          message: "只能同时选择一条数据!",
        });
        this.checkList.pop();
      }
    },
    delList() {
      // delOrder(this.checkList).then((res) => {
      // });
    },
    handleCurrentChange: throttle(function (newPage) {
      // 这里可以添加你的分页逻辑，例如发送请求获取新的数据
      let params = {
        page_num: newPage,
        page_size: this.page.page_size,
      };
      getOutlineList(params).then((res) => {
        let data = res.result;
        if (Object.keys(data).length > 0) {
          this.orderList = data.outline_list || [];
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
  margin-top: 15px;
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
</style>
