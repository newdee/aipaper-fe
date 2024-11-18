<template>
  <div class="swiperWrapper">
    <div class="swiperBox">
      <swiper :options="swiperOption" ref="mySwiper1">
        <!-- slides -->
        <swiper-slide>
          <div class="slider1Img">
            <img src="@/assets/images/banner/banner1.png" alt="" />
          </div>
        </swiper-slide>
        <!-- ... -->
        <!-- Pagination -->
        <div class="swiper-pagination1" slot="pagination"></div>
        <!-- Navigation buttons -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
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
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination1",
          clickable: true,
        },
        on: {
          progress: function (swiper, progress) {
            for (let i = 0; i < swiper.slides.length; i++) {
              let slide = swiper.slides[i];
              let slideProgress = swiper.slides[i].progress;
              let modify = 1;
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
              }
              let translate = slideProgress * modify * 260 + "px";
              let scale = 1 - Math.abs(slideProgress) / 5;
              let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
              slide.style.transform = `translateX(${translate}) scale(${scale})`;
              slide.style.zIndex = zIndex;
              slide.style.opacity = 1;
              if (Math.abs(slideProgress) > 3) {
                slide.style.opacity = 0;
              }
            }
          },
          setTransition: function (swiper, transition) {
            for (let i = 0; i < swiper.slides.length; i++) {
              let slide = swiper.slides[i];
              slide.style.transition = `${transition}ms`;
            }
          },
          slideChange: function (swiper) {
            if (swiper.activeIndex === 4) {
              const bullets = swiper.pagination.bullets;
              if (bullets && bullets[9]) {
                bullets[9].classList.add("swiper-pagination-bullet-active");
              }
            }
          },
        },
      },
    };
  },
  mounted() {
    // Any additional mounted logic
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper1.swiper;
    },
  },
  methods: {
    // Define additional methods if needed
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
.slider1Img {
  width: 100%;
  img {
    width: 100%;
    display: block; // 确保图片块级显示以避免浮动问题
  }
}

.swiperBox {
  margin-top: 23px;
  border-radius: 12px;
  overflow: hidden;
  position: relative; // 确保位置相对，以便定位内部元素
}

.swiper-pagination1 {
  position: absolute;
  width: 100%;
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

.swiper-button-prev,
.swiper-button-next {
  color: #fff; // 确保导航按钮可见
  position: absolute;
  top: 50%;
  width: 27px;
  height: 44px;
  margin-top: -22px;
  z-index: 10;
  cursor: pointer;
  display: block;
}
</style>
