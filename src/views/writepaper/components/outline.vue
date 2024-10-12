<template>
  <div class="outlineMain">
    <!-- 页面名称 -->
    <div class="outlineTab">
      <div class="outLeft">
        <p @click="checkoutPaper(1)" :class="['outLeftTitle', index == 1 ? 'activeLT' : '']">
          万象专业版
          <span class="underLeft"></span>
        </p>
        <p @click="checkoutPaper(2)" :class="['outLeftTitle', 'paperClass', index == 2 ? 'activeLT' : '']">
          万象学术版
          <span class="underLeft"></span>
        </p>
      </div>
      <div @click="$jumpUrl('/paper/preview')" class="outRight g_poin">
        <p>范文样例</p>
      </div>
    </div>
    <!-- 用户输入页面 -->
    <div class="uesrInputBox">
      <div class="selectLang formItem">
        <p class="formItemLabel">生成语言</p>
        <div class="formItemCon">
          <el-select v-model="requestForm.language" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 论文类型 -->
      <div class="selectLang formItem">
        <p class="formItemLabel">论文类型</p>
        <div class="formItemCon">
          <el-radio-group v-model="requestForm.type">
            <el-radio v-for="item in homeData.category_list" :key="item.name" :label="item.name">
              <div class="labelBox">
                <div class="left">
                  <!-- <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-tubiaozoushitu"></use>
                  </svg> -->
                  <img v-if="requestForm.type == item.name" class="home-icon" src="@/assets/images/bank-white.png"
                    alt="" />
                  <img v-else class="home-icon" src="@/assets/images/bank-dark.png" alt="" />
                  {{ item.name }}({{ item.description }})
                </div>
                <div class="right">
                  <svg v-if="requestForm.type == item.name" class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-duigou-cu"></use>
                  </svg>
                  <svg v-else class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-fangkuang"></use>
                  </svg>
                </div>
              </div>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 科目与题目 -->
      <div class="selectLang formItem">
        <p class="formItemLabel">科目与题目</p>
        <div class="formItemCon phoneFlex">
          <el-cascader placeholder="请选择科目" v-model="requestForm.field" :options="homeData.subject_list" :props="carProp"
            @change="handleChange">
          </el-cascader>
          <div class="userInputCon">
            <el-input v-model="requestForm.title" maxlength="50" show-word-limit
              placeholder="请输入完整题目，题目越完整大纲越准确"></el-input>
          </div>
        </div>
      </div>
      <!-- 三级大纲 -->
      <div class="selectLang formItem">
        <p class="formItemLabel">
          三级大纲
          <span class="switchBox">
            <el-switch v-model="requestForm.threeCon" active-text="开启">
            </el-switch>
          </span>
        </p>
      </div>
      <!-- 生成大纲 -->
      <div @click="sendOutlineForm" :class="['outlineBtn', 'g_poin', index == 2 ? 'paperMain' : '']">
        <p>生成大纲</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";
