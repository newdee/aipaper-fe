<template>
  <div>
    <!-- 底图页面 -->

    <div class="mainBackground">
      <div></div>
    </div>
    <div class="swiperBox">
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        @someSwiperEvent="callback"
      >
        <!-- slides -->
        <swiper-slide>
          <div class="sliderImgBox">I'm Slide 1</div>
        </swiper-slide>
        <swiper-slide> <div class="sliderImgBox">I'm Slide3</div></swiper-slide>
        <swiper-slide> <div class="sliderImgBox">I'm Slide4</div></swiper-slide>
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
        pagination: {
          // 控制分页器
          el: ".swiper-pagination",
          clickable: true, // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换
        },
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
.mainBackground {
  background: url("../../../assets/images/newspaper.png") no-repeat 0 0;
  background-size: cover;
  height: 612px;
  width: 100%;
}
.sliderImgBox {
  height: 195px;
  background: skyblue;
}
.swiperBox {
  margin-top: 23px;
}
</style>
