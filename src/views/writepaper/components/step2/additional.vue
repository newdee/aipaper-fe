<template>
  <div>
    <!-- 页面名称 -->
    <div class="spendingBox">
      <p class="fuTitle">您将获得</p>
      <div class="maintxt">
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              [中文]{{ requestForm.title }}
              <span class="add">x1</span>
              <span class="wordage">本科|2万字</span>
            </p>
            <!-- <p>
              {{ requestForm.field ? requestForm.field[1] : "暂无" }}
              <span>含在线编辑</span>
            </p> -->
            <p class="alertTxt">可根据导师要求，无限改稿</p>
            <p class="include">
              封面 | 摘要 | 大纲目录 | 正文 | 致谢 | 参考文献
            </p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
      </div>
      <div class="att">
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              [文献综述]
              <span class="add">x1</span>
            </p>
            <p class="include">提供背景 | 展示现状</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              [中英文摘要]
              <span class="add">x1</span>
            </p>
            <p class="include">中英文翻译 | 简洁扼要</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              [中英文参考文献]
              <span class="add">x1</span>
            </p>
            <p class="include">提供依据 | 支撑论证</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <!-- 学术创新 -->
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              [学术创新]
              <span class="add">x1</span>
            </p>
            <p class="include">提出新观点 | 贡献新知识</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <!-- 论文正文(WORD版本) -->
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              论文正文(Word版本)
              <span class="add">x1</span>
            </p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <!-- 论文正文(PDF版本) -->
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              论文正文(PDF版本)
              <span class="add">x1</span>
            </p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <!-- 论文正文(LEXTEX版本) -->
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              论文正文(Latex版本)
              <span class="add">x1</span>
            </p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <div style="width: 175px"></div>
      </div>
      <p class="fuTitle">附加服务</p>
      <div class="adds">
        <div
          v-for="(item, index) in supportedProducts"
          :label="item"
          :key="index + 'fu'"
          class="labelBox floorBox"
          v-show="item.name == '开题报告' || item.name == '任务书'"
        >
          <div class="left">
            <img
              v-if="true"
              class="home-icon"
              src="@/assets/images/bank-white.png"
              alt=""
            />
            <img
              v-else
              class="home-icon"
              src="@/assets/images/bank-dark.png"
              alt=""
            />
            {{ item.name }}
            <span v-show="item.description">({{ item.description }})</span>
          </div>
          <div class="right">
            <svg
              v-if="model || index !== 3"
              class="icon svg-icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-duigou-cu"></use>
            </svg>
            <svg v-else class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-fangkuang"></use>
            </svg>
          </div>
        </div>
        <div
          v-for="(item, index) in supportedProducts"
          :label="item"
          :key="index + 'fu11'"
          :class="{ labelBox: true, floorBox: true, activeClass: !model }"
          v-show="item.name == '调查问卷'"
          @click="juanChange"
        >
          <div class="left">
            <img
              v-if="model"
              class="home-icon"
              src="@/assets/images/bank-white.png"
              alt=""
            />
            <img
              v-else
              class="home-icon"
              src="@/assets/images/bank-dark.png"
              alt=""
            />
            {{ item.name }}
            <span v-show="item.description">({{ item.description }})</span>
          </div>
          <div class="right">
            <svg v-if="model" class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-duigou-cu"></use>
            </svg>
            <svg v-else class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-fangkuang"></use>
            </svg>
          </div>
        </div>
        <!-- <div class="item">
                    <p></p>
                </div> -->
        <!-- <el-checkbox-group
          class="addService"
          v-model="checkboxGroup1"
          @change="fuChange"
          size="small"
        >
          <el-checkbox
            v-for="(item, index) in supportedProducts"
            :label="item"
            :key="index + 'fu'"
            border
          >
            <div class="cusLabel">
              <p>{{ item.name }}</p>
              <div class="price">
                <span>0.0元</span>
                <span>{{ item.price }}元</span>
              </div>
            </div>
          </el-checkbox>
        </el-checkbox-group> -->

        <!-- <p class="tips" @click="reduceAIGC">
          AIGC率知网超25%<span>包退费</span>
        </p> -->
      </div>
    </div>
  </div>
