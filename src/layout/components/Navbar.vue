<template>
  <div :class="['navbarHome', !showContent ? 'grayBg' : '']">
    <div class="navMain">
      <div>
        <div v-if="showContent" class="navItems flex">
          <div @click="$jumpUrl('/home/home')" class="grid-content nav_left flex items-center">
            <div class="logo-box">
              <div class="logoR">
                <img :src="logoMax" alt="" title="logo" />
              </div>
              <div class="logoL">
                <!-- <p>万象学术</p> -->
                <img :src="logo" alt="" title="logo" />
              </div>
            </div>
          </div>
          <div :class="['navItem', activeIndex == '1' ? 'active' : '']" @click="toView(0, '/home')">
            搜论文
          </div>
          <div :class="['navItem', activeIndex == '2' ? 'active' : '']" @click="toView(1, '/main/writepaper')">
            写论文
          </div>
          <div :class="['navItem', activeIndex == '3' ? 'active' : '']" @click="toView(2, '/main/readpaper')">
            读论文
          </div>
          <div :class="['navItem', activeIndex == '4' ? 'active' : '']" @click="toView(3, '/main/amendpaper')">
            改论文
          </div>
          <div :class="['navItem', activeIndex == '5' ? 'active' : '']" @click="toView(4, '/main/integratedservices')">
            综合服务
          </div>
          <div :class="['navItem', activeIndex == '6' ? 'active' : '']" @click="toView(5, '/main/explore')">
            精品课程
          </div>
          <div :class="['navItem', activeIndex == '7' ? 'active' : '']" @click="toView(6, '/main/aitools')">
            AI工具
          </div>
          <div :class="['navItem', activeIndex == '8' ? 'active' : '']" @click="toView(7, '/main/reduceRepetition')">
            降重/降AIGC率
          </div>
        </div>
        <div v-if="!showContent" class="logo-box phoneLogo" @click="$jumpUrl('/home/home')">
          <div class="logoR phoneRLogo">
            <img :src="logoMax" alt="" title="logo" />
          </div>
          <div class="logoL phoneLLogo">
            <!-- <p>万象学术</p> -->
            <img :src="logo" alt="" title="logo" />
          </div>
        </div>
      </div>
      <div :class="[showContent ? '' : 'leftNavbarPosition']">
        <div class="flex navBarRight">
          <div class="gift">
            <span class="num">1</span>
          </div>
          <div class="btn" @click="$devf">升级专业版</div>

          <template>
            <div v-if="!hasLogin" @click="pushLogin" class="login_box hidden-xs-only">
              <div class="img">登录</div>
            </div>
            <div v-else class="login_box hidden-xs-only">
              <!-- 已登录状态下拉菜单栏 -->
              <UserMenu>
                <div class="img">
                  <!-- <img src="@/assets/images/user/userImg.png" alt="" /> -->
                  <span>{{ name.slice(0, 1) }}</span>
                </div>
              </UserMenu>
            </div>
            <div class="menuBtn hidden-sm-and-up" @click="showDraw">
              <i class="el-icon-s-operation"></i>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 菜单栏 -->
    <el-drawer size="40%" :visible.sync="drawerStatus" :direction="direction" :before-close="handleClose"
      :show-close="false" append-to-body>
      <template slot="title">
        <div>我的菜单</div>
      </template>
      <div class="flex flex-star">
        <div v-if="!hasLogin" class="text-main items-center siderbar-item" @click="pushLogin">
          登录
        </div>
        <div v-else class="text-main items-center siderbar-item" @click="$jumpUrl('/userInfo')">
          我的个人主页
        </div>
        <div class="text-main items-center siderbar-item" @click="showOrderList(1)">
          我的订单
        </div>
        <div class="text-main items-center siderbar-item" @click="showOrderList(2)">
          我的大纲
        </div>
        <div class="text-main items-center siderbar-item" @click="toView(0, '/home')">
          搜论文
        </div>
        <div class="text-main items-center siderbar-item" @click="toView(1, '/main/writepaper')">
          写论文
        </div>
        <div class="text-main items-center siderbar-item" @click="toView(2, '/main/readpaper')">
          读论文
        </div>
        <div class="text-main items-center siderbar-item" @click="toView(3, '/main/amendpaper')">
          改论文
        </div>
        <div class="text-main items-center siderbar-item" @click="toView(4, '/main/integratedservices')">
          综合服务
        </div>
        <div class="text-main items-center siderbar-item" @click="toView(5, '/main/explore')">
          精品课程
        </div>
        <div class="text-main items-center siderbar-item" @click="toView(6, '/main/aitools')">
          AI工具
        </div>
        <div class="text-main items-center siderbar-item" @click="toView(7, '/main/reduceRepetition')">
          降重/降AIGC率
        </div>
      </div>
    </el-drawer>
    <!-- 用户订单 -->
    <el-drawer :visible.sync="ordersDrawer" :direction="orderDirection" :before-close="handleOrdersClose" append-to-body
      size="80%">
      <template #title>
        <div v-if="orderTabs == 1" class="titleDrawer">我的订单</div>
        <div v-else class="titleDrawer">我的大纲</div>
      </template>
      <div class="drawBox">
        <user-orders v-if="orderTabs == 1" :listId="listId"></user-orders>
        <user-outlines v-if="orderTabs == 2" :listId="listId"></user-outlines>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import UserMenu from "./UserMenu.vue";
