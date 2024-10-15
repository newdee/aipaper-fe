<template>
  <div class="pdfCom">
    <!-- <iframe
      src="https://file.mixpaper.cn/paper/case/4fd240e4-cad3-4e87-a8d4-1eda7a2cbe4d/second/output.pdf"
      frameborder="0"
    ></iframe> -->
    <!-- <canvas
      class="canvasClass"
      :id="'canvas' + item"
      v-for="item in pdfHTML"
      :key="item"
    /> -->
  </div>
</template>

<script>
// 引入
// const PDFJS = require("pdfjs-dist");
// PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.js");
import PDFJS from "pdfjs-dist/build/pdf.js";

export default {
  props: {
    // 组件引入的pdf地址
    pdfUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // pdfUrl: "",
      pdfDoc: null, // pdfjs 生成的对象
      pdfHTML: 0, // pdfjs 生成的对象
    };
  },
  methods: {
    init(fileUrl) {
      let _this = this;
      PDFJS.getDocument(fileUrl).then((fileContent) => {
        _this.pdfDoc = fileContent;
        _this.pdfHTML = fileContent.numPages;
        setTimeout(() => {
          _this.renderPage(fileContent.numPages);
        }, 100);
      });
    },
    renderPage(nums) {
      let totalHeight = 0; // 新增：用于累加所有页面的高度
      for (let item = 1; item <= nums; item++) {
        let canvas = document.getElementById(`canvas${item}`);
        const ctx = canvas.getContext("2d");
        this.pdfDoc.getPage(item).then((page) => {
          const viewport = page.getViewport(4); // 可以根据需求调整缩放比例
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };
          page.render(renderContext);

          // // 增加：累加当前页面的高度
          // totalHeight += viewport.height;

          // // 如果这是最后一个页面，更新父容器的高度
          // if (item === nums) {
          //   const container = document.querySelector(".pdfCom");
          //   container.style.height = `${totalHeight}px`; // 设置容器高度为所有页面高度之和
          // }
        });
      }
    },
  },
  mounted() {
    //解决字体问题
    const CMAP_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/";
    let obj = {};
    obj.url = this.pdfUrl; //pdf文件地址，根据情景自行修改
    obj.cMapUrl = CMAP_URL;
    obj.cMapPacked = true;
    this.init(obj);
  },
};
</script>

<style scoped>
.pdfCom {
  width: 100%;
  /* 高度由JavaScript动态设置 */
  /* overflow-y: auto; */
  /* 添加滚动条，如果内容超出容器高度 */
  height: 100%;
  font-size: 0px;
  /* font-siez:0px Ensure no gaps between each canvas*/
}

.canvasClass {
  width: 100%;
}
</style>
