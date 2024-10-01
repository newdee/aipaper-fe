<template>
  <div>
    <!-- 中间行的轮播图 -->
    <div class="swiperNews">
      <swiper ref="mySwiper" class="swiper" :options="swiperOptionNew">
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
import { Pagination } from "element-ui";
import "swiper/swiper.css";

// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "swiperThree",
  data() {
    return {
      // 定义变量

      swiperOptionNew: {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        // pagination: {
        //   el: ".swiper-pagination",
        // },
        pagination: ".swiper-pagination",
      },
    };
  },

  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    console.log("Current Swiper instance object", this.swiper);
    // 页面初始化
    // this.swiper.slideTo(3, 1000, false);
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
