<template>
  <div>
    <!--每日数据 -->
    <webinfo></webinfo>
    <!-- 输入框 -->

    <inputcon></inputcon>
    <!-- 推荐内容 -->
    <recommend v-show="outLineStatus"></recommend>
    <!-- <progress></progress> -->
    <div v-show="!outLineStatus && !loadingStatus" class="progressBox">
      <div class="pgBox">
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="currentNumber"
          status="success"
        ></el-progress>
      </div>
      <p>大纲生成中 <i class="el-icon-loading"></i>....</p>
    </div>
    <div v-show="loadingStatus">
      <outline-edit v-if="outLineClick == 'pro'"></outline-edit>
      <outline v-else></outline>
    </div>
    <!-- 大纲生成页面 -->

    <!-- 下载文件和官方群 -->
    <paper-others></paper-others>

    <!-- <div style="height: 1500px"></div> -->
    <!-- <el-backtop
      target=".page-component__scroll .el-scrollbar__wrap"
    ></el-backtop> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// 方法
import { getHomeInfo } from "@/api/user";
// 组件
import webinfo from "./components/webinfo.vue";
import inputcon from "./components/inputcon.vue";
import recommend from "./components/recommend.vue";
import paperOthers from "./components/paperOthers.vue";
import outlineEdit from "./outlineEdit.vue";
import outline from "./outline.vue";
import eventBus from "@/utils/eventBus";

export default {
  name: "home",
  components: {
    webinfo,
    inputcon,
    recommend,
    outline,
    paperOthers,
    outlineEdit,
  },
  computed: {
    ...mapGetters(["name", "homeData"]),
  },
  data() {
    return {
      loadingStatus: true, //整个大纲的展示状态
      proDuceStatus: true, // 大纲展示， 录入还是生成
      outLineStatus: true, //大纲生成状态
      currentNumber: 0,
      outLineClick: "pro", // pro:生成 imp : 录入
      intervalId: null,
    };
  },
  created() {
    eventBus.on("sendOutline", this.addE); // 订阅事件
    eventBus.on("clickImportOutline", this.showImportLine); // 订阅事件
  },
  beforeDestroy() {
    eventBus.off("sendOutline", this.addE); // 移除事件监听
    eventBus.on("clickImportOutline", this.showImportLine); // 订阅事件
  },
  mounted() {
    // 获取首页数据
    getHomeInfo().then((res) => {
      console.log(res.result, "res");
      this.$store.dispatch("app/setHomeData", res.result);
    });
  },
  methods: {
    // 生成大纲
    addE(index) {
      this.outLineStatus = false;
      this.outLineClick = "pro";
      this.loadingStatus = false;

      this.countUpToHundred(index);
    },
    // 录入大纲
    showImportLine() {
      this.outLineStatus = false;
      this.loadingStatus = true;
      this.outLineClick = "imp";
    },
    // 渲染大纲
    getList() {
      this.outLineClick = "pro";
      this.loadingStatus = true;
      // this.outLineStatus = false;
      // 判断展示那个大纲
    },
    // 进度条
    countUpToHundred(seconds) {
      this.currentNumber = 0;
      const targetNumber = 100;
      const totalSteps = targetNumber - this.currentNumber;

      // 计算每一步所需的时间（毫秒）
      const stepTimeMs = (seconds * 1000) / totalSteps;

      this.intervalId = setInterval(() => {
        console.log(this.currentNumber);
        this.currentNumber++;

        if (this.currentNumber >= targetNumber) {
          clearInterval(this.intervalId); // 达到目标数字时清除定时器
          this.getList();
        }
      }, stepTimeMs);
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.progressBox {
  margin-top: 30px;
  .pgBox {
    width: 200px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
