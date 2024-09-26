<template>
  <div>
    <!-- 底图页面 -->

    <div class="swiperBox">
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        @someSwiperEvent="callback"
      >
        <!-- slides -->
        <swiper-slide>
          <div class="sliderImgBox">
            <img src="@/assets/images/banner.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide> <div class="sliderImgBox">I'm Slide3</div></swiper-slide>
        <swiper-slide>
          <div class="sliderImgBox">
            <img src="@/assets/images/banner.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide> <div class="sliderImgBox">I'm Slide5</div></swiper-slide>
        <swiper-slide>
          <div class="sliderImgBox">I'm Slide 6</div></swiper-slide
        >
        <swiper-slide>
          <div class="sliderImgBox">I'm Slide 7</div></swiper-slide
        >

        <!-- 为了显示底部原点分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="swiperNews">
      <swiper class="swiper" :options="swiperOptionNew">
        <swiper-slide><div class="newSlider">1</div></swiper-slide>
        <swiper-slide><div class="newSlider">2</div></swiper-slide>
        <swiper-slide><div class="newSlider">3</div></swiper-slide>
        <swiper-slide><div class="newSlider">4</div></swiper-slide>
        <swiper-slide><div class="newSlider">5</div></swiper-slide>
        <swiper-slide><div class="newSlider">6</div></swiper-slide>
        <swiper-slide><div class="newSlider">7</div></swiper-slide>
        <swiper-slide><div class="newSlider">8</div></swiper-slide>
        <swiper-slide><div class="newSlider">9</div></swiper-slide>
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
  name: "myFooter",
  data() {
    return {
      // 定义变量
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        slidesPerView: 1, // 定义slides的数量多少为一组
        spaceBetween: 30, // 在slide之间设置距离（单位px）
        mousewheel: true, // 开启鼠标滚轮控制Swiper切换
        loop: true, // 是否循环
        autoplay: true, // 是否自动切换
        pagination: ".swiper-pagination",
      },
      swiperOptionNew: {
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
// @import "@/styles/variables.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }

.sliderImgBox {
  height: 195px;
  background: skyblue;
}
.swiperBox {
  margin-top: 23px;
}
.swiperNews {
  margin-top: 60px;
}
.newSlider {
  height: 510px;
  background: sandybrown;
}
</style>
