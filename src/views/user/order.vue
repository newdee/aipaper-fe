<template>
  <div class="main-contains">
    <!-- 页面名称 -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-bank-card"></i> 查重卷</span>

        <el-tabs tab-position="left" style="height: 200px">
          <el-tab-pane label="未使用">用户管理</el-tab-pane>
          <el-tab-pane label="已使用">配置管理</el-tab-pane>
          <el-tab-pane label="已失效">角色管理</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "demo",
  data() {
    return {
      // 定义变量
    };
  },
  computed: {
    //
  },
  methods: {
    // 定义方法
  },
  components: {
    // webinfo,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import "@/styles/mediaMain.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
// @media only screen and (max-width: 768px) {
// }
</style>
