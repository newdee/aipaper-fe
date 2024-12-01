<template>
  <div>
    <!-- 页面名称 -->
    <el-dialog
      title="活动大礼包"
      append-to-body
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <div class="popup-overlay">
        <div class="popup-container">
          <div class="popup-left">
            <h2>免费领取论文资料大礼包</h2>
            <h3>「毕业攻略 资料模板不重样」</h3>
            <p>送 <strong>10,000字</strong> 论文查重券</p>
            <div class="content">
              <h4>资料：</h4>
              <p>选题参考、开题报告、写作技巧、写作雷区、答辩攻略</p>
              <h4>模板：</h4>
              <p>
                实习报告 200+、简历模板 400+、答辩PPT 400+、格式模板、表格模板
              </p>
            </div>
          </div>
          <div class="popup-right">
            <!-- <img src="qr-code-placeholder.png" alt="QR Code" /> -->
            <div class="qywxBox">
              <img :src="agent_image.service_qrcode" alt="" />
            </div>
            <p>添加微信免费领礼包</p>
          </div>
        </div>
      </div>
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
import { mapGetters } from "vuex";
import { inviteFetch } from "@/api/paper";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "demo",
  data() {
    return {
      // 定义变量
      dialogVisible: false,
      inv_code_url: "",
    };
  },
  computed: {
    ...mapGetters(["agent_image"]),
  },
  methods: {
    showInit() {
      this.dialogVisible = true;
      inviteFetch().then((res) => {
        console.log("linkres", res);
        this.inv_code_url = res.result.inv_code_url;
      });
    },
    copyLink() {
      const el = document.createElement("textarea");
      el.value = this.inv_code_url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      // alert("链接已复制到剪贴板");
      this.$message({
        type: "success",
        message: "链接已复制到剪贴板",
      });
    },
    // 定义方法
    handleClose(done) {
      done();

      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
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
.popup-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 800px;
}

.popup-left,
.popup-right {
  padding: 20px;
}

.popup-left {
  flex: 1;
  background: linear-gradient(135deg, #2f9d27 50%, #34c759 50%);
  color: white;
}

.popup-right {
  width: 300px;
  text-align: center;
}

.popup-right img {
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
}

h2,
h3 {
  margin: 0;
  padding: 10px 0;
}

h4 {
  margin: 20px 0 5px;
}

.content p {
  margin: 5px 0;
}
</style>