import UserOrders from "./UserOrders.vue";
import UserOutlines from "./UserOutlines.vue";

import { getToken, setToken } from "@/utils/auth"; // get token from cookie
export default {
  components: {
    Breadcrumb,
    Hamburger,
    UserMenu,
    UserOrders,
    UserOutlines,
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
  data() {
    return {
      listId: 0,
      logo: require("@/assets/images/MIXPAPER.png"),
      logoMax: require("@/assets/images/logoMax.png"),

      drawerStatus: false,
      direction: "rtl", //小屏菜单抽屉方向
      orderDirection: "ltr", //用户订单抽屉方向
      hasLogin: true,
      ordersDrawer: false,
      orderTabs: 1,

      activeIndex: 1,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "userInfo", "name", "avatar"]),
  },
  mounted() {
    console.log("tokend", getToken());
    this.hasLogin = getToken();
  },
  methods: {
    showOrderList(status) {
      const hasToken = getToken();
      console.log("hasToken", hasToken);
      if (hasToken) {
        this.orderTabs = status;

        this.listId = new Date().getTime();
        console.log("this.", this.listId);
        this.ordersDrawer = true;
      } else {
        this.$confirm("查看订单需要登录, 是否跳转到登录页?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消生成",
            });
          });
      }
    },
    handleClose(done) {
      done();
    },
    handleOrdersClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //         done();
      //     })
      //     .catch(_ => {
      //         alert('先不关')
      //     });
    },
    pushLogin() {
      this.$router.push("/login");
    },
    showDraw() {
      this.drawerStatus = true;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    toView(index, path) {
      if (index != 0) this.$store.dispatch("app/setActiveSidebar", index);
      this.$jumpUrl(path);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

@media only screen and (max-width: 990px) {
  .navbarHome {
    padding-left: 0px;

    .navItem {
      display: none;
    }
  }
}

@media only screen and (min-width: 640px) {
  .menuBtn {
    margin: 0;
    display: block;
    margin-right: 0 !important;
  }
}

.navMain {
  display: flex;
  padding: 0 10px;
  max-width: 1100px;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  justify-content: space-between;
}

.operation_box {
  font-size: 20px;
  padding: 5px;
  border-radius: 5px;
  position: relative;
  left: 10px;
}

.navbarHome {
  // padding: 0 16px;
  height: 80px;
  width: 100%;

  .el-col {
    height: 100%;
  }

  .login_box {
    font-size: 12px;
    position: relative;
    cursor: pointer;
    user-select: none;

    .img {
      border-radius: 50%;
      width: 35px;
      height: 35px;
      background: #ff8cb0;
      text-align: center;
      line-height: 35px;
      font-size: 20px;
      color: $white;
      // color: var(--white);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.web_title {
  font-size: 20px;
  font-weight: bold;

  span {
    font-size: 14px;
    position: relative;
    left: -5px;
  }
}

.nav_left {
  color: rgb(75 85 99);
  height: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.logo-box {
  // width: 176px;
  height: 40px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logoR {
    width: auto;
    height: 40px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .phoneRLogo {
    height: 24px;
  }
}

.phoneLogo {
  display: none;
}

.mobile .logo-box {
  margin-right: 0px;

}

.mobile .phoneLogo {
  display: flex !important;
}

.mobile .navbarHome {
  height: 50px !important;
  overflow: hidden;

  .logoL {
    height: 24px;

    img {
      width: 90px;
      height: 15px;
    }
  }

  .logoR {
    height: 24px;
  }
}

.logoL {
  width: 117px;
  height: 40px;
  font-family: DOUYINSANSBOLD, DOUYINSANSBOLD;
  font-weight: normal;
  font-size: 24px;
  color: #3355ff;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: 117px;
    height: 19px;
  }

  p {
    width: 100%;
    font-family: arial, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
      "宋体", 宋体, Tahoma, Arial, Helvetica, STHeiti;
    text-align: center;
    font-weight: 600;
    transform: rotateX(45deg) scaleX(1.2);
  }
}

.phoneLLogo {
  img {
    width: 90px;
    height: 15px;
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
  height: 100%;

  &:hover>div {
    cursor: pointer;
  }
}

.navbarHome {
  width: 100%;
  // overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &.grayBg {
    background: #f5f8ff;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.items-align-right {
  justify-content: flex-end;
}

.flex.flex-star {
  justify-content: flex-start;
  flex-direction: column;
}

.text-main {
  margin-right: 1.5rem;
}

.text-main:hover {
  color: rgb(59 130 246 / 1);
}

.siderbar-item {
  padding-left: 20px;
  padding-bottom: 15px;
}

// 重置订单抽屉样式
.drawBox {
  padding-left: 10px;
  position: relative;
}

.drawBox::before {
  content: "";
  display: block;
  position: absolute;
  top: -14px;
  left: 0px;
  width: 100%;
  height: 0px;
  border-top: 1px solid #0000001f;
}

.navItems {
  &>div:hover {
    cursor: pointer;
  }

  color: #777777;
  font-size: 14px;
  line-height: 24px;
  height: 100%;
  align-items: center;

  .navItem {
    padding: 0 10px;

    &:hover {
      font-weight: 600;
      color: #212121;
      position: relative;

      &::after {
        content: "";
        display: block;
        width: calc(100% - 20px);
        height: 3px;
        background: #3355ff;
        position: absolute;
        left: 50%;
        bottom: -3px;
        transform: translate(-50%, 0);
      }
    }
  }

  .active {
    font-weight: 600;
    color: #212121;
    position: relative;

    &::after {
      content: "";
      display: block;
      width: calc(100% - 20px);
      height: 3px;
      background: #3355ff;
      position: absolute;
      left: 50%;
      bottom: -3px;
      transform: translate(-50%, 0);
    }
  }
}

.navBarRight {
  height: 100%;
  align-items: center;

  >div {
    margin: 0 10px;
  }

  .gift {
    --size: 18px;
    width: var(--size);
    height: var(--size);
    background-image: url("../../assets/images/gift.png");
    background-size: 100% 100%;
    position: relative;
    cursor: pointer;

    .num {
      background-color: #ff4d4d;
      line-height: 18px;
      padding: 0 6px;
      color: #fff;
      border-radius: 9px;
      position: absolute;
      right: -13px;
      top: -10px;
    }
  }

  .btn {
    background-color: #3355ff;
    color: #fff;
    box-sizing: border-box;
    border-radius: 18px;
    height: 36px;
    padding: 0px 10px;
    line-height: 36px;
    cursor: pointer;
    user-select: none;
  }
}

.menuBtn {
  font-size: 24px;
}
</style>
