<template>
  <div>
    <!-- 优势页 -->
    <el-dialog
      :visible.sync="advantageStatus"
      width="900px"
      top="0"
      append-to-body
      class="dialogContainer"
    >
      <div class="drafrContent">
        <div class="drafr-example-pager__catalogue">
          <div @click="scrollToSection('sec1')">
            <div
              :class="{ 'catalogue-item': true, active: activeId === 'sec1' }"
            >
              标题
            </div>
          </div>
          <div @click="scrollToSection('sec2')">
            <div
              :class="{ 'catalogue-item': true, active: activeId === 'sec2' }"
            >
              摘要(中)
            </div>
          </div>
          <div @click="scrollToSection('sec3')">
            <div
              :class="{ 'catalogue-item': true, active: activeId === 'sec3' }"
            >
              摘要(英)
            </div>
          </div>
          <div @click="scrollToSection('sec4')">
            <div
              :class="{ 'catalogue-item': true, active: activeId === 'sec4' }"
            >
              目录
            </div>
          </div>
          <div @click="scrollToSection('sec5')">
            <div
              :class="{ 'catalogue-item': true, active: activeId === 'sec5' }"
            >
              第一章
            </div>
          </div>
          <div @click="scrollToSection('sec6')">
            <div
              :class="{ 'catalogue-item': true, active: activeId === 'sec6' }"
            >
              第二章
            </div>
          </div>
          <div @click="scrollToSection('sec7')">
            <div
              :class="{ 'catalogue-item': true, active: activeId === 'sec7' }"
            >
              第三章
            </div>
          </div>
          <div @click="scrollToSection('sec26')">
            <div
              :class="{ 'catalogue-item': true, active: activeId === 'sec26' }"
            >
              参考文献
            </div>
          </div>
        </div>

        <div class="dialogHeader">
          <p>示例毕业论文</p>
        </div>
        <div class="main-txt">
          <div id="sec1"></div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_00.png" alt="" />
          </div>
          <div id="sec2"></div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_01.png" alt="" />
          </div>
          <div id="sec3"></div>

          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_02.png" alt="" />
          </div>
          <div id="sec4"></div>

          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_03.png" alt="" />
          </div>
          <div id="sec5"></div>

          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_04.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_05.png" alt="" />
          </div>

          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_06.png" alt="" />
          </div>
          <div id="sec6"></div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_07.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_08.png" alt="" />
          </div>

          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_09.png" alt="" />
          </div>

          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_10.png" alt="" />
          </div>
          <div id="sec7"></div>

          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_11.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_12.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_13.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_14.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_15.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_16.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_17.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_18.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_19.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_20.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_21.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_22.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_23.png" alt="" />
          </div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_24.png" alt="" />
          </div>
          <div id="sec26"></div>
          <div class="paperPdfSlider">
            <div class="s1 s0"></div>
            <div class="s1 s2"></div>
            <div class="s1 s3"></div>
            <div class="s1 s4"></div>
            <img src="@/assets/images/example/paper_25.png" alt="" />
          </div>
        </div>
      </div>
      <!-- <div slot="title" class="dialog-tittle">
        <p>普通AI vs <span class="txt_red">万象写作</span></p>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
  name: "advantage",
  data() {
    return {
      // 定义变量
      activeId: "sec1",
      advantageStatus: false,
      imgList: [
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_00.png"),
        },
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_01.png"),
        },
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_02.png"),
        },
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_03.png"),
        },
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_04.png"),
        },
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_05.png"),
        },
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_06.png"),
        },
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_07.png"),
        },
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_08.png"),
        },
        {
          title: "",
          description: "",
          imageUrl: require("@/assets/images/example/paper_09.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_10.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_11.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_12.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_13.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_14.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_15.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_16.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_17.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_18.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_19.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_20.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_21.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_22.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_23.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_24.png"),
        },
        {
          imageUrl: require("@/assets/images/example/paper_25.png"),
        },
      ],
    };
  },

  // watch()
  components: {
    // webinfo,
  },
  mounted() {
    // 页面初始化
  },

  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
    showDia() {
      this.advantageStatus = true;
    },
    scrollToSection(sectionId) {
      console.log(this.$refs, "refs");
      const container = document.querySelector(".el-dialog__body .main-txt");
      const targetElement = document.querySelector(
        `.el-dialog__body #${sectionId}`
      );
      this.activeId = sectionId;
      this.$log(container, targetElement);
      if (container && targetElement) {
        this.$scrollTo(targetElement, 500, {
          container: container,
          easing: "ease-in-out",
          offset: 30,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
* p {
  margin: 0px;
}
// 引入scss
// @import './index.scss';
@import "@/styles/variables.scss";

// 媒体查询
@media only screen and (max-width: 640px) {
  .dialogContainer ::v-deep .el-dialog {
    width: 370px;
  }
}
@media only screen and (min-width: 640px) {
  .dialogContainer ::v-deep .el-dialog {
    width: 640px;
  }
}
@media only screen and (min-width: 800px) {
  .dialogContainer ::v-deep .el-dialog {
    width: 800px;
  }
}
.dialog-tittle {
  font-size: 1.1em;
}
.main-txt {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 90px);
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
  .imgBoxScroll {
    img {
      width: 100%;
      height: 100%;
    }
  }
  /* 针对整个滚动条 */
  &::-webkit-scrollbar {
    width: 12px; /* 滚动条的宽度 */
    height: 20px; /* 滚动条的高度 */
  }

  /* 滚动条的轨道 */
  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* 滚动条轨道的背景色 */
    border-radius: 10px; /* 可以选择设置圆角 */
  }

  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    background: #c0c0c0; /* 滑块的背景色 */
    border-radius: 10px; /* 滑块的圆角 */
    border: 2px solid #f0f0f0; /* 滑块边框，与轨道背景色相同 */
  }

  /* 当鼠标悬停在滚动条滑块上时 */
  &::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0; /* 滑块的背景色 */
  }
}
.drafrContent {
  width: 100%;
  height: 100%;
}
.dialogHeader {
  position: fixed;
  background: #fff;
  color: #35f;
  font-weight: bold;
  z-index: 10;
  top: 0;
  margin-left: -20px;
  width: 900px;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
  font-size: 14px;

  text-align: center;
}
.paperPdfSlider {
  width: 790px;
  margin-top: 40px;
  height: 1070px;
  padding: 42px 59px;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.16);
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .s1 {
    width: 18px;
    height: 18px;
    position: absolute;
  }
  .s0 {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    top: 20px;
    left: 30px;
  }
  .s2 {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    top: 20px;
    right: 30px;
  }
  .s3 {
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    left: 30px;
    bottom: 20px;
  }
  .s4 {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    right: 30px;
    bottom: 20px;
  }
}
.drafr-example-pager__catalogue {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  -webkit-font-smoothing: antialiased;
  color: #606266;
  word-break: break-all;
  text-align: left;
  font-size: 14px;
  font-family: Microsoft YaHei;
  margin: 0;
  padding: 5px;
  box-sizing: border-box;
  position: absolute;
  left: -1px;
  top: 54px;
  transform: translateX(-100%);
  background: #fff;
  border-radius: 8px 0 0 8px;
  & > div {
    --totl-primary-background: rgba(255, 255, 255, 0.8);
    --totl-primary-font-color: #000;
    --totl-primate-font-descolor: #565656;
    -webkit-font-smoothing: antialiased;
    color: #606266;
    word-break: break-all;
    text-align: left;
    font-size: 14px;
    font-family: Microsoft YaHei;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .catalogue-item {
    --totl-primary-background: rgba(255, 255, 255, 0.8);
    --totl-primary-font-color: #000;
    --totl-primate-font-descolor: #565656;
    -webkit-font-smoothing: antialiased;
    color: #606266;
    word-break: break-all;
    text-align: left;
    font-size: 14px;
    font-family: Microsoft YaHei;
    margin: 0;
    box-sizing: border-box;
    height: 34px;
    border-radius: 6px;
    line-height: 34px;
    padding: 0 20px;
  }
  .active {
    background: #f2f6ff;
    color: #467af2;
  }
}
::v-deep .el-dialog__wrapper {
  overflow: hidden;
}
</style>