import { getHomeInfo } from "@/api/user";
import eventBus from "@/utils/eventBus";
import { getToken } from "@/utils/auth"; //
import { outlineCreate } from "@/api/user";
import polling from "@/utils/polling-utils";
import { title } from "@/settings";
export default {
  name: "outline",
  data() {
    return {
      // 定义变量
      requestForm: {
        title: "",
        threeCon: false,
        language: "简体中文",
        type: "专科/本科",
        field: "哲学类",
      },
      index: 1,
      carProp: {
        value: "name",
        label: "name",
        children: "subcategories",
        expandTrigger: "hover",
      },
      options: [
        {
          value: "简体中文",
          label: "简体中文",
        },
        {
          value: "英文",
          label: "英文",
        },
        {
          value: "德语",
          label: "德语",
        },
        {
          value: "法语",
          label: "法语",
        },
        {
          value: "西班牙语",
          label: "西班牙语",
        },
      ],
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
  },

  computed: {
    // 计算属性
    ...mapGetters(["homeData"]),
  },
  methods: {
    sendOutlineForm() {
      // 判断是否登录,否则跳转到登录页面
      const hasToken = getToken();
      if (hasToken) {
        if (!this.requestForm.title) {
          this.$message({
            type: "warning",
            message: "请输入论文题目!",
          });
          return false;
        }
        if (this.requestForm.title.length < 5) {
          this.$message({
            type: "warning",
            message: "标题请至少输入5个字!",
          });
          return false;
        }
        eventBus.emit("emitOulineClick", 3); // 发布事件
        console.log("lunwen", this.requestForm);
        this.$store.dispatch("app/setRequestForm", this.requestForm);
        // 保存用户输入数据

        let data = {
          title: "如何治理环境污染",
          language: "中文",
          field: "计算机",
          type: "本科",
        };
        // outlineCreate(data).then((res) => {
        //   console.log("outlineCreateres", res);
        //   let key = res.result.key;
        // let key = "b846ba3f-5764-4e48-a5d6-59da6d46d694";
        // polling({ key: key }).then((res) => {
        //   console.log("ddddd", res);
        //   alert("大纲生成成功");
        //   eventBus.emit("successOutline", res); // 发布事件
        // });
        // });

        setTimeout(() => {
          let res = {
            code: 200,
            message: "success",
            result: {
              status: "生成成功",
              outline: {
                outline: [
                  {
                    chapter_num: "第一章",
                    title: "引言",
                    sections: [
                      {
                        title: "研究背景与意义",
                        num: "1.1",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                      {
                        title: "本研究的主要贡献和创新点",
                        num: "1.2",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                    ],
                  },
                  {
                    chapter_num: "第二章",
                    title: "文献综述",
                    sections: [
                      {
                        title: "研究理论基础",
                        num: "2.1",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                      {
                        title: "研究现状",
                        num: "2.2",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                      {
                        title: "本研究的创新点",
                        num: "2.3",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                    ],
                  },
                  {
                    chapter_num: "第三章",
                    title: "xxx的研究方法",
                    sections: [
                      {
                        title: "xxx技术说明",
                        num: "3.1",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: ["xxx技术流程图"],
                        insert_latex_formula: [
                          "具体的Latex公式说明（注意json中需要转义），F(T) = \\\\sum_{i=1}^{n} \\\\alpha_i \\\\cdot f_i(T)",
                        ],
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                      {
                        title: "xxx方法说明",
                        num: "3.2",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                      {
                        title: "本研究的方法设计",
                        num: "3.3",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                    ],
                  },
                  {
                    chapter_num: "第四章",
                    title: "xxx结果分析",
                    sections: [
                      {
                        title: "xxx的分析",
                        num: "4.1",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: ["xxx分析表格1"],
                        insert_plot: ["xxx分析图表1"],
                      },
                      {
                        title: "xxx的分析",
                        num: "4.2",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: ["xxx分析表格1", "xxx分析表格2"],
                        insert_plot: ["xxx分析图表1", "xxx分析图表2"],
                      },
                      {
                        title: "结果分析",
                        num: "4.3",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: ["xxx分析表格1", "xxx分析表格2"],
                        insert_plot: ["xxx分析图表1"],
                      },
                    ],
                  },
                  {
                    chapter_num: "第五章",
                    title: "讨论与结论",
                    sections: [
                      {
                        title: "讨论",
                        num: "5.1",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                      {
                        title: "结论",
                        num: "5.2",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                    ],
                  },
                  {
                    chapter_num: "第六章",
                    title: "研究局限与未来展望",
                    sections: [
                      {
                        title: "研究局限",
                        num: "6.1",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                      {
                        title: "未来研究方向提出展望",
                        num: "6.2",
                        planned_content: "xxx",
                        insert_code: { status: false, content: "" },
                        insert_mermaid: { status: false, content: "" },
                        insert_latex_formula: { status: false, content: "" },
                        insert_table: { status: false, content: "" },
                        insert_plot: { status: false, content: "" },
                      },
                    ],
                  },
                ],
              },
            },
          };
          eventBus.emit("successOutline", res.result.outline.outline); // 发布事件
        }, 3000);

        // });
      } else {
        this.$confirm("生成大纲需要登录, 是否跳转到登录页?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消生成",
            });
          });
      }
    },
    addE() { },
    // 定义方法
    handleChange(value) {
      console.log(value);
    },
    checkoutPaper(val) {
      this.index = val;
      console.log("homeData", this.homeData);
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.outlineMain {
  max-width: 1200px;
  padding-bottom: 40px;
  background: #ffffff;
  border-radius: 0px 0px 12px 12px;
}

.outlineTab {
  width: 100%;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  padding: 0 40px;

  .outLeft {
    display: flex;
    align-items: center;
  }

  .outLeftTitle {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    margin-right: 40px;
    font-size: 22px;
    color: #000000;
    line-height: 30px;
    text-align: left;
    font-style: normal;
    position: relative;
  }

  .paperClass {
    @include center-content(22px);
  }

  .activeLT {
    span {
      position: absolute;
      bottom: -10px;
      right: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #3355ff;
    }
  }
}

.paperMain {
  background: linear-gradient(135deg,
      #00bfff 0%,
      #0091ff 29%,
      #6236ff 62%,
      #b620e0 100%) !important;
}

.outRight {
  width: 117px;
  height: 40px;
  background: #3355ff;
  border-radius: 20px;
  line-height: 40px;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  font-style: normal;
  text-align: center;
}

.formItem {
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;

  .formItemLabel {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #000000;
    display: flex;
    line-height: 25px;
    text-align: left;
    font-style: normal;
  }

  .formItemCon {
    margin-top: 25px;
    display: flex;
    width: 100%;
    align-items: center;
  }

  .switchBox {
    margin-left: 26px;
  }

  .userInputCon {
    margin-left: 16px;
    max-width: 670px;
    flex: 1;
  }
}

.outlineBtn {
  width: auto;
  height: 44px;
  background: #3355ff;
  border-radius: 24px;
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #ffffff;
  margin-left: 40px;
}

// 重置论文类型单选样式
.labelBox {
  font-size: 16px;

  >div {
    display: inline-block;

    &.right {
      padding-left: 5px;
    }

    .home-icon {
      width: 18px;
      height: 18px;
      transform: translateY(3px);
    }
  }
}

::v-deep label.el-radio {
  width: auto;
  height: 48px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #cccccc;
  line-height: 46px;
  padding-left: 14px;
  padding-right: 16px;
  margin-bottom: 22px;

  &.is-checked {
    background: #3355ff;
    border-color: #3355ff;
  }

  .el-radio__input.is-checked+.el-radio__label {
    color: #fff !important;
  }

  .el-radio__input {
    display: none;
  }

  .el-radio__label {
    padding-left: 0px;
  }
}

.mobile {
  .formItem {
    margin-top: 10px !important;

    .formItemLabel {
      font-size: 16px;
    }

    .formItemCon {
      margin-top: 10px;

      &::v-deep .el-radio {
        margin-right: 10px;
        margin-bottom: 10px;
        height: 30px;
        line-height: 28px;
      }

      &.phoneFlex {
        padding-right: 20px;
      }
    }
  }
}
</style>
