<template>
  <div>
    <div class="logo">
      <img src="@/assets/images/MIXPAPER.png" alt="" />
    </div>
    <div class="mSiderBar">
      <div class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>探索</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>写论文</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>读论文</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>改论文</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>综合服务</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>AI工具</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>降重/降AIGC率</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
      // let arr = [
      //   { name: "one", path: "/main/explore" },
      //   { name: "two", path: "/main/writepaper" },
      //   { name: "three", path: "/main" },
      // ];
      // return arr;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
<stlyle lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.logo {
  padding: 20px 25px;
}
.sidebar-container {
  background-image: linear-gradient(90deg, #f5f8ff, #f2f2f2);
  color: #000;
  font-size: 14px !important;
  .mItemWrapper {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 12px;
    font-weight: 600;
    margin-right: 25px;
    .mSliderItem {
      border-radius: 24px;
      line-height: 24px;
      padding-left: 24px;
      padding-right: 15px;
      padding-bottom: 6px;
      padding-top: 6px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .imgIcon {
          margin-right: 10px;
        }
      }
      .imgIcon {
        display: inline-block;
        --size: 20px;
        width: var(--size);
        height: var(--size);
        background-image: url("../../../assets//images/conical-flask-darrk.png");
        background-size: 100% 100%;
      }
      .right.imgIcon {
        background-image: url("../../../assets//images/caret-left-white.png");
        display: none;
      }
    }
    &:hover .mSliderItem {
      background-color: #3355ff !important;
      color: #fff;
      .imgIcon {
        background-image: url("../../../assets//images/conical-flask-white.png");
      }
      .right.imgIcon {
        background-image: url("../../../assets//images/caret-left-white.png");
        display: block;
        transform: rotateY(180deg);
      }
    }
  }
}
</stlyle>