</template>
<script>
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";
import { mapGetters } from "vuex";

export default {
  name: "additional",
  data() {
    return {
      // 定义变量
      checkboxGroup1: [],
      supportedProducts: [
        { id: "6", is_supported: true, name: "开题报告", price: 4.9 },
        {
          id: "7",
          is_supported: true,
          name: "任务书",
          price: 4.9,
        },
        {
          id: "9",
          is_supported: true,
          name: "调查问卷",
          price: 4.9,
        },
      ],
      supportedProducts2: [
        { id: "6", is_supported: true, name: "开题报告", price: 4.9 },
        {
          id: "7",
          is_supported: true,
          name: "任务书",
          price: 4.9,
        },
      ],
      model: false,
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
    this.$store.dispatch("paper/setAdditionList", this.supportedProducts2);
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
  computed: {
    // 计算属性
    // supportedProducts() {
    //   // 过滤出 is_supported 为 true 的产品
    //   let listData = [];
    //   listData = this.homeData.product_list.filter(
    //     (product) =>
    //       product.is_supported &&
    //       (product.name == "开题报告" ||
    //         product.name == "任务书" ||
    //         product.name == "调查问卷")
    //   );
    //   // this.checkboxGroup1 = listData;

    //   return listData;
    // },
    ...mapGetters(["requestForm", "homeData"]),
  },
  methods: {
    juanChange(index) {
      this.model = !this.model;
      this.$log(this.model, "model");
      if (this.model) {
        this.$store.dispatch("paper/setAdditionList", this.supportedProducts);
      } else {
        this.$store.dispatch("paper/setAdditionList", this.supportedProducts2);
      }
    },
    // this.$store.dispatch("paper/setAdditionList", []);
    fuChange(val) {
      // let fuList =
      this.$store.dispatch("paper/setAdditionList", val);
    },
    // 定义方法
    reduceAIGC() {
      if (this.checkboxGroup1.indexOf("7") != -1) {
        let i = this.checkboxGroup1.indexOf("7");
        this.checkboxGroup1.splice(i, 1);
      } else {
        console.log("576---", this.checkboxGroup1);
        this.checkboxGroup1.push("7");
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
@import "@/styles/variables.scss";
@import "../index.scss";
// 媒体查询
// @media only screen and (max-width: 939px) {
// }
// @media only screen and (max-width: 768px) {
// }

.floorBox {
  font-size: 16px;
  width: 150px;
  height: 40px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #cccccc;
  line-height: 40px;
  padding-left: 14px;
  padding-right: 16px;
  margin-bottom: 22px;
  background: #3355ff;
  color: #fff;
  border-color: #3355ff;
  > div {
    display: inline-block;

    &.right {
      padding-left: 5px;
    }

    .home-icon {
      width: 18px;
      height: 18px;
      transform: translateY(3px);
    }
  }
  .left {
    flex: none;

    svg.icon {
      width: 35px;
      height: 35px;
    }
  }

  .right {
    flex-grow: 1;
    position: relative;
    padding-left: 5px;

    .alignR {
      text-align: right;
      position: absolute;
      right: 0;
      bottom: -8px;

      svg.icon {
        width: 14px;
        height: 14px;
        color: #018417;
      }
    }

    p {
      margin: 0;
      line-height: 1.5em;
    }

    p:first-child {
      padding: 5px 0;
    }
  }
}
.adds {
  display: flex;
  padding-left: 10px;
  .floorBox {
    margin-right: 20px;
  }
}
.activeClass {
  background: #fff !important;
  color: #606266 !important;
}
.floorBox {
  &:hover {
    cursor: pointer;
  }
}
</style>
