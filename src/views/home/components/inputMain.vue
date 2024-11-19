<template>
  <div class="swiperWrapper">
    <!-- 底图页面 -->
    <div class="swiperBox">
      <swiper :options="swiperOption" ref="mySwiper1">
        <!-- slides -->
        <swiper-slide>
          <div class="slider1Img">
            <img src="@/assets/images/banner/1.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slider1Img">
            <img src="@/assets/images/banner/2.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slider1Img">
            <img src="@/assets/images/banner/3.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slider1Img">
            <img src="@/assets/images/banner/4.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slider1Img">
            <img src="@/assets/images/banner/5.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slider1Img">
            <img src="@/assets/images/banner/6.png" alt="" />
          </div>
        </swiper-slide>
        <!-- 其他 slides... -->

        <!-- 分页器 -->
        <div class="swiper-pagination1" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: "inputMain",
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        loop: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        pagination: ".swiper-pagination1",
        paginationType: "bullets",
        paginationClickable: true,
        // pagination: {
        //   el: ".swiper-pagination1",
        //   clickable: true,
        // },
      },
    };
  },
  mounted() {},
  computed: {
    swiper() {
      return this.$refs.mySwiper1.swiper;
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
@import "@/styles/mediaMain.scss";

// 媒体查询
// @media only screen and (max-width: 939px) {
// }

.slider1Img {
  width: 100%;

  img {
    width: 100%;
  }
}

.swiperBox {
  margin-top: 23px;
  border-radius: 12px;
  overflow: hidden;
  user-select: none;
}

.swiperNews {
  margin-top: 60px;
}

.newSlider {
  height: 510px;
  background: sandybrown;
}

// 确保分页器样式没有问题
.swiper-pagination1 {
  // position: absolute;
  // bottom: 10px;
  // left: 50%;
  // transform: translateX(-50%);
}

.swiper-pagination1 {
  position: absolute;
  width: 100%;
  height: 4px;
  text-align: center;
  bottom: 15px;
  z-index: 100;

  &::v-deep > .swiper-pagination-bullet {
    width: 40px;
    height: 4px;
    display: inline-block;
    border-radius: 4px;
    background: #fff;
    opacity: 0.5;
  }

  &::v-deep > .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: #fff;
    opacity: 1;
  }
}
</style>
