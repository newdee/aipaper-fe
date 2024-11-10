<template>
  <div class="exploreWrapper">
    <!-- AI论文快查 -->
    <div :class="['mainInput', { moved: moved }]" ref="mainInput">
      <p class="inputName">AI搜</p>
      <!-- <div class="selectText">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div> -->
      <!-- 输入框 -->
      <div class="inputBox">
        <input
          v-model="title"
          placeholder="输入你想查找的论文信息"
          type="text"
        />
      </div>
      <div @click="searchGpt" class="searchIconBox">
        <span>
          <img src="@/assets/images/search.png" alt="" />
        </span>
      </div>
    </div>
    <!-- 中间行的轮播图 -->
    <div
      class="mdBox"
      element-loading-text="论文搜索中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <h6>结果分析</h6>
      <div class="mdContent markdown-body">
        <!-- <swiper3></swiper3> -->
        <vue-markdown>
          {{ markdownContent }}
        </vue-markdown>
      </div>
    </div>
  </div>
</template>
<script>
// require styles
import "github-markdown-css";

// import { mapGetters } from "vuex";
import { gpt_search } from "@/api/user";
// import swiper3 from "@/views/home/components/swiperThree.vue";
// import eventBus from "@/utils/eventBus";
import VueMarkdown from "vue-markdown";
export default {
  name: "swiperThree",
  components: {
    // swiper3,
    VueMarkdown,
  },
  data() {
    return {
      loading: false,
      // 定义变量
      markdownContent: "",
      options: [
        {
          value: "选项1",
          label: "综合",
        },
        {
          value: "选项2",
          label: "科学",
        },
        {
          value: "选项3",
          label: "政治",
        },
      ],
      title: "",
      value: "综合",
      swiperOptionNew: {
        freeMode: true,
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      moved: true, // New state to track input position
    };
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
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    // 定义方法

    searchGpt: _.debounce(function () {
      if (!this.title) {
        this.$message({
          type: "warning",
          message: "请输入你要查询的信息",
        });
        return false;
      }
      this.loading = true;
      this.moved = true; // Trigger the animation and display

      let data = {
        title: this.title,
      };
      gpt_search(data)
        .then((res) => {
          console.log("请求成功", res.result);
          this.markdownContent = res.result;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }, 300),
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";
// 搜索框
@import "../home/components/index.scss";

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.exploreWrapper {
  padding: 10px 16px 16px 0px;
  min-height: 550px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .mainInput.moved {
    top: 20px;
  }
}

// 搜索框
.mainInput {
  margin: 0px;
  width: 90%;
  max-width: none;
  height: 56px;
  border-radius: 32px;
  position: absolute;
  transition: all 0.5s ease;
  top: 30%;
}

.mainInput .inputBox input {
  height: 20px;
  padding-left: 20px;
}

// swiper
.sliderImgBox {
  height: 195px;
  background: skyblue;
}

.mdContent {
  margin-top: 23px;
}

.mdBox {
  margin-top: 86px;
  border-radius: 12px;
  transition: all 0.6s ease;
  position: relative;
  overflow: hidden;
  padding: 15px 0px;
  background-color: #fff;
  padding-left: 20px;
  min-height: 500px;
  width: 90%;

  h6 {
    line-height: 2em;
    margin-bottom: 8px;
    font-size: 18px;
    user-select: none;
  }
}

.newSlider {
  height: 510px;
  background: #ffffff;
  position: relative;
  user-select: none;
  cursor: default;
  overflow: hidden;

  .upToDate {
    position: absolute;
    top: 0;
    left: 0;
    width: 76px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    background: #ff4d4d;
    border-radius: 8px 0px 8px 0px;
    opacity: 0.9;
    color: #fff;
  }

  .illustration {
    width: calc(100% - 2px);
    // border: 1px solid #CCCCCC;
    outline: 1px solid #ffffff;
    border-radius: 8px;
  }

  .txt {
    padding: 20px 0px;
    font-size: 14px;
    color: #999;

    .title {
      color: #000000;
      font-size: 18px;
      padding-bottom: 8px;
      text-decoration: underline;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      overflow: hidden;
    }

    .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      word-break: break-all;
      overflow: hidden;
    }
  }

  .authorInfo {
    position: absolute;
    width: 100%;
    top: 390px;
    left: 0;

    .author {
      color: #000000;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      word-break: break-all;
      overflow: hidden;
    }

    .info {
      color: #999;
    }
  }
}
.searchIconBox:hover {
  cursor: pointer;
}
</style>
