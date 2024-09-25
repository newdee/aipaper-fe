<template>
  <div class="menuWrapper">
    <div class="mainBtn" id="mainBtn">
      <div @click.stop="togglePopup">
        <slot> 按钮 </slot>
      </div>
    </div>
    <transition name="fade">
      <div class="userMenuContainer" id="userMenuContainer" v-if="isPopupVisible" @click.stop="popupFn">
        <!-- 头像菜单 -->
        <div class="userMenu">
          <div class="menuHeader">
            <div class="img">
              <img :src="avatar" alt="" />
            </div>
            <div class="info">
              <p class="name">用户名</p>
              <p class="tel">{{ userInfo.phone }}</p>
              <div class="tel">
                <span class="tel">上次登录：</span>
                <p class="tel">{{ userInfo.last_login_time }}</p>
              </div>
            </div>
          </div>
          <div class="menuBody">
            <div class="menuGroup menuAboutUer">
              <div class="menuItem" @click="jumpDetail('/userInfo')">
                <i class="el-icon-house"></i>
                我的个人主页
              </div>
              <div class="menuItem" @click="showOrderList">
                <i class="el-icon-goods"></i>
                订单管理
              </div>
            </div>
            <div class="menuGroup menuAboutMixPaper">
              <div class="menuItem" @click="$devf">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-updatelog"></use>
                </svg>
                更新日志
              </div>
              <div class="menuItem" @click="$devf">
                <i class="el-icon-position"></i>
                <!-- <i class="el-icon-discover"></i> -->
                官方网站
              </div>
              <div class="menuItem" @click="$devf">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-joinus"></use>
                </svg>
                加入我们
              </div>
            </div>
            <div class="menuGroup menuAboutSetting">
              <div class="menuItem bothLeftRight">
                <div class="menuItem_left">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-zhongyingwen"></use>
                  </svg>
                  语言切换
                </div>
                <div class="menuItem_right">
                  中
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-qiehuan1"></use>
                  </svg>
                  英
                </div>
              </div>
              <div @click="loginOut" class="menuItem logOutBox">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-logout"></use>
                </svg>
                退出登录
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 用户订单 -->
    <el-drawer :visible.sync="ordersDrawer" :direction="orderDirection" append-to-body size="500px">
      <template #title>
        <div>我的订单</div>
      </template>
      <div class="drawBox">
        <user-orders :listId="listId"></user-orders>
      </div>
    </el-drawer>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import { getToken, removeToken } from "@/utils/auth"; // get token from cookie
import { mapGetters } from "vuex";
import UserOrders from "./UserOrders.vue";

export default {
  name: "UserMenu",
  components: {
    UserOrders,
  },
  data() {
    return {
      // 定义变量
      isPopupVisible: false,
      listId: 0,
      orderDirection: "ltr", //用户订单抽屉方向
      ordersDrawer: false,
    };
  },
  mounted() {
    // 页面初始化
  },

  computed: {
    // 计算属性
    ...mapGetters(["avatar", "userInfo"]),
  },
  methods: {
    loginOut() {
      removeToken();
      // this.$router.push("/");
      location.reload();
    },
    // 定义方法
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
      if (this.isPopupVisible) {
        document.addEventListener("click", this.handleOutsideClick);
      } else {
        document.removeEventListener("click", this.handleOutsideClick);
      }
    },
    handleOutsideClick(event) {
      const popup = document.querySelector("#userMenuContainer");
      const button = document.querySelector("#mainBtn");

      if (!popup.contains(event.target) && event.target !== button) {
        this.hidePopup();
      }
    },
    hidePopup() {
      this.isPopupVisible = false;
      document.removeEventListener("click", this.handleOutsideClick);
    },
    popupFn() {
      console.log("129--弹窗点击事件");
    },
    jumpDetail(path) {
      this.$router.push(path);
    },
    showOrderList() {
      // 本菜单仅在用户已登录状态可见,所以这里在查看订单前不再校验用户是否已登录
      this.listId = new Date().getTime();
      console.log("this.", this.listId);
      this.hidePopup();
      this.ordersDrawer = true;
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
* p {
  margin: 0px;
}

.userMenuContainer {
  font-size: 14px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e9ecf1;
  position: absolute;
  --box-width: 280px;
  width: var(--box-width);
  right: 0;
  top: calc(#{$navBarHeight} - 10px);
}

.userMenu {
  box-shadow: 0px 6px 18px 0px rgba(29, 41, 57, 0.14);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.menuHeader {
  background-image: linear-gradient(90deg, #e3f0ff, #effcff);
  padding: 20px;
  display: flex;
  align-items: center;
  cursor: default;
}

.menuHeader .img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  display: inline-block;
  line-height: 50px;
  font-size: 30px;
  text-align: center;
  background: #ff8cb0;
  color: #fff;
}

.menuHeader .img img {
  width: 100%;
  height: 100%;
}

.menuHeader .info {
  display: inline-block;
  line-height: 1.5em;
}

.menuHeader .info p.name {
  font-size: 16px;
  line-height: 1.8em;
  color: #1f2a2e;
}

.menuHeader .info .tel {
  color: #1f212680;
  font-size: 12px;
}

.menuBody {
  line-height: 3em;
  color: #2f2e3f;
}

.menuBody i,
.menuBody .icon.svg-icon {
  color: inherit;
}

.menuGroup {
  padding: 5px 20px;
  border-bottom: 1px solid #eeeff1;
}

.menuGroup:last-child {
  border: none;
}

.menuItem.bothLeftRight {
  display: flex;
  justify-content: space-between;
}

.logOutBox {
  color: $colorWarning;
}

// 重置订单抽屉样式
.drawBox {
  padding: 0 1.25rem 0 1.25rem;
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
</style>
