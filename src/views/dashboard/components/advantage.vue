<template>
  <div>
    <!-- 优势页 -->
    <el-dialog title="提示" :visible.sync="advantageStatus" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="advantageStatus = false">取 消</el-button>
        <el-button type="primary" @click="advantageStatus = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
  name: "maincon",
  data() {
    return {
      // 定义变量
      advantageStatus: false,
    };
  },
  // watch()
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
// 引入scss
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
</style>