<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive exclude="Detail">
        <router-view v-if="$route.meta.keepAlive" :key="key"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view>
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  /* max-width: calc(100vw - 260px); */
  /* padding-left: 220px; */
  padding-left: $sideBarWidth;
  background-color: #f5f8ff;

  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
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
