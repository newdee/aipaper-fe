<template>
  <div>
    <!-- 页面名称 -->
    <div class="newCard">
      <div class="markBox">
        <img src="@/assets/images/mark.png" alt="" />
      </div>
      <!-- {{ requestForm }} -->
      <p class="requestTitle">
        {{ requestForm.product }}
      </p>
      <!-- 支付卡片 -->
      <div class="payCard">
        <!-- 正式版 -->

        <div
          class="cardClidOnly cardLeft"
          :class="{ selected: internalValue === 'left' }"
          @click="selectCard('left')"
        >
          <p>正式版</p>
          <p>
            {{ requestForm.title }}
          </p>
          <p>总价: {{ defaultPrice }}</p>
          <div class="cardChildList">
            <p>
              {{ requestForm.type }}
            </p>
            <p>
              {{ requestForm.word_count ? requestForm.word_count : "暂无" }}
            </p>
            <p>
              {{ requestForm.language }}
            </p>
            <p>
              {{ requestForm.field[1] }}
            </p>
          </div>
          <!-- 写死正式版的内容 -->
          <div>
            <p>中英文摘要</p>
            <p>中英文参考文献</p>
            <p>论文正文(PDF版)</p>
            <p>论文正文(Latex版)</p>
            <p>论文正文(Word版)</p>
          </div>
          <div>
            <p>承诺知网维普查重率低于20%，超过退款！</p>
          </div>
        </div>
        <!-- 预览版 -->
        <div
          class="cardClidOnly cardRight"
          :class="{ selected: internalValue === 'right' }"
          @click="selectCard('right')"
        >
          <p>正式版</p>
          <p>
            {{ requestForm.title }}
          </p>
          <p>总价: {{ defaultPrice }}</p>
          <div class="cardChildList">
            <p>
              {{ requestForm.type }}
            </p>
            <p>
              {{ requestForm.word_count ? requestForm.word_count : "暂无" }}
            </p>
            <p>
              {{ requestForm.language }}
            </p>
            <p>
              {{ requestForm.field[1] }}
            </p>
          </div>
          <!-- 写死正式版的内容 -->
          <div>
            <p>查看正式版50%内容</p>
            <p>预览满意后再解锁全文</p>
            <p>开题报告不支持预览</p>
            <p>任务书不支持预览</p>
            <p>文件综述不支持预览</p>
          </div>
          <div>
            <p>承诺知网维普查重率低于20%，超过退款！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";
import { mapGetters } from "vuex";
import { predict_price } from "@/api/paper";

