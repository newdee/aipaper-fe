<template>
  <div>
    <!-- 页面名称 -->
    <div class="spendingBox">
      <p class="fuTitle">您将获得</p>
      <div class="maintxt">
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[中文]{{ requestForm.title }}</p>
            <p>
              {{ requestForm.field ? requestForm.field[1] : "暂无" }}
              <span>含无限改稿</span>
            </p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
      </div>
      <div class="att">
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[文献综述]</p>
            <p>x1</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[中英文摘要]</p>
            <p>x1</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[中英文参考文献]</p>
            <p>x1</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[学术创新]</p>
            <p>x1</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
      </div>
      <p class="fuTitle">附加服务</p>
      <div class="adds">
        <!-- <div class="item">
                    <p></p>
                </div> -->
        <el-checkbox-group
          class="addService"
          v-model="checkboxGroup1"
          size="small"
        >
          <el-checkbox label="1" border>
            <div class="cusLabel">
              <p>开题报告</p>
              <div class="price">
                <span>4.9元</span>
                <span>19.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="2" border>
            <div class="cusLabel">
              <p>任务书</p>
              <div class="price">
                <span>4.9元</span>
                <span>19.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="3" border>
            <div class="cusLabel">
              <p>CAD三维设计</p>
              <div class="price">
                <span>19.9元</span>
                <span>39.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="4" border>
            <div class="cusLabel">
              <p>答辩汇报PPT</p>
              <div class="price">
                <span>19.9元</span>
                <span>49.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="5" border>
            <div class="cusLabel">
              <p>调查问卷</p>
              <div class="price">
                <span>9.9元</span>
                <span>19.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="6" border>
            <div class="cusLabel">
              <p>“投喂”AI</p>
              <div class="price">
                <span>9.9元</span>
                <span>29.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="7" border>
            <div class="cusLabel">
              <p>一键降AIGC率</p>
              <div class="price">
                <span>18元</span>
                <span>180元</span>
              </div>
            </div>
          </el-checkbox>
        </el-checkbox-group>
        <p class="tips" @click="reduceAIGC">
          AIGC率知网超25%<span>包退费</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";
import { mapGetters } from "vuex";

export default {
  name: "additional",
  data() {
    return {
      // 定义变量
      checkboxGroup1: [],
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
    ...mapGetters(["requestForm"]),
  },
  methods: {
    // 定义方法
    reduceAIGC() {
      if (this.checkboxGroup1.indexOf("7") != -1) {
        console.log("572---", this.checkboxGroup1);
        let i = this.checkboxGroup1.indexOf("7");
        this.checkboxGroup1.splice(i, 1);
      } else {
        console.log("576---", this.checkboxGroup1);
        this.checkboxGroup1.push("7");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import "@/styles/mediaMain.scss";
// @import './index.scss';
@import "@/styles/variables.scss";
@import "../index.scss";
// 媒体查询
// @media only screen and (max-width: 939px) {
// }
// @media only screen and (max-width: 768px) {
// }
</style>
