<template>
  <div class="swiperWrapper">
    <!-- 中间行的轮播图 -->
    <div class="swiperNews">
      <swiper class="swiper" ref="mySwiper2" :options="swiperOptionNew">
        <swiper-slide
          v-for="(item, index) in advantageList"
          :key="index + 'slider'"
        >
          <div class="newSlider">
            <img :src="item.imageUrl" alt="" />
          </div>
        </swiper-slide>

        <!-- <div class="swiper-pagination2" slot="pagination"></div> -->
        <!-- <div class="prev-btn swiper-button-prev" slot="button-prev" @click="onPrevClick"><i class="el-icon-caret-left"></i></div>
        <div class="next-btn swiper-button-next" slot="button-next" @click="onNextClick"><i class="el-icon-caret-right"></i></div> -->
        <!-- <div class="swiper-button-prev" slot="button-prev" @click="onPrevClick"></div>
        <div class="swiper-button-next" slot="button-next" @click="onNextClick"></div> -->
      </swiper>
    </div>
    <div class="external-controls">
      <button class="prev-btn prev-button" @click="onPrevClick">
        <i class="el-icon-caret-left"></i>
      </button>
      <button class="next-btn next-button" @click="onNextClick">
        <i class="el-icon-caret-right"></i>
      </button>
    </div>
  </div>
</template>
<script>
// require styles
import { Pagination } from "element-ui";

// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "swiperThree",
  data() {
    return {
      // 定义变量
      advantageList: [
        {
          title: "真实数据",
          description: "网罗全球近50年真实数据，文章数据引用，均可溯源！",
          imageUrl: require("@/assets/images/wechat/1.jpg"),
        },
        {
          title: "海量文献",
          description:
            "整合全球10大文献网站数据库，内含超10亿篇文献！高端学者聚集地，学术创作的乐园！",
          imageUrl: require("@/assets/images/wechat/2.jpg"),
        },
        {
          title: "数据安全",
          description:
            "我们采用先进的加密技术和严格的访问控制措施来保护用户隐私和数据安全。您的论文信息不会被存储！",
          imageUrl: require("@/assets/images/wechat/3.jpg"),
        },
        {
          title: "查重降重",
          description:
            "我们的查重降重服务根据自研学术大模型，确保高效识别和降低重复率，同时保持论文的原意和质量，降重准确度高，且降重终身免费！",
          imageUrl: require("@/assets/images/wechat/4.jpg"),
        },
      ],
      swiperOptionNew: {
        slidesPerView: 4,
        spaceBetween: 30,
        mousewheel: true,
        loop: true, // loop:true时前进后退按钮失效
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        // pagination: ".swiper-pagination2",
        // paginationClickable: true,
        speed: 1500,
        // pagination: {
        //   el: ".swiper-pagination2",
        //   clickable: true,
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },

  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件

    // 页面初始化
    // this.swiper.slideTo(3, 1000, false);

    this.$nextTick(() => {
      this.$refs.mySwiper2.swiper.update();
    });
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
    var width =
      document.documentElement.clientWidth || document.body.clientWidth;
    console.log(width);
    if (width > 770) {
      this.swiperOptionNew.slidesPerView = 4;
    } else {
      this.swiperOptionNew.slidesPerView = 2;
    }
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper2.swiper;
    },
  },
  methods: {
    // 定义方法
    onPrevClick() {
      console.log("321---", this.$refs.mySwiper2.swiper);
      // this.swiperOptionNew.loop = false;
      this.$refs.mySwiper2.swiper.slidePrev();
      this.restartAutoplay();
    },
    onNextClick() {
      console.log("322---", this.$refs.mySwiper2.swiper.slideNext);
      this.$refs.mySwiper2.swiper.slideNext();
      this.restartAutoplay();
    },
    restartAutoplay() {
      if (this.$refs.mySwiper2 && this.$refs.mySwiper2.swiper) {
        this.$refs.mySwiper2.swiper.autoplaying = true; // 重置自动播放要用autoplaying属性
      }
    },
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
.sliderImgBox {
  height: 195px;
  background: skyblue;
}

.swiperBox {
  margin-top: 23px;
}

.swiperWrapper {
  position: relative;
}

.external-controls {
  // position: absolute;
  // width: 100%;
  // height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}

.prev-btn i,
.next-btn i {
  font-size: 50px;
}

.prev-btn::after,
.next-btn::after {
  content: none;
}

.external-controls .prev-btn {
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(-100%, -50%);
  border: none;
  background: transparent;
  color: #3355ff;
  z-index: 100;
}

.external-controls .next-btn {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(100%, -50%);
  border: none;
  background: transparent;
  z-index: 100;
  color: #3355ff;
}

.newSlider {
  height: 510px;
  border-radius: 8px;
  background: sandybrown;
}

.newSlider {
  height: 510px;
  background: #ffffff;
  position: relative;
  user-select: none;
  cursor: default;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
  }
}
.swiperNews {
  margin-top: 20px;
}
</style>
