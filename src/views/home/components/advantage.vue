<template>
  <div class="adMain">
    <div class="swiperListTitle">
      <p>
        <span> 我们的优势</span>
        <span class="rightIcon">
          <img src="@/assets/images/index/home_title_bg.png" alt="" />
        </span>
      </p>
    </div>
    <div class="adBox">
      <div class="card" v-for="(card, index) in advantageList" :key="index">
        <div class="image-container">
          <img :src="card.imageUrl" alt="advantage image" class="card-image" />
          <div class="content">
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "advantage",
  data() {
    return {
      advantageList: [
        {
          title: "免费降重/降AIGC",
          description: "全网首家",
          imageUrl: require("@/assets/images/index/home_banner02_01_pc@2x.png"),
        },
        {
          title: "海量真实参考文献",
          description: "支持图、表、公式、代码",
          imageUrl: require("@/assets/images/index/home_banner02_02_pc@2x.png"),
        },
        {
          title: "写作风格细腻，无AI痕迹",
          description: "注册领取礼包",
          imageUrl: require("@/assets/images/index/home_banner02_03_pc@2x.png"),
        },
        {
          title: "实力雄厚，售后无忧",
          description: "荣获RRE300w美金投资，学术AI独角兽",

          imageUrl: require("@/assets/images/index/home_banner02_04_pc@2x.png"),
        },
        {
          title: "AI助手免费畅聊",
          description: "给你论文提供无限思路参考",
          imageUrl: require("@/assets/images/index/home_banner02_05_pc@2x.png"),
        },
        {
          title: "查重无忧，知网超20%直接退费",
          description: "知网、维普高于20%退费",
          imageUrl: require("@/assets/images/index/home_banner02_06_pc@2x.png"),
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";

.adBox {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}

.card {
  width: calc((100% - 40px) / 3);
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px dashed #ddd; // 添加边框，类似示例
  background-image: linear-gradient(
    269deg,
    #ffffff 0%,
    #ffffff52 35%,
    #ffffff00 100%
  );
  border-radius: 8px;
  .image-container {
    position: relative;
    width: 100%;
    height: 140px;

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .content {
      position: absolute;
      top: 40px; // 调整文字在图片上的位置
      left: 30px;
      color: #1b2126;

      h3 {
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        font-size: 20px;
        color: #1b2126;
        letter-spacing: 0;
        margin: 0;
      }

      p {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #1b2126;
        letter-spacing: 0;
        margin: 7px 0 0;
      }
    }
  }
}
</style>
