<!-- GlobalModal.vue -->
<template>
  <div>
    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="90%">
      <p style="line-height: 26px">
        网站手机端 <i style="color: #e6a23c">支付功能</i> 开发中,
        <i style="color: #e6a23c">生成正文</i>
        功能现仅 <i style="color: #67c23a">支持 PC 端</i>
      </p>
      <p style="line-height: 20px">相关功能正在紧锣密鼓开发中,敬请期待!!!</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";

export default {
  data() {
    return {
      dialogVisible: false,
    };
  },

  created() {
    eventBus.on("open-modal", this.open); // 订阅事件
  },
  beforeDestroy() {
    eventBus.off("open-modal", this.open); // 订阅事件
  },
  methods: {
    open() {
      // this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
}
</style>
