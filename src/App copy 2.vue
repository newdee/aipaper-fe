<template>
  <div class="wrap">
    <split-pane
      @resize="resize"
      :default-size="800"
      :min-percent="minPer"
      :default-percent="dePer"
      split="vertical"
    >
      <template slot="paneL">
        <!-- 编辑自己的代码 -->
        <router-view />
      </template>
      <!-- <template slot="paneR">
        <div class="paneR"></div>
      </template> -->
    </split-pane>
  </div>
</template>

<script>
import splitPane from "vue-splitpane";
export default {
  name: "App",
  components: { splitPane },
  data() {
    return {
      minPer: 0, // 20
      dePer: 100, // 70
    };
  },
  mounted() {},
  methods: {
    //开启轮询模式
    resize(val) {
      console.log("val", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  .paneL {
    background-color: red;
    height: 100%;
    width: 100%;
  }
  .paneR {
    background-color: pink;
    height: 100%;
    width: 100%;
  }
}
</style>
