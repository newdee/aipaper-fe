<template>
  <div :class="['footer', $route.fullPath == '/home' ? 'isHome' : '']">
    <!-- 网站信息 -->
    <section class="siteInfo">
      <div class="col col_1">
        <img src="@/assets/images/MIXPAPERwxxz.png" alt="" />
        <div class="qrBox">
          <img
            style="width: 120px; height: 200px"
            src="@/assets/images/qq.jpg"
            alt=""
          />
          <p>
            <!-- 公司：MIXPAPER<br />
                        联系方式：010-88766666<br />
                        地址：北京市海淀区<br /> -->
            扫码关注我们，获取更多信息<br />
          </p>
        </div>
      </div>
      <div class="col col_2">
        <p class="title_mini">相关链接</p>

        <div class="linkListBox">
          <div class="linkbox">
            <div class="linkImg">
              <img src="@/assets/images/xhs.png" alt="" />
            </div>
            <p class="linktext">关注小红书</p>
          </div>
          <div class="linkbox">
            <div class="linkImg">
              <img src="@/assets/images/bilibili.png" alt="" />
            </div>
            <p class="linktext">关注B战</p>
          </div>
          <div class="linkbox">
            <div class="linkImg">
              <img src="@/assets/images/gongzhonghao.jpg" alt="" />
            </div>
            <p class="linktext">关注公众号</p>
          </div>
        </div>
      </div>
      <div class="col col_3">
        <p class="title_mini">关于</p>
        <p><a href="">关于我们</a></p>
        <p><a href="">核心技术</a></p>
      </div>
    </section>
    <!-- 底部栏 -->
    <div class="footerP">
      <p style="text-align: center; color: #666">
        © 2024 石家庄浅思科技有限公司 关于我们
        <a href="https://beian.miit.gov.cn" target="_blank"
          >冀ICP备2024060058号-2</a
        >
      </p>
    </div>
    <!-- 悬浮菜单 --><!-- 显示条件怎么设置? -->
    <div class="floatMenuWrapper" v-if="true">
      <div class="menu">
        <!-- <el-button v-popover:popover1> -->
        <el-button @click="$devf">
          <div class="item ai">
            <img src="@/assets/images/robat-ai.png" alt="" />
          </div>
        </el-button>
        <!-- <el-button v-popover:popover2> -->
        <el-button @click="$devf">
          <div class="item">
            <img src="@/assets/images/headset.png" alt="" />
          </div>
        </el-button>
        <el-button v-popover:popover3>
          <div class="item">
            <img src="@/assets/images/team-dark.png" alt="" />
          </div>
        </el-button>
      </div>
    </div>
    <el-popover
      ref="popover1"
      placement="left-start"
      width="125"
      trigger="click"
    >
      AI写作
    </el-popover>
    <el-popover
      ref="popover2"
      placement="left-start"
      width="125"
      trigger="click"
    >
      在线客服
    </el-popover>
    <el-popover
      ref="popover3"
      placement="left-start"
      width="125"
      trigger="click"
    >
      <div class="qrBox" title="团队二维码">
        <img class="qrcode" src="@/assets/images/wx.jpg" alt="" />
      </div>
    </el-popover>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
  name: "myFooter",
  data() {
    return {
      // 定义变量
    };
  },
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
@import "@/styles/variables.scss";

// 媒体查询
// @media only screen and (max-width: 939px) {
// }

.footer {
  padding-left: $sideBarWidth !important;
}

.footer.isHome {
  padding-left: 0px !important;

  .siteInfo {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
  }
}

.siteInfo {
  display: grid;
  grid-template-columns: 8fr 8fr 5fr;
  text-align: left;
  padding: 32px 0px;

  .col {
    padding: 0 20px;

    p {
      font-size: 14px;
      color: #000000;
      line-height: 1.5em;
    }

    .title_mini {
      color: #666666;
      font-size: 14px;
      line-height: 3em;
    }
  }

  .col_1 {
    > img {
      height: 20px;
      width: auto;
    }

    .qrBox {
      display: flex;
      justify-content: flex-start;
      padding-top: 16px;
      align-items: center;

      img {
        border: 1px solid #cccccc;
        width: 115px;
        height: 115px;
        margin-right: 16px;
      }
    }
  }

  .col_2 {
    padding-left: 3em;

    p {
      line-height: 2em;
    }
  }

  .col_3 {
    padding-left: 3em;

    p {
      line-height: 2em;
    }
  }
}

.footer p {
  margin: 0px;
  cursor: default;
}

.footerP {
  background: rgba(241, 241, 241, 0.93);
  padding: 24px 0;
  text-align: center;
  font-size: 12px;
}

.floatMenuWrapper {
  position: fixed;
  bottom: 25vh;
  right: 28px;
  width: 44px;
  z-index: 9999;

  .menu {
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
      padding: 0px;
      border: none;
      background-color: transparent;
      margin: 0px !important;
    }

    .item {
      width: 44px;
      height: 44px;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #cccccc;
      display: grid;
      justify-content: center;
      align-items: center;

      img {
        width: 23px;
        height: auto;
      }
    }

    .ai {
      border: 1px solid transparent;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(90deg, #fff, #fff),
        linear-gradient(135deg, rgba(0, 186, 255, 1), rgba(175, 34, 227, 1));
    }
  }
}

.qrBox {
  font-size: 0px;
  display: inline-block;
}

.qrcode {
  width: 100px;
  height: 100px;
}
.linkListBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.linkbox {
  display: flex;
  flex-direction: column;
  align-items: center;

  .linkImg {
    width: 80px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

@import "@/styles/mediaMain.scss";
</style>
