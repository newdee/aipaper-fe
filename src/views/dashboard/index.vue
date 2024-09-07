<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
