<template>
  <div class="adMain">
    <div class="swiperListTitle">
      <p>
        <span> 万象核心</span>
        <span class="rightIcon">
          <img src="@/assets/images/index/home_title_bg.png" alt="" />
        </span>
      </p>
    </div>
    <div class="adBox">
      <div class="card" v-for="(card, index) in advantageList" :key="index">
        <div class="image-container">
          <img :src="card.imageUrl" alt="" />
        </div>
        <div class="content">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <p>{{ card.description2 ? card.description2 : "" }}</p>
          <p>{{ card.description3 ? card.description3 : "" }}</p>
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
          title: "真实数据",
          description: "网罗全球近50年真实数据，文章数据引用，均可溯源！",
          imageUrl: require("@/assets/images/index/home_banner03_01_pc.png"),
        },
        {
          title: "海量文献",
          description: "整合全球10大文献网站数据库，内含超10亿篇文献！",
          description2: "高端学者聚集地",
          description3: "学术创作的乐园！",
          imageUrl: require("@/assets/images/index/home_banner03_02_pc.png"),
        },
        {
          title: "数据安全",
          description: "采用先进的加密技术和严格的访问控制措施来",
          description2: "保护用户隐私和数据安全。",
          description3: "您的论文信息不会被存储！",
          imageUrl: require("@/assets/images/index/home_banner03_03_pc.png"),
        },
        {
          title: "查重降重",
          description: "采用自研学术大模型，确保高效识别和降低重复率",
          description2: "同时保持论文的原意和质量",
          description3: "降重准确度高，且降重终身免费！",

          imageUrl: require("@/assets/images/index/home_banner03_04_pc.png"),
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
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 110px;
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f5f9ff;
  position: relative;
  text-align: center;
  color: #333;
  font-size: 16px;
  width: 260px;
  height: 260px;
  background: #eff4f8;
  border: 1px solid #dde4eb;
  border-radius: 8px;
  .content {
    text-align: left;
    padding-left: 30px;
    padding-top: 10px;
  }
}

.image-container {
  width: 160px;
  height: 160px;
  margin-top: -80px;
  border: 1px dashed #afb0b2;
  img {
    width: 100%;
    height: 100%;
  }
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
}

.content h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.content p {
  opacity: 0.5;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #1b2126;
  letter-spacing: 0;
  line-height: 20px;
}
</style>
