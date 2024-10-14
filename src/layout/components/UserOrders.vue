<template>
  <div class="ordersList">
    <div class="btns">
      <el-button type="primary" round @click="delList">删除订单</el-button>
      <el-button type="primary" round @click="getList">刷新订单</el-button>
    </div>
    <!-- 订单列表 -->
    <el-checkbox-group v-model="checkList" @change="handleCheckAllChange">
      <div
        class="orderBox"
        v-for="orderObj in orderList"
        :key="orderObj.order.id"
      >
        <el-checkbox
          :label="orderObj.order.id"
          :value="orderObj.order.id"
        ></el-checkbox>
        <div class="order">
          <div class="orderNum rowBetween">
            <!-- <div class="left">订单号：{{ orderObj.order.out_trade_no }}</div> -->
            <div class="left"></div>
            <div class="right">时间：{{ orderObj.order.created_at }}</div>
          </div>
          <template v-for="(item, j) in orderObj.order_item_response">
            <div class="orderTitle" :key="item.paper.title + j">
              {{ item.paper.title }}
            </div>
            <div
              class="orderText rowBetween handleRow"
              :key="item.product.id + j"
            >
              <div class="left">{{ item.product.name }}</div>
              <div class="right">
                <span class="handle">下载</span>
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-download"></use>
                </svg>
              </div>
            </div>
          </template>
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
            <div class="left">订单价格</div>
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
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import { getList } from "@/api/table";
import { getOrderList, delOrder } from "@/api/user";

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
      this.getList();
    },
  },
  mounted() {
    // 页面初始化
    this.getList();
  },

  computed: {
    // 计算属性
  },
  methods: {
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
      console.log(this.checkList);
      delOrder(this.checkList).then((res) => {
        console.log(res);
      });
    },
    // 定义方法
    getList() {
      let data = {
        page_size: 100,
      };
      getOrderList(data).then((res) => {
        console.log("res", res);
        this.orderList = res.result;
        let data = res.result;
        if (Object.keys(data).length > 0) {
          this.orderList = data.order_resp_list || [];
        }
      });
    },
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
  width: 8px; /* 滚动条宽度 */
  background-color: #f5f5f5; /* 背景颜色 */
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
