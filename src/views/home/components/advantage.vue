<template>
  <div class="adMain">
    <div>
      <p class="swiperListTitle">
        <span> 为什么选择万象写作</span>
      </p>
    </div>
    <div class="adBox">
      <div class="card" v-for="(card, index) in advantageList" :key="index">
        <div class="background-pattern" :class="'pattern-' + (index + 1)">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
          <div class="circle circle-3"></div>
          <div class="circle circle-4 overlap"></div>
        </div>
        <div class="content">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
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
          imageUrl: require("@/assets/images/avantage1.jpg"),
        },
        {
          title: "海量文献",
          description:
            "整合全球10大文献网站数据库，内含超10亿篇文献！高端学者聚集地，学术创作的乐园！",
          imageUrl: require("@/assets/images/avantage2.jpg"),
        },
        {
          title: "数据安全",
          description:
            "我们采用先进的加密技术和严格的访问控制措施来保护用户隐私和数据安全。您的论文信息不会被存储！",
          // imageUrl: require("@/assets/images/avantage3.jpg"),
        },
        {
          title: "查重降重",
          description:
            "我们的查重降重服务根据自研学术大模型，确保高效识别和降低重复率，同时保持论文的原意和质量，降重准确度高，且降重终身免费！",
          imageUrl: require("@/assets/images/avantage4.jpg"),
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
  align-items: center;
  margin: 20px;
}
.content {
  h3 {
    color: #fff;
  }
  p {
    color: #fff;
  }
}
.card {
  width: 250px;
  height: 400px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.card:nth-child(1) {
  background: linear-gradient(135deg, #44c767 0%, #5cbf2a 100%);
}
.card:nth-child(2) {
  background: linear-gradient(135deg, #f9d423 0%, #f83600 100%);
}
.card:nth-child(3) {
  background: linear-gradient(135deg, #add100 0%, #7b920a 100%);
}
.card:nth-child(4) {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background-color: white;
}

.pattern-1 .circle-1 {
  width: 100px;
  height: 100px;
  top: 20px;
  left: 30px;
}

.pattern-1 .circle-2 {
  width: 120px;
  height: 120px;
  bottom: 50px;
  right: 40px;
}

.pattern-1 .circle-3 {
  width: 90px;
  height: 90px;
  top: 150px;
  right: 60px;
}

.pattern-1 .circle-4 {
  width: 80px;
  height: 80px;
  bottom: 44px;
  left: 50px;
}

.pattern-2 .circle-1 {
  width: 80px;
  height: 80px;
  top: 30px;
  left: 40px;
}

.pattern-2 .circle-2 {
  width: 100px;
  height: 100px;
  bottom: 60px;
  right: 30px;
}

.pattern-2 .circle-3 {
  width: 110px;
  height: 110px;
  top: 140px;
  left: 70px;
}

.pattern-2 .circle-4 {
  width: 90px;
  height: 90px;
  bottom: 34px;
  right: 150px;
}

.pattern-3 .circle-1 {
  width: 110px;
  height: 110px;
  top: 25px;
  left: 20px;
}

.pattern-3 .circle-2 {
  width: 90px;
  height: 90px;
  bottom: 70px;
  right: 70px;
}

.pattern-3 .circle-3 {
  width: 100px;
  height: 100px;
  top: 130px;
  left: 60px;
}

.pattern-3 .circle-4 {
  width: 80px;
  height: 80px;
  bottom: 110px;
  right: 60px;
}

.pattern-4 .circle-1 {
  width: 90px;
  height: 90px;
  top: 15px;
  left: 40px;
}

.pattern-4 .circle-2 {
  width: 110px;
  height: 110px;
  bottom: 80px;
  right: 20px;
}

.pattern-4 .circle-3 {
  width: 80px;
  height: 80px;
  top: 160px;
  left: 80px;
}

.pattern-4 .circle-4 {
  width: 100px;
  height: 100px;
  bottom: 120px;
  right: 30px;
}

.overlap {
  z-index: 1;
}

.content {
  position: relative;
  z-index: 1;
  padding: 20px;
  color: #333;
}

h3 {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: bold;
}

p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}
</style>
