<template>
  <div class="wrapper">
    <div class="textIcon">
      <p class="dlfile" @click="$devf">下载文件</p>
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-wj-zw"></use>
      </svg>
      <p class="no-file">还没有可以下载的文件</p>
      <el-button
        type="primary"
        size="small"
        round
        class="refresh-paylist"
        @click="$devf"
        >刷新支付列表</el-button
      >
      <p class="no-order" @click="searchOrder">
        找不到订单
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-tishi"></use>
        </svg>
      </p>
    </div>
    <!-- 声明 -->
    <div class="statement">
      <p>
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-tip-1"></use>
        </svg>
        万象写作保护隐私安全，采用阿里云安全储存，加密传输
        <span>不泄漏任何信息</span>。
      </p>
      <p>
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-tip-1"></use>
        </svg>
        万象写作保留文件30天，
        <span>生成30天后自动删除，请及时下载保存，下载后您可以手动删除</span>。
      </p>
      <p>
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-tip-1"></use>
        </svg>
        所有生成的范文模板只可用作格式参考，不允许抄袭、代写、直接挪用等行为。
      </p>
    </div>
    <!-- 官方群 -->
    <div class="qr-box">
      <img src="@/assets/images/wx-group.png" alt="" />
      <p>官方微信群</p>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
  name: "paperOthers",
  data() {
    return {
      // 定义变量
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
    searchOrder() {
      this.$prompt(
        "请输入微信、支付宝支付记录中“17、18”开头的商户订单号（订单号数字记得改！）",
        "我的订单",
        {
          confirmButtonText: "查询订单",
          inputPattern: /^[a-zA-Z0-9]+$/,
          inputErrorMessage: "订单格式不正确",
          showCancelButton: false,
        }
      )
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的订单是: " + value,
          });
        })
        .catch(() => {
          //
        });
    },
  },
};
</script>
<style lang="scss" scoped>
* p {
  margin: 0px;
}

// 引入scss
// @import './index.scss';
@import "@/styles/variables.scss";

// 媒体查询
// @media only screen and (max-width: 640px) {

// }

// @media only screen and (min-width: 640px) {

// }

.wrapper {
  max-width: 780px;
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

p {
  margin: 0px;
}

.textIcon {
  text-align: center;
  line-height: 3em;
  margin-bottom: 50px;
  user-select: none;
}

.textIcon * {
  cursor: default;
}

.dlfile {
  color: #409eff;
  line-height: 4em;
  margin-top: 3em;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
}

.dlfile + svg {
  font-size: 3em;
  color: #c7c7c7;
  margin: 10px 0 5px 0;
}

.no-file {
  color: #c7c7c7;
  font-size: 16px;
}

.refresh-paylist {
  cursor: pointer;
}

.no-order {
  color: #999;
  cursor: pointer;
  font-size: 14px;
}

// 声明
.statement {
  font-size: 14px;
  color: #202020;
  background: #0000000d;
  padding: 10px;
  border-radius: 0.5rem;
  margin-bottom: 30px;
  cursor: default;
  user-select: none;
}

.statement p {
  line-height: 1.8em;
}

.statement svg {
  color: #f9c23c;
}

.statement span {
  color: #409eff;
}

// 官方群
.qr-box {
  color: #202020;
  margin-bottom: 50px;
  cursor: default;
  user-select: none;
  text-align: center;
  line-height: 2em;
}

.qr-box img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  box-shadow: 0 0 15px 0px #00000025;
  border: 1px solid #0000002b;
}
</style>
