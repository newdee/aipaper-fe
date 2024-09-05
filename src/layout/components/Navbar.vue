<template>
  <div class="navbar">
    <el-row :gutter="10">
      <el-col :xs="20" :sm="12">
        <div class="grid-content nav_left flex items-center">
          <div class="logo-box">
            <img :src="logo" alt="" title="logo" />
          </div>
          <div>
            <span class="web_title">
              AIPaperPass
              <span>.com</span>
            </span>
            <span>AI写作指导平台</span>
          </div>
        </div>
      </el-col>

      <el-col :xs="4" :sm="12">
        <div
          class="grid-content bg-purple-light flex items-center operations items-align-right"
        >
          <div class="text-main items-center hidden-xs-only">降重/降AIGC率</div>
          <div class="text-main items-center hidden-xs-only">我的订单</div>
          <div class="text-main items-center hidden-xs-only">范文样例</div>
          <div class="hidden-sm-and-up operation_box" @click="showDraw">
            <i class="el-icon-s-operation"></i>
          </div>
          <div @click="pushLogin" class="login_box">
            <span>登录</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 菜单栏 -->
    <el-drawer
      title="我的菜单"
      size="40%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="text-main items-center">降重/降AIGC率</div>
      <div class="text-main items-center">我的订单</div>
      <div class="text-main items-center">范文样例</div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      logo: require("@/assets/images/logo_paper.png"),
      drawer: false,
      direction: "rtl", //抽屉方向
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    handleClose(done) {
      done();
    },
    pushLogin() {
      this.$router.push("/login");
    },
    showDraw() {
      this.drawer = true;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>



<style lang="scss" scoped>
@import "@/styles/variables.scss";
.operation_box {
  font-size: 30px;
  margin-right: 10px;
}

.navbar {
  padding: 0 16px;
  .el-col {
    height: 100%;
  }
  .login_box {
    font-size: 12px;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background: #ff8cb0;
    text-align: center;
    line-height: 35px;
    color: $white;
    // color: var(--white);
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
  height: 32px;
  width: 32px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
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

  &:hover > div {
    cursor: pointer;
  }
}

.navbar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

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
.navbar .el-row {
  width: 100%;
  // color: red;
  height: 50px;
}
.text-main {
  margin-right: 1.5rem;
}
.text-main:hover {
  color: rgb(59 130 246 / 1);
}
</style>
