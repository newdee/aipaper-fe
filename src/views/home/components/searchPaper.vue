<template>
  <div>
    <!-- 页面名称 -->
    <div class="mainBackground">
      <div class="leftMainText">
        <p>MIXPAPER</p>
        <p>万象写作</p>
      </div>

      <!-- <div class="mainInput">
        <p class="inputName">AI 论文快查</p>
        <div class="selectText">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="inputBox">
          <input placeholder="输入你想查找的论文信息" type="text" />
        </div>
        <div class="searchIconBox">
          <span>
            <img src="@/assets/images/search.png" alt="" />
          </span>
        </div>
      </div> -->
      <div class="inputDesc g_poin" @click="$jumpUrl('/main/writepaper')">
        <p>
          让天下没有难做的学术
          <span>拒绝学术垃圾 只做学术精品</span>
        </p>
        <div>
          <p>
            开始智能写作
            <i class="el-icon-caret-right"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "searchPaper",
  data() {
    return {
      // 定义变量
      options: [
        {
          value: "选项1",
          label: "综合",
        },
        {
          value: "选项2",
          label: "科学",
        },
        {
          value: "选项3",
          label: "政治",
        },
      ],
      value: "综合",
    };
  },
  components: {
    // webinfo,
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
  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";

//
// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.mainBackground {
  background: url("../../../assets/images/newspaper.png") no-repeat 0 0;
  background-size: cover;
}

@import "./index.scss";
</style>
