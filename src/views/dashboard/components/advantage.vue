<template>
  <div>
    <!-- 优势页 -->
    <el-dialog
      title="万象写作质量对比"
      :visible.sync="advantageStatus"
      width="800px"
      class="dialogContainer"
    >
      <!-- <div slot="title" class="dialog-tittle">
        <p>普通AI vs <span class="txt_red">万象写作</span></p>
      </div> -->
      <div class="main-txt">
        <div class="imgBoxScroll">
          <img src="../../../assets/images/advantage/advantageImg.png" alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
  name: "advantage",
  data() {
    return {
      // 定义变量
      advantageStatus: false,
    };
  },

  // watch()
  components: {
    // webinfo,
  },
  mounted() {
    // 页面初始化
  },

  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
    showDia() {
      this.advantageStatus = true;
    },
  },
};
</script>
<style lang="scss" scoped>
* p {
  margin: 0px;
}
// 引入scss
// @import './index.scss';
@import "@/styles/variables.scss";

// 媒体查询
@media only screen and (max-width: 640px) {
  .dialogContainer ::v-deep .el-dialog {
    width: 370px;
  }
}
@media only screen and (min-width: 640px) {
  .dialogContainer ::v-deep .el-dialog {
    width: 640px;
  }
}
@media only screen and (min-width: 800px) {
  .dialogContainer ::v-deep .el-dialog {
    width: 800px;
  }
}
.dialog-tittle {
  font-size: 1.1em;
}
.main-txt {
  margin-top: -20px;
  height: 600px;
  overflow-y: scroll;
  .imgBoxScroll {
    height: 3690px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /* 针对整个滚动条 */
  &::-webkit-scrollbar {
    width: 12px; /* 滚动条的宽度 */
    height: 20px; /* 滚动条的高度 */
  }

  /* 滚动条的轨道 */
  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* 滚动条轨道的背景色 */
    border-radius: 10px; /* 可以选择设置圆角 */
  }

  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    background: #c0c0c0; /* 滑块的背景色 */
    border-radius: 10px; /* 滑块的圆角 */
    border: 2px solid #f0f0f0; /* 滑块边框，与轨道背景色相同 */
  }

  /* 当鼠标悬停在滚动条滑块上时 */
  &::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0; /* 滑块的背景色 */
  }
}
.title {
  font-size: 1.2em;
  color: rgb(51, 54, 57);
  font-weight: 800;
  line-height: 2em;
  padding-bottom: 5px;
}
.txt {
  background: #f2f2f2;
  border-radius: 10px;
  padding: 12px 15px;
  line-height: 2em;
}
.txt_red {
  color: red !important;
}
.with2 span {
  color: #3355ff;
}
td .with2 {
  text-align: center;
  font-weight: bold;
}
table.distinction {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}
table,
th,
td {
  border: 1px solid #e5e7eb; /* 单一边框样式 */
}
tr.hidden {
  display: none;
}
tr.hidden td:first-child {
  width: 50%;
}
tr.hidden td:last-child {
  width: 50%;
}
tr.tr-1 {
  line-height: 2em;
}
.tr-2 {
  border-bottom: 0.0625rem solid #e5e7eb;
  background: #fafafc;
  line-height: 2.5em;
}
tr.tr-3 {
  line-height: 1.5em;
}
tr.tr-2 td {
  padding: 0 1em;
}
tr.tr-1 td {
  color: #333639;
}
tr.tr-2 td:first-child {
  // color: #1f2225;
}
tr.tr-2 td:last-child {
  // color: $textColor4;
}
tr.tr-3 td:first-child {
  // color: #999;
}
tr.tr-3 td:last-child {
  // color: #666;
}
tr.tr-3 td {
  padding: 1em;
}
td img {
  width: 100%;
  height: auto;
}
</style>
