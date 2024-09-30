<template>
  <div class="exploreWrapper">
    <!-- AI论文快查 -->
    <div class="mainInput">
      <p class="inputName">AI 论文快查</p>
      <div class="selectText">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- 输入框 -->
      <div class="inputBox">
        <input placeholder="输入你想查找的论文信息" type="text" />
      </div>
      <div class="searchIconBox">
        <span>
          <img src="@/assets/images/search.png" alt="" />
        </span>
      </div>
    </div>
    <!-- 中间行的轮播图 -->
    <div class="swiperNews">
      <h6>最新热点</h6>
      <swiper class="swiper" :options="swiperOptionNew">
        <swiper-slide>
          <div class="newSlider">1</div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">2</div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">3</div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">4</div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">5</div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">6</div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">7</div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">8</div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">9</div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
// require styles
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "swiperThree",
  data() {
    return {
      // 定义变量

      options: [
        {
          value: "选项1",
          label: "综合",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
      ],
      value: "综合",
      swiperOptionNew: {
        freeMode: true,
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        pagination: ".swiper-pagination",
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
    this.swiper.slideTo(3, 1000, false);
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
}

// 搜索框
.mainInput {
  margin: 0px;
  width: 100%;
  max-width: none;
  height: 56px;
  border-radius: 32px;
}

.mainInput .inputBox input {
  height: 20px;
}

// swiper
.sliderImgBox {
  height: 195px;
  background: skyblue;
}

.swiperBox {
  margin-top: 23px;
}

.swiperNews {
  margin-top: 16px;
  border-radius: 12px;
  overflow: hidden;
  padding: 15px 0px;
  background-color: #fff;

  h6 {
    line-height: 2em;
    padding: 0 2em;
  }
}

.newSlider {
  height: 510px;
  background: sandybrown;
}
</style>
