<template>
  <div class="swiperWrapper">
    <!-- 底图页面 -->
    <div class="swiperBox">
      <el-carousel
        :interval="4000"
        type="card"
        :loop="true"
        :height="device == 'mobile' ? '100px' : '200px'"
      >
        <el-carousel-item v-for="(item, index) in imgList" :key="'inm' + index">
          <div class="bannerImg">
            <img :src="item.imageUrl" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "inputMain",
  data() {
    return {
      imgList: [
        {
          title: "真实数据",
          description: "网罗全球近50年真实数据，文章数据引用，均可溯源！",
          imageUrl: require("@/assets/images/banner/1.png"),
        },
        {
          title: "海量文献",
          description:
            "整合全球10大文献网站数据库，内含超10亿篇文献！高端学者聚集地，学术创作的乐园！",
          imageUrl: require("@/assets/images/banner/2.png"),
        },
        {
          title: "数据安全",
          description:
            "我们采用先进的加密技术和严格的访问控制措施来保护用户隐私和数据安全。您的论文信息不会被存储！",
          imageUrl: require("@/assets/images/banner/3.png"),
        },
        {
          title: "查重降重",
          description:
            "我们的查重降重服务根据自研学术大模型，确保高效识别和降低重复率，同时保持论文的原意和质量，降重准确度高，且降重终身免费！",
          imageUrl: require("@/assets/images/banner/4.png"),
        },
        {
          title: "查重降重",
          description:
            "我们的查重降重服务根据自研学术大模型，确保高效识别和降低重复率，同时保持论文的原意和质量，降重准确度高，且降重终身免费！",
          imageUrl: require("@/assets/images/banner/5.png"),
        },
        {
          title: "查重降重",
          description:
            "我们的查重降重服务根据自研学术大模型，确保高效识别和降低重复率，同时保持论文的原意和质量，降重准确度高，且降重终身免费！",
          imageUrl: require("@/assets/images/banner/6.png"),
        },
      ],
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
    ...mapGetters(["device"]),
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
.bannerImg {
  width: 500px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
