<template>
  <div>
    <!-- 输入框及大纲生成 -->
    <div class="mainCon">
      <div class="titleMain">
        <h1 class="TitleH1">万象写作®·mixpaper®</h1>
        <div class="">
          <p class="titlep">
            <span class="mr_15">一键生成 </span> <span>无限改稿</span
            ><span class="rightIcon">新</span>
          </p>
          <!-- <p class="titlep">专业性更强 知识面更广 流畅性更佳</p> -->
        </div>
        <!-- 输入框组件 -->

        <div class="inputBox">
          <div class="inputLeft">
            <div @click="$devf" class="leftEn g_poin">
              生成英文版本
              <span>
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-fenxiang1"></use>
                </svg>
              </span>
            </div>
            <el-cascader
              placeholder="请选择科目"
              v-model="selectValue"
              :options="homeData.subject_list"
              :props="carProp"
              @change="handleChange"
            >
            </el-cascader>
          </div>
          <div class="inputRight">
            <!-- <input type="text" placeholder=""> -->
            <div class="rightLink g_poin">
              <span @click="$devf" class="rightLinkIcon">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-qiehuan1"></use>
                </svg>
              </span>
              <span @click="$devf"> 切换至专业版 </span>
              <el-tooltip
                class="item"
                effect="dark"
                content="专业版有什么优势?"
                placement="top"
              >
                <span @click="openAdvantageF" class="rightTip">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-tishi"></use>
                  </svg>
                </span>
              </el-tooltip>
            </div>

            <el-input
              v-model="requestForm.title"
              maxlength="50"
              show-word-limit
              placeholder="请输入完整题目，题目越完整大纲越准确"
            ></el-input>
          </div>
        </div>
        <!-- 输入框选项 -->
        <div class="radioGroup">
          <el-radio-group v-model="radio">
            <el-radio
              v-for="item in homeData.category_list"
              :key="item.name"
              :label="item.name"
              >{{ item.name }}({{ item.description }})
            </el-radio>
          </el-radio-group>
        </div>
        <!-- <div class="radioGroup">
                    <el-radio-group v-model="radio2">
                        <el-radio :label="3">开题报告(约5千字)</el-radio>
                        <el-radio :label="2">任务书(约5千字)</el-radio>
                        <el-radio :label="1">文献综述(约5千字)</el-radio>
                    </el-radio-group>
                </div> -->
        <!-- 生成大纲选项 -->
        <div class="submitBtn">
          <button class="g_poin" @click="sendProgress">生成大纲</button>
          <span class="inputLine g_poin" @click="importOut">录入大纲</span>
          <div class="threeLine">
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <div slot="content">
                二级大纲(1.1)：极速简约，结构清晰<br />
                三级大纲(1.1.1)：内容丰富，深度思考
              </div>
              <!-- <el-switch
                style="display: block"
                v-model="value2"
                active-text="使用三级大纲"
              >
              </el-switch> -->
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <advantage ref="advantageDia"></advantage>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import advantage from "./advantage.vue";
// import mitt from "mitt";
import eventBus from "@/utils/eventBus";
import store from "@/store/index";

export default {
  name: "maincon",
  data() {
    return {
      requestForm: {
        title: "",
      },
      carProp: {
        value: "code",
        label: "name",
        children: "subcategories",
        expandTrigger: "hover",
      },
      // 定义变量
      selectValue: [],
      input: "",
      value2: false,
      radio: 1,
      radio2: "",
      options: [],
    };
  },
  components: {
    // webinfo,
    advantage,
  },

  mounted() {
    // 页面初始化
    // const emitter = mitt()
  },

  computed: {
    ...mapGetters(["homeData"]),
  },

  methods: {
    sendProgress() {
      if (!this.requestForm.title) {
        this.$message({
          type: "warning",
          message: "请输入完整题目!",
        });
      } else {
        if (this.requestForm.title.length <= 4) {
          this.$message({
            type: "warning",
            message: "标题至少需要五个字!",
          });
        } else {
          this.getList();
        }
      }
      // const emitter = mitt();
      // emitter.emit("foo", { a: "b" });
    },
    importOut() {
      // store.dispatch("user/getInfo");
      eventBus.emit("clickImportOutline"); // 发布事件
    },
    sendProgress() {
      // const emitter = mitt();
      // emitter.emit("foo", { a: "b" });
      eventBus.emit("sendOutline", 5); // 发布事件
    },
    // 定义方法
    handleChange(value) {
      console.log(value);
    },
    openAdvantageF() {
      // this.advantageStatus = true;
      this.$refs.advantageDia.advantageStatus = true;
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "./index.scss";

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.radioGroup ::v-deep .el-radio-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
