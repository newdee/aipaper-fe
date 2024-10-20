<template>
  <div :class="['footer', showContent ? 'isHome' : '']">
    <!-- 网站信息 -->
    <section class="siteInfo">
      <div class="col col_1">
        <img src="@/assets/images/MIXPAPERwxxz.png" alt="" />
        <div class="linkListBox">
          <div class="linkbox">
            <div class="linkImg">
              <img src="@/assets/images/gongzhonghao.png" alt="" />
            </div>
            <p class="linktext">公众号</p>
          </div>
          <div class="linkbox">
            <div class="linkImg">
              <img src="@/assets/images/xhs.png" alt="" />
            </div>
            <p class="linktext">小红书</p>
          </div>
          <div class="linkbox">
            <div class="linkImg">
              <img src="@/assets/images/bilibili.png" alt="" />
            </div>
            <p class="linktext">B站</p>
          </div>
        </div>
      </div>
      <div></div>
      <div class="infoBottom">
        <p class="bottomTitle">关于万象</p>
        <ul class="bottomLink">
          <li>企业介绍</li>
          <li>企业大事记</li>
          <li>合作机构</li>
        </ul>
      </div>
      <div class="infoBottom">
        <p class="bottomTitle">产品服务</p>
        <ul class="bottomLink">
          <li @click="$jumpUrl('/main/explore')">搜论文</li>
          <li @click="$jumpUrl('/main/writepaper')">写论文</li>
          <li @click="$jumpUrl('/main/readpaper')">读论文</li>
          <li @click="$jumpUrl('/main/amendpaper')">改论文</li>
        </ul>
      </div>
    </section>
    <!-- 底部栏 -->
    <div class="footerP">
      <p style="text-align: center; color: #2e2e2e">
        <span>© 2024 石家庄浅思科技有限公司 关于我们</span>
        <a href="https://beian.miit.gov.cn" target="_blank">冀ICP备2024060058号-2</a>
      </p>
    </div>
    <!-- 悬浮菜单 --><!-- 显示条件怎么设置? -->
    <div class="floatMenuWrapper" v-if="true">
      <div class="menu">
        <!-- <el-button v-popover:popover1> -->
        <el-button @click="$devf">
          <div class="item ai">
            <!-- <img src="@/assets/images/robat-ai.png" alt="" /> -->
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-a-ziyuan4"></use>
            </svg>
            <p style="width: 3em;">万象AI助手</p>
          </div>
        </el-button>
        <!-- <el-button v-popover:popover2> -->
        <el-button @click="$devf">
          <div class="item">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-ai-service"></use>
            </svg>
            <p>联系客服</p>
          </div>
        </el-button>
        <el-button v-popover:popover3>
          <div class="item">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-jiaruwomen"></use>
            </svg>
            <p>商务合作</p>
          </div>
        </el-button>
      </div>
    </div>
    <el-popover ref="popover1" placement="left-start" width="125" trigger="click">
      AI写作
    </el-popover>
    <el-popover ref="popover2" placement="left-start" width="125" trigger="click">
      在线客服
    </el-popover>
    <el-popover ref="popover3" placement="left-start" width="125" trigger="click">
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
  props: {
    showContent: {
      require: true,
      type: Boolean,
      default: () => {
        return true;
      },
    },
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
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
}

.infoBottom {}

.siteInfo {
  display: grid;
  grid-template-columns: 8fr 4fr 3fr 3fr;
  text-align: left;
  padding: 32px 0px;
  position: relative;

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
    >img {
      height: 20px;
      width: auto;
    }

    p {
      font-size: 12px;
      font-family: "黑体";
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

  p {
    color: rgb(46, 46, 46);
    display: flex;
    width: 100%;
    padding: 0 10px;
    flex-wrap: wrap;
    justify-content: center;

    span {
      padding: 0 5px;
    }
  }
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
      width: 60px;
      height: auto;
      font-size: 16px;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #cccccc;
      display: grid;
      justify-content: center;
      align-items: center;
      justify-items: center;
      padding: 5px;

      .icon {
        width: 2em;
        height: 2em;
      }

      p {
        width: 2em;
        text-wrap: wrap;
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
  justify-content: space-evenly;
}

.linkbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .linkImg {
    width: 90px;
    height: 90px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.infoBottom {
  font-size: 14px;
  line-height: 28px;

  .bottomTitle {
    font-weight: bold;
    color: #000;
  }

  .bottomLink {
    color: #333;
  }
}

@import "@/styles/mediaMain.scss";
</style>
