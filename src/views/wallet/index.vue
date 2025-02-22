<template>
  <div class="main-component">
    <SideMenu v-model="activeIndex" />
    <div class="content">
      {{ activeIndex }}
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script>
import SideMenu from "./components/SideMenu.vue";
import Recharge from "./recharge.vue";
import redemption from "./redemption.vue";
import mydetails from "./mydetails.vue";
import vouchers from "./vouchers.vue";
import history from "./history.vue";

export default {
  name: "MainComponent",
  components: {
    SideMenu,
    Recharge,
    redemption,
    mydetails,
    vouchers,
    history,
  },
  data() {
    return {
      activeIndex: "Recharge", // 默认选中项
    };
  },
  computed: {
    currentComponent() {
      switch (this.activeIndex) {
        case "Recharge":
          return "Recharge";
        case "redemption": // 假设菜单项为“图片组件”
          return "redemption";
        case "mydetails": // 假设菜单项为“图片组件”
          return "mydetails";
        case "vouchers": // 假设菜单项为“图片组件”
          return "vouchers";
        case "history": // 假设菜单项为“图片组件”
          return "history";
        default:
          return "Recharge";
      }
    },
  },
};
</script>

<style scoped>
.main-component {
  display: flex;
}
.content {
  margin-left: 100px;
  padding: 20px;
  min-height: 600px;
  width: calc(100% - 100px);
}
</style>
