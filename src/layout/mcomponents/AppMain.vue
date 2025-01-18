<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <component :is="keepAliveComponent" :key="key">
        <router-view></router-view>
      </component>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
    keepAliveComponent() {
      return this.$route.meta.keepAlive ? "keep-alive" : "div";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.app-main {
  padding-left: $sideBarWidth;
  background-color: #f7f7f7;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: $navBarHeight;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
