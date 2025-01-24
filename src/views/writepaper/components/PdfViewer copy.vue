<template>
  <div class="pdfCom">
    <canvas ref="pdfCanvas" class="canvasClass"></canvas>
  </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/webpack";
import { preview_paper } from "@/api/paper";

// 配置 PDF.js 的 Worker 路径
pdfjsLib.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");

export default {
  data() {
    return {
      fileUrl: null,
      pdfBase64Data: null, // 假设你从某处获取到的 Base64 数据
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      preview_paper()
        .then((res) => {
          this.pdfBase64Data = res.result.file; // 假设这里返回的是 Base64 编码的 PDF 数据
          if (this.pdfBase64Data) {
            this.init(this.pdfBase64Data);
          }
        })
        .catch((err) => {
          console.error("获取文件失败", err);
        });
    },

    init(base64Data) {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(blob);

      // 加载 PDF 文档
      const loadingTask = pdfjsLib.getDocument({
        url: fileUrl,
        cMapUrl: "/cmaps/", // 这里设置为你的 CMap 文件所在的 URL 路径
        cMapPacked: true,
      });

      loadingTask.promise
        .then((pdf) => {
          console.log("PDF 加载成功", pdf);

          // 渲染第一页
          pdf.getPage(1).then((page) => {
            const scale = 1.5; // 缩放比例
            const viewport = page.getViewport({ scale });

            // 获取 canvas 元素
            const canvas = this.$refs.pdfCanvas;
            const context = canvas.getContext("2d");

            // 设置 canvas 的尺寸
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // 渲染 PDF 页面到 canvas
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            page.render(renderContext);
          });
        })
        .catch((error) => {
          console.error("加载 PDF 失败", error);
        });
    },
  },
};
</script>

<style scoped>
.pdfCom {
  width: 100%;
  height: 100%;
}

.canvasClass {
  width: 100%;
  height: auto;
}
</style>
