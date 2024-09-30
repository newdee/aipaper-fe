<template>
  <div class="wrap">
    <split-pane
      @resize="resize"
      :default-size="200"
      :min-size="100"
      :max-size="500"
      split="vertical"
    >
      <template slot="paneL">
        <!-- 编辑自己的代码 -->
        <div class="paneL"></div>
      </template>
      <template slot="paneR">
        <!-- 编辑自己的代码 -->
        <div class="paneR"></div>
      </template>
    </split-pane>
  </div>
</template>

  <script>
import splitPane from "vue-splitpane";
export default {
  components: { splitPane },
  data() {
    return {};
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
  height: 300px;
  .paneL {
    background-color: sandybrown;
    height: 100%;
    width: 100%;
  }
  .paneR {
    background-color: pink;
    height: 100%;
    width: 100%;
  }
}
#container {
  width: 100%;
  height: 100%;
  padding: 10px;
}

.topLeft {
  height: 100%;
  width: calc(100% - 4px);
  margin-right: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #4a4a4a;
}
.topRight {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #4a4a4a;
}
.bottomLeft {
  width: calc(100% - 4px);
  margin-right: 4px;
  height: calc(100% - 8px);
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #4a4a4a;
}

.brTop {
  height: calc(100% - 8px);
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #4a4a4a;
}
.brBottom {
  height: calc(100% - 8px);
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #4a4a4a;
}
.title {
  height: 26px;
  color: #9fe1f9;
  font-weight: 700;
  font-size: 16px;
  padding-left: 5px;
}
.contentTable {
  flex: 1;
  height: calc(100% - 26px);
  overflow: auto;
}
.contentTable >>> .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}
/* 修改每行高度 */
/* .topRight >>> .el-table__row {
  height: 100px !important;
  } */
/* .splitter-pane-resizer {
  background: transparent!important;
  } */
.vue-splitter-container >>> .splitter-pane-resizer {
  background: transparent !important;
}
</style>