export default {
  name: "additional",
  data() {
    return {
      selectedCard: "left", // 用于跟踪选中的卡片
      // 定义变量
      checkboxGroup1: ["6", "7", "10", "11", "12", "13", "14", "15"],
      supportedProducts: [],
      tableData: [
        {
          wordCount: "5000以下",
          vocational: 76,
          undergraduate: 96,
          master: 136,
          finalPaper: 38,
          openingReport: 29,
          taskBook: 29,
          literatureReview: 29,
        },
        {
          wordCount: "6000-8000",
          vocational: 76,
          undergraduate: 96,
          master: 136,
          finalPaper: 48,
          openingReport: 29,
          taskBook: 29,
          literatureReview: 29,
        },
        {
          wordCount: "9000-10000",
          vocational: 116,
          undergraduate: 136,
          master: 176,
          finalPaper: 48,
          openingReport: 29,
          taskBook: 29,
          literatureReview: 29,
        },
        {
          wordCount: "10000 - 15000",
          vocational: 116,
          undergraduate: 136,
          master: 176,
          finalPaper: "-",
          openingReport: 29,
          taskBook: 29,
          literatureReview: 29,
        },
        {
          wordCount: "16000 - 20000",
          vocational: 156,
          undergraduate: 176,
          master: 216,
          finalPaper: "-",
          openingReport: 29,
          taskBook: 29,
          literatureReview: 29,
        },
        {
          wordCount: "21000 - 30000",
          vocational: 196,
          undergraduate: 216,
          master: 256,
          finalPaper: "-",
          openingReport: 29,
          taskBook: 29,
          literatureReview: 29,
        },
      ],
      defaultPrice: "",
      model: false,
    };
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  components: {
    // webinfo,
  },
  watch: {
    requestForm: {
      handler(newVal, oldVal) {
        // 检查是否为初始化调用
        if (oldVal === undefined) {
          this.getDefaultPrice(); // 如果需要在初始化时调用
          return false;
        }
        // 检查具体的字段是否发生变化
        if (
          newVal.key !== oldVal.key ||
          newVal.word_count !== oldVal.word_count ||
          newVal.product !== oldVal.product
        ) {
          // 在这里执行你的操作
          this.getDefaultPrice();
        }
      },
      deep: true, // 启用深度监听
      immediate: true,
    },
  },

  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
    // this.$store.dispatch("paper/setAdditionList", this.supportedProducts);
    // this.fuChange();
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    ...mapGetters(["requestForm", "homeData"]),
    wordShow() {
      return (
        this.requestForm.product == "毕业论文" ||
        this.requestForm.product == "结课论文"
      );
    },
  },
  methods: {
    selectCard(card) {
      this.internalValue = card;
    },
    cellSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex >= 5) {
        // 合并最后三列的单元格
        if (rowIndex === 0) {
          return [this.tableData.length, 1];
        } else {
          return [0, 0];
        }
      }
    },
    getDefaultPrice() {
      // 获取预估价格
      console.log("预估价格", this.requestForm);
      if (this.requestForm.key) {
        let data = {
          key: this.requestForm.key,
          type: this.requestForm.type,
          product: this.requestForm.product,
          word_count: this.requestForm.word_count,
        };
        predict_price(data).then((res) => {
          this.defaultPrice = res.result.predict_price;
        });
      }
    },
    getPrice(educationLevel, wordCount) {
      const levelMap = {
        专科: "vocational",
        本科: "undergraduate",
        研究生: "master",
        结课论文: "finalPaper",
      };

      const levelKey = levelMap[educationLevel];
      if (!levelKey) return "未知学历";

      const range = this.tableData.find((item) => {
        const [min, max] = item.wordCount
          .split("-")
          .map((w) => w.trim().replace(/[^\d]/g, ""));
        if (max) {
          return wordCount >= parseInt(min) && wordCount <= parseInt(max);
        }
        return wordCount < parseInt(min);
      });

      if (range && range[levelKey] !== "-") {
        return `${range[levelKey]}元`;
      } else {
        return "无对应价格";
      }
    },
    juanChange(index) {
      this.model = !this.model;
      this.$log(this.model, "model");
      if (this.model) {
        this.$store.dispatch("paper/setAdditionList", this.supportedProducts);
      }
    },
    // this.$store.dispatch("paper/setAdditionList", []);
    // fuChange(val) {
    //   // let fuList =\
    //   const selectedProducts = this.homeData.additional_service.filter(
    //     (product) => this.checkboxGroup1.includes(product.id)
    //   );
    //   this.$log("val", this.checkboxGroup1);

    //   this.$store.dispatch("paper/setAdditionList", selectedProducts);
    // },
    // 定义方法
    reduceAIGC() {
      if (this.checkboxGroup1.indexOf("7") != -1) {
        let i = this.checkboxGroup1.indexOf("7");
        this.checkboxGroup1.splice(i, 1);
      } else {
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
.payCard {
  display: flex;
}
.cardLeft {
  background: skyblue;
}
.cardChildList {
  display: flex;
}
.cardLeft,
.cardRight {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
}

.selected {
  border-color: blue;
}
.newCard {
  padding-left: 40px;
}
.requestTitle {
  width: 72px;
  height: 25px;
  font-family: PingFangSC-SNaNpxibold;
  font-weight: 600;
  font-size: 18px;
  color: #000000;
  letter-spacing: 0;
}
.cardClidOnly {
  width: 360px;
  height: 420px;
  background: #ffffff;
  border: 2px solid #d8dfe6;
  border-radius: 4px;
}
.cardRight {
  margin-left: 20px;
}
</style>
