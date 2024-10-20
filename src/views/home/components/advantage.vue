<template>
  <div class="adMain">
    <div>
      <p class="swiperListTitle">
        <span> 推广合作</span>
      </p>
    </div>
    <div class="adBox">
      <!-- 页面名称 -->
      <div
        class="newLi"
        v-for="(item, index) in advantageList"
        :key="index + 'ad'"
      >
        <img :src="item.imageUrl" alt="" />
        <!-- {{ item.label }}
      <p class="advanP">
        {{ item.name }}
      </p> -->
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "advantage",
  data() {
    return {
      // 定义变量
      advantageList: [
        {
          name: "全网首家免费论文在线编辑，方便排版，一次定稿",
          label: "免费编辑",
          imageUrl: require("@/assets/images/avantage1.jpg"),
        },
        {
          name: "全网最专业学术平台，最专业学术论文生成，蕴含硕士博士的学术经验",
          label: "专业论文",
          imageUrl: require("@/assets/images/avantage2.jpg"),
        },
        {
          name: "全网最优质AI生成的论文内容，富含学术性创新，一次搞定",
          imageUrl: require("@/assets/images/avantage3.jpg"),

          label: "优质内容",
        },
        {
          name: "7*24小时在线服务，全天专业服务，顾问式支持完成定稿",
          label: "在线服务",
          imageUrl: require("@/assets/images/avantage4.jpg"),
        },
      ],
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
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
// 引入scss
// @import "@/styles/variables.scss";
@import "./index.scss";

.newLi {
  // background: url("../../../assets/images/advan1.jpg") no-repeat 0 0 / 100% 100%;
}
</style>
