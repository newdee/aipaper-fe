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
              <span class="wordage">{{requestForm.type}} | {{requestForm.language}}</span>
            </p>
            <!-- {{ requestForm }}  -->
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
              [论文大纲]
              <span class="add">x1</span>
            </p>
            <p class="include">引言 | 主体 | 结论</p>
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
              <span class="add">x10 + </span>
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

        <!-- 论文正文(PDF版本) -->
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              Word/PDF(正文)
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
        <!-- 论文正文(WORD版本) -->
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>
              致谢模板
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
      <p class="fuTitle">增值附加服务</p>

        <el-checkbox-group
          class="addService "
          v-model="checkboxGroup1"
          @change="fuChange"
          size="small"
        >
          <el-checkbox
            v-for="(item, index) in supportedProducts"
            :label="item.id"
            :key="index + 'fu'"
            border
          >
            <div class="cusLabel">
              <p class="topIntro" v-show="item.intro">{{ item.intro }}</p>
              <p class="addName">{{ item.name }}</p>
              <div class="price">
                <span>0.0元</span>
                <span>{{ item.price }}元</span>
              </div>
            </div>
          </el-checkbox>
        </el-checkbox-group>

        <p class="tips" @click="reduceAIGC">
          AIGC率知网超25%<span>包退费</span>
        </p>
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
      checkboxGroup1: ['6','7','10','11','12','13','14','15'],
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
        {
          id: "10",
          is_supported: true,
          name: "降AIGC痕迹",
          intro: "AI率知网查重超25%,包退款",
          price: 99.9,
        },
        {
          id: "11",
          is_supported: true,
          name: "论文降重",
          intro: "赠送一次万字查重",
          price: 29.9,
        },
        {
          id: "12",
          is_supported: true,
          name: "论文下载,预览",
          intro: "无限次免费下载",
          price: 9.9,
        },
        {
          id: "13",
          is_supported: true,
          name: "无限改稿",
          intro: "根据导师要求,无限改稿",
          price: 29.9,
        },
        {
          id: "14",
          is_supported: true,
          name: "word/laTex/PPT论文",
          intro: "生成Word、Latex及PPT论文,可打包下载",
          price: 29.9,
        },
        {
          id: "15",
          is_supported: true,
          name: "参考文献下载",
          intro: "至少10篇参考文献打包下载",
          price: 39.9,
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
    // this.$store.dispatch("paper/setAdditionList", this.supportedProducts);
    this.fuChange()
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
  computed: {

    ...mapGetters(["requestForm", "homeData"]),
  },
  methods: {
    juanChange(index) {
      this.model = !this.model;
      this.$log(this.model, "model");
      if (this.model) {
        this.$store.dispatch("paper/setAdditionList", this.supportedProducts);
      }
    },
    // this.$store.dispatch("paper/setAdditionList", []);
    fuChange(val) {
      // let fuList =\
      const selectedProducts = this.supportedProducts.filter(product => this.checkboxGroup1.includes(product.id));
      this.$log('val', this.checkboxGroup1)

      this.$store.dispatch("paper/setAdditionList", selectedProducts);
    },
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
