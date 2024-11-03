<template>
  <div>
    <!-- 页面名称 -->
    <div class="pdfShowBox">
      <div class="stickyBox">
        <div class="pdfNavbar">
          <div class="pdfNavLeft">
            <div class="pdfNavItem">
              <i class="el-icon-edit"></i>
              <span>编辑Word版论文</span>
            </div>
            <div class="pdfNavItem">
              <i class="el-icon-edit"></i>
              <span>编辑Latex版论文</span>
            </div>
            <div @click="$jumpUrl('/main/reduceRepetition')" class="pdfNavItem">
              <i class="el-icon-film"></i>
              <span>{{ $t("route.reduceRepetition") }}</span>
            </div>
          </div>
          <div
            @click="downLoadPaper"
            v-loading="downStatus"
            class="pdfNavRight g_poin"
          >
            <i class="el-icon-download"></i>
            <p>下载论文</p>
          </div>
        </div>
      </div>
      <iframe
        :src="step3PdfUrl + '#view=FitH,top'"
        frameborder="0"
        style="width: 100%; height: 100%"
      ></iframe>
    </div>
    <!-- <div class="pdfBox">
      <PdfViewer :pdfUrl="step3PdfUrl" ref="pdfViewer" />
    </div> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";
import PdfViewer from "./PdfViewer.vue";
import { paperPack } from "@/api/user";

export default {
  name: "step3",
  data() {
    return {
      // 定义变量
      data: "",
      // pdfUrl: require("@/assets/third_output.pdf"),
      pdfUrl: "",
      downStatus: false,
      out_trade_no: "",
    };
  },
  components: {
    PdfViewer,
  },
  computed: {
    // 计算属性
    ...mapGetters(["step3PdfUrl", "currentOrder"]),
  },

  watch: {
    pdfUrl: {
      handler(newVal, oldVal) {
        this.pdfUrl = newVal;
      },
      deep: true, // 启用深度监听
    },
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },

  methods: {
    downLoadPaper: _.debounce(function (item) {
      this.downStatus = true;
      paperPack({ out_trade_no: this.currentOrder.out_trade_no }).then(
        (res) => {
          console.log("ad", res.result.zip_url);
          this.downStatus = false;
          // window.open(res.result.zip_url, "_blank");
          // Create a temporary link element
          const link = document.createElement("a");
          link.href = res.result.zip_url;
          const regex = /\/([^\/]+)\.zip$/;
          const match = res.result.zip_url.match(regex);
          // Set the download attribute to suggest a filename

          match + ".zip"; // Change 'filename.zip' to the desired file name
          if (match && match[1]) {
            console.log(match[1]); // 输出: 民主制度下的少数群体权利保障
            link.download = match[1] + ".zip";
          } else {
            console.log("未找到匹配项");
            link.download = "论文" + ".zip";
          }
          // Append the link to the body
          document.body.appendChild(link);

          // Programmatically click the link to trigger the download
          link.click();

          // Remove the link from the document
          document.body.removeChild(link);
        }
      );
    }, 1000),
    // 定义方法
    onViewFile(item) {
      if (item.fileName.split(".").pop() === "pdf") {
        let url =
          "/pdfjs/web/viewer.html?file=" +
          process.env.VUE_APP_BASE_API +
          item.filePath;
        window.open(url, "_blank");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.pdfBox {
}
.pdfShowBox {
  height: 33000px;
  background-color: #fff;
}
.iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 这个比例可以根据你的需求调整 */
  height: 0;
  overflow: hidden;
}
.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.my-bullet {
  width: 0.1rem;
  height: 0.1rem;
  display: inline-block;
  border-radius: 50%;
  background: #b7b6b9;

  &:nth-child(2) {
    margin: 0 0.1rem;
  }
}

.my-bullet-active {
  background: #fd882e;
}

.pdfNavbar {
  max-width: 1120px;
  // margin: 0 auto;

  height: 64px;
  background: rgba(245, 248, 255, 0.95);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  padding-left: 23px;

  .pdfNavItem {
    margin-right: 40px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #3355ff;
    line-height: 22px;
    text-align: left;
    font-style: normal;

    span {
      margin-left: 10px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .pdfNavLeft {
    display: flex;
  }

  .pdfNavRight {
    width: 148px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background: #3355ff;
    border-radius: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    line-height: 22px;
    text-align: left;
    font-style: normal;
  }
}

.stickyBox {
  position: relative;
}
</style>
