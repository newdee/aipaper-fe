<template>
  <div>
    <!-- 页面名称 -->
    <div class="outlineListClass">
      <div class="lineNav">
        <p>最近创建</p>
      </div>
      <div v-for="(orderObj, index) in orderList" :key="index + 'outlineList'">
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
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import eventBus from "@/utils/eventBus";
import { getOutlineList } from "@/api/user";
import { throttle } from "lodash";
import { getToken } from "@/utils/auth"; //

export default {
  name: "step0",
  data() {
    return {
      // 定义变量
      orderList: [],
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
      console.log("用户未登录,大纲不加载 step0!");
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
  },
  methods: {
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
    handleCurrentChange: throttle(function () {
      // 这里可以添加你的分页逻辑，例如发送请求获取新的数据
      let params = {
        page_num: 1,
        page_size: 5,
      };
      getOutlineList(params).then((res) => {
        let data = res.result;
        if (Object.keys(data).length > 0) {
          this.orderList = data.outline_list || [];
          console.log("order", this.orderList);
          // this.page.page_num = data.page_num - 0;
          // this.page.total = data.total;
        }
      });
    }, 300), // 300毫秒内最多执行一次
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import "@/styles/mediaMain.scss";
// @import './index.scss';
.outlineListClass {
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
    justify-content: flex-start;
    line-height: 24px;
  }

  .left {
    width: 300px;
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
</style>
