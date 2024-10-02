<template>
  <div class="mainFeatCon">
    <!-- 底部栏 -->
    <ul class="featList">
      <li
        class="featLi"
        v-for="(item, index) in feature_list"
        :key="'feat' + index"
      >
        <span class="featTitle">{{ index + 1 }}</span>
        <p :class="{ impText: index % 2 == 0, impTextRed: index == 0 }">
          {{ item.text }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
  name: "myFooter",
  data() {
    return {
      // 定义变量
      feature_list: [
        {
          id: 1,
          text: "全网首家免费在线编辑的AI写作平台",
          url: "https://example.com/feature1",
        },
        {
          id: 2,
          text: "每个小节支持上传AI学习资料、链接",
          url: "https://example.com/feature2",
        },
        {
          id: 3,
          text: "每个小节均可插入数据、图、表、公式、代码",
          url: "https://example.com/feature3",
        },
        {
          id: 1,
          text: "知网AIGC超25%退费，重复超15%退费",
          url: "https://example.com/feature1",
        },
        {
          id: 2,
          text: "40篇AI标注知网、维普、谷歌学术真实中英文献",
          url: "https://example.com/feature2",
        },
        {
          id: 3,
          text: "20篇人工精修参考文献，进群免费领",
          url: "https://example.com/feature3",
        },
      ],
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // 页面初始化
  },

  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

// 引入scss
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.featList {
  max-width: 780px;
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.featLi {
  width: 370px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: #333;
  font-size: 14px;
  p {
    margin: 0;
    padding: 0;
    line-height: 30px;
  }
  .featTitle {
    width: 16px;
    height: 16px;
    font-size: 10px;
    background: $textMain;
    color: #fff;
    border-radius: 4px;
    line-height: 16px;
    text-align: center;
    margin-right: 5px;
  }
}
.impText {
  color: $importantColor;
  text-decoration: underline;
}
.mainFeatCon {
  display: flex;
  margin-top: 30px;
  align-content: center;
  flex-direction: column;
  align-items: center;
}
.impTextRed {
  font-weight: bold;
}
</style>
