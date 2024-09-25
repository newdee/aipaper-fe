<template>
  <div>
    <input-main></input-main>
    <el-button type="success" @click="jump">跳转到原页面</el-button>
    <!-- 页面名称 -->
    <el-button type="success" @click="jump2">跳转详情页</el-button>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
import inputMain from "./components/inputMain.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "myFooter",
  data() {
    return {
      // 定义变量
    };
  },
  components: {
    inputMain,
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
    jump() {
      this.$router.push("/dashboard");
    },
    jump2() {
      this.$router.push("/main/explore");
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
</style>
