<template>
  <div id="app">
    <div v-if="isMaintenance" class="maintenance">
      <h1>网站升级中</h1>
      <p>尊敬的用户，您好！</p>
      <p>我们正在进行系统升级和维护，预计维护时间为 5 小时。</p>
      <p>预计完成时间为 2024/12/11 00:00:00。</p>
      <p>给您带来的不便，我们深表歉意，感谢您的理解与支持！</p>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isMaintenance: true, // 设置为 true 表示网站正在维护
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // 页面初始化
  },
  created() {
    // 初始化逻辑
  },
  beforeDestroy() {
    // 清除逻辑
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
.maintenance {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f1f1f1;
  color: #333;
  padding: 20px;

  h1 {
    font-size: 2.5em;
    color: #d9534f;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2em;
    margin: 10px 0;
  }
}
</style>
