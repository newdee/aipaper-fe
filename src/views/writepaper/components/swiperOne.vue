<template>
  <div>
    <!-- 底图页面 -->
    <div class="swiperBox">
      <swiper :options="swiperOption" ref="mySwiper1">
        <!-- slides -->
        <swiper-slide>
          <div class="slider1Img">
            <img src="@/assets/images/swiperWrite.png" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slider1Img">
            <img src="@/assets/images/swiperWrite.png" alt="" />
          </div>
        </swiper-slide>
        <!-- 其他 slides... -->

        <!-- 分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
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
        spaceBetween: 30,
        mousewheel: true,
        slidesPerView: 1,
        loop: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
      },
    };
  },
  mounted() {
    console.log(this.swiper); // 检查 Swiper 实例
  },
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
.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
