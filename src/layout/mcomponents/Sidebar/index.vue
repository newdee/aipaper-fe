<template>
  <div class="qysytxy" :key="timeKey">
    <div @click="$jumpUrl('/home/home')" class="logoEr">
      <img src="@/assets/images/MIXPAPER.png" alt="" />
    </div>
    <div class="mSiderBar">
      <div @click="$jumpUrl('/main/explore')" :active="$route.meta.sideBarIndex == 5" class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>搜论文</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div @click="$jumpUrl('/main/writepaper')" :active="$route.meta.sideBarIndex == 1" class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>写论文</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div @click="$jumpUrl('/main/readpaper')" :active="$route.meta.sideBarIndex == 2" class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>读论文</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div @click="$jumpUrl('/main/amendpaper')" :active="$route.meta.sideBarIndex == 3" class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>改论文</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div @click="$jumpUrl('/main/integratedservices')" :active="$route.meta.sideBarIndex == 4" class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>综合服务</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div @click="$jumpUrl('/main/aitools')" :active="$route.meta.sideBarIndex == 6" class="mItemWrapper">
        <div class="mSliderItem">
          <div class="left"><span class="imgIcon"></span>AI工具</div>
          <span class="right imgIcon"></span>
        </div>
      </div>
      <div @click="$jumpUrl('/main/reduceRepetition')" :active="$route.meta.sideBarIndex == 7" class="mItemWrapper">
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
  name: "Sidebar",
  data() {
    return {
      active: 1,
      timeKey: null,
      fullPath: this.$route.fullPath,
    };
  },
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
  watch: {
    // $route: function (to, from) {
    //   if (to.path == "/main/explore") {
    //     this.$store.dispatch("app/setActiveSidebar", 5);
    //   } else if (to.path == "/main/writepaper") {
    //     this.$store.dispatch("app/setActiveSidebar", 1);
    //   } else if (to.path == "/main/readpaper") {
    //     this.$store.dispatch("app/setActiveSidebar", 2);
    //   } else if (to.path == "/main/amendpaper") {
    //     this.$store.dispatch("app/setActiveSidebar", 3);
    //   } else if (to.path == "/main/integratedservices") {
    //     this.$store.dispatch("app/setActiveSidebar", 4);
    //   } else if (to.path == "/main/aitools") {
    //     this.$store.dispatch("app/setActiveSidebar", 6);
    //   } else if (to.path == "/main/reduceRepetition") {
    //     this.$store.dispatch("app/setActiveSidebar", 7);
    //   }
    //   this.timeKey = JSON.stringify(new Date().getMilliseconds);
    // },
  },
  methods: {},
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
  background: #f5f8ff;
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

  .mItemWrapper[active="true"] {
    .mSliderItem {
      background-color: #3355ff;
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

.logoEr {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    // width: 100%;
    // height: 100%;
    width: 115px;
    height: 18px;
  }
}
</stlyle>
