<template>
  <div>
    <!-- 输入框及大纲生成 -->
    <div class="mainCon">
      <div class="titleMain">
        <h1 class="TitleH1">万象写作®·AIPaper®</h1>
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
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
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
              v-model="input"
              maxlength="50"
              show-word-limit
              placeholder="请输入完整题目，题目越完整大纲越准确"
            ></el-input>
          </div>
        </div>
        <!-- 输入框选项 -->
        <div class="radioGroup">
          <el-radio-group v-model="radio">
            <el-radio :label="3">成考/自考(约8千字) </el-radio>
            <el-radio :label="2">专科/本科(约1万字) </el-radio>
            <el-radio :label="1">本科(约2万字) </el-radio>
            <el-radio :label="4">研究生(约3万字) </el-radio>
            <el-radio :label="5">在职硕士(约5万字) </el-radio>
            <el-radio :label="6">期刊(约5千字) </el-radio>
          </el-radio-group>
        </div>
        <div class="radioGroup">
          <el-radio-group v-model="radio2">
            <el-radio :label="3">开题报告(约5千字)</el-radio>
            <el-radio :label="2">任务书(约5千字)</el-radio>
            <el-radio :label="1">文献综述(约5千字)</el-radio>
          </el-radio-group>
        </div>
        <!-- 生成大纲选项 -->
        <div class="submitBtn">
          <button class="g_poin">生成大纲</button>

          <span class="inputLine g_poin">录入大纲</span>

          <div class="threeLine">
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <div slot="content">
                二级大纲(1.1)：极速简约，结构清晰<br />
                三级大纲(1.1.1)：内容丰富，深度思考
              </div>
              <el-switch
                style="display: block"
                v-model="value2"
                active-text="使用三级大纲"
              >
              </el-switch>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <advantage ref="advantageDia"></advantage>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import advantage from "./advantage.vue";

export default {
  name: "maincon",
  data() {
    return {
      // 定义变量
      selectValue: [],
      input: "",
      value2: false,
      radio: 1,
      radio2: "",
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
    };
  },
  components: {
    // webinfo,
    advantage,
  },
  mounted() {
    // 页面初始化
  },

  computed: {
    // 计算属性
  },
  methods: {
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
</style>