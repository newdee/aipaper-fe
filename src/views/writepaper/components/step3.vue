<template>
  <div>
    <!-- 页面名称 -->
    <div class="pdfShowBox">
      <div class="stickyBox">
        <div class="pdfNavbar">
          <div class="pdfNavLeft">
            <div class="pdfNavItem">
              <i class="el-icon-edit"></i>
              <span>编辑Word版论文</span>
            </div>
            <div class="pdfNavItem">
              <i class="el-icon-edit"></i>
              <span>编辑Latex版论文</span>
            </div>
            <div class="pdfNavItem">
              <i class="el-icon-film"></i>
              <span>降重/降AIGC率</span>
            </div>
          </div>
          <div class="pdfNavRight g_poin">
            <i class="el-icon-download"></i>
            <p>下载论文</p>
          </div>
        </div>
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
  name: "step3",
  data() {
    return {
      // 定义变量
      data: "",
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
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.pdfShowBox {
  height: 2000px;
  background-color: #fff;
  margin-bottom: 16px;
  padding: 40px;
}

.my-bullet {
  width: 0.1rem;
  height: 0.1rem;
  display: inline-block;
  border-radius: 50%;
  background: #b7b6b9;

  &:nth-child(2) {
    margin: 0 0.1rem;
  }
}

.my-bullet-active {
  background: #fd882e;
}

.pdfNavbar {
  max-width: 1120px;
  // margin: 0 auto;

  height: 64px;
  background: rgba(245, 248, 255, 0.95);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  padding-left: 23px;

  .pdfNavItem {
    margin-right: 40px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #3355ff;
    line-height: 22px;
    text-align: left;
    font-style: normal;

    span {
      margin-left: 10px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .pdfNavLeft {
    display: flex;
  }

  .pdfNavRight {
    width: 148px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background: #3355ff;
    border-radius: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    line-height: 22px;
    text-align: left;
    font-style: normal;
  }
}

.stickyBox {
  position: relative;
}
</style>
