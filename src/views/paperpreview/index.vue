<template>
  <div class="page">
    <el-backtop :bottom="25" :right="30"></el-backtop>
    <!-- 范文样例 -->
    <section class="sec sec1">
      <p class="title-1">选择范文题目：</p>
      <el-radio-group v-model="sampleTitle">
        <el-radio
          v-for="(titleType, i) in sampleTiles"
          :label="titleType"
          :key="'title' + i"
          >{{ titleMap[titleType] }}</el-radio
        >
      </el-radio-group>
      <p class="title-1">选择范文材料：</p>
      <el-radio-group v-model="sampleMaterial">
        <el-radio
          v-for="(material, j) in sampleMaterials"
          :label="material"
          :key="'material' + j"
        >
          <div v-html="JSON.parse(materialMap[material])"></div>
        </el-radio>
      </el-radio-group>
    </section>
    <!-- <section class="sec sec2">
      <img src="@/assets/images/aigc.png" />
    </section> -->
    <section class="sec sec3">
      <PdfViewer :key="pdfUrl" :pdfUrl="pdfUrl" ref="pdfViewer" />
    </section>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import PdfViewer from "@/views/writepaper/components/PdfViewer.vue";

export default {
  name: "maincon",
  data() {
    return {
      // 定义变量
      pdfUrl: require("@/assets/samples/1.pdf"),
      sampleTitle: 1,
      sampleMaterial: 1,
      sampleTiles: [1, 2, 3],
      titleMap: {
        1: "【材料科学与工程类】碳纤维ABS复合材料的耐热性能研究",
        2: "【计算机类】生成式AI对短视频的生态赋能与价值迭代",
        3: "【医学与公共卫生学类】人工智能在卫生领域伦理治理中的多模态大模型应用研究",
      },
      sampleMaterials: [1, 2, 3, 4],
      materialMap: {
        1: '"正文(含<span style=\\"color:#d75300\\">数据</span>、<span style=\\"color:#d75300\\">图</span>、<span style=\\"color:#d75300\\">表</span>、<span style=\\"color:#d75300\\">代码</span>)"',
        2: '"开题报告"',
        3: '"任务书"',
        4: '"调查问卷"',
        // 5: '"答辩汇报PPT"',
      },
      titleSamplesMap: {
        1: require("@/assets/samples/1.pdf"),
        2: require("@/assets/samples/2.pdf"),
        3: require("@/assets/samples/3.pdf"),
      },
      materialsSamplesMap: {
        1: require("@/assets/samples/1.pdf"),
        2: require("@/assets/samples/4.pdf"),
        3: require("@/assets/samples/5.pdf"),
        4: require("@/assets/samples/6.pdf"),
      },
      list: [
        {
          chapter_num: "第一章",
          chapter: "引言",
          sections: [
            {
              title: "研究背景与意义",
              num: "1.1",
              planned_content: "xxx",
              insert_code: {
                status: true,
                content: "插入java",
              },
              insert_mermaid: ["xxx", "", ""],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
            {
              title: "本研究的主要贡献和创新点",
              num: "1.2",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
          ],
        },
        {
          chapter_num: "第二章",
          chapter: "文献综述",
          sections: [
            {
              title: "研究理论基础",
              num: "2.1",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
            {
              title: "研究现状",
              num: "2.2",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
            {
              title: "本研究的创新点",
              num: "2.3",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
          ],
        },
        {
          chapter_num: "第三章",
          chapter: "xxx的研究方法",
          sections: [
            {
              title: "xxx技术说明",
              num: "3.1",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx技术流程图"],
              insert_latex_formula: [
                "具体的Latex公式说明（注意json中需要转义），F(T) = \\\\sum_{i=1}^{n} \\\\alpha_i \\\\cdot f_i(T)",
              ],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
            {
              title: "xxx方法说明",
              num: "3.2",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["公式1"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
            {
              title: "本研究的方法设计",
              num: "3.3",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["公式1", "公式2"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
          ],
        },
        {
          chapter_num: "第四章",
          chapter: "xxx结果分析",
          sections: [
            {
              title: "xxx的分析",
              num: "4.1",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx分析表格1"],
              insert_plot: ["xxx分析图表1"],
            },
            {
              title: "xxx的分析",
              num: "4.2",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx分析表格1", "xxx分析表格2"],
              insert_plot: ["xxx分析图表1", "xxx分析图表2"],
            },
            {
              title: "结果分析",
              num: "4.3",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx分析表格1", "xxx分析表格2"],
              insert_plot: ["xxx分析图表1"],
            },
          ],
        },
        {
          chapter_num: "第五章",
          chapter: "讨论与结论",
          sections: [
            {
              title: "讨论",
              num: "5.1",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
            {
              title: "结论",
              num: "5.2",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
          ],
        },
        {
          chapter_num: "第六章",
          chapter: "研究局限与未来展望",
          sections: [
            {
              title: "研究局限",
              num: "6.1",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
            {
              title: "未来研究方向提出展望",
              num: "6.2",
              planned_content: "xxx",
              insert_code: ["xxx"],
              insert_mermaid: ["xxx"],
              insert_latex_formula: ["xxx"],
              insert_table: ["xxx"],
              insert_plot: ["xxx"],
            },
          ],
        },
      ],
    };
  },
  components: {
    PdfViewer,
  },
  watch: {
    sampleTitle(newVal, oldVal) {
      // this.pdfUrl = require("@/assets/samples/2.pdf");
      console.log(`272---count changed from ${oldVal} to ${newVal}`);
      // 在这里执行其他操作
      this.pdfUrl = this.titleSamplesMap[newVal];
    },
    sampleMaterial(newVal, oldVal) {
      console.log(`277---count changed from ${oldVal} to ${newVal}`);
      // 在这里执行其他操作
      if (newVal == 1) {
        this.pdfUrl = require("@/assets/samples/1.pdf");
      } else {
        this.pdfUrl = this.materialsSamplesMap[newVal];
      }
    },
  },
  computed: {
    // 计算属性
  },
  mounted() {
    // 页面初始化
  },
  methods: {
    // 定义方法
  },
};
</script>
<style lang="scss" scoped>
* p {
  margin: 0px;
}

// 引入scss
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.sec {
  width: 100%;
  max-width: 1200px;
  background: #fff;
  margin: 15px auto;
  padding: 15px;
  line-height: 2;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 #d1d5db, 0 1px 2px -1px #d1d5db;
  overflow: hidden;
  position: relative;
}

.sec2 {
  background: #f6f3ff;
}

.title-1 {
  font-weight: bold;
}

.sec1 ::v-deep .el-radio {
  line-height: 2em;
  margin-right: 1.2rem;
}

.sec1 ::v-deep .el-radio .el-radio__label {
  display: inline-block;
  text-wrap: wrap;
  vertical-align: top;
}

.sec1 ::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #606266 !important;
}

.sec2 img {
  width: 100%;
  height: auto;
}

.sec3 {
  box-shadow: none;
  overflow: visible;
}

.sec3 .imgbox {
  margin: -15px;
}

.sec3 .imgbox img {
  width: 100%;
  height: auto;
  margin-bottom: 5px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 #d1d5db, 0 1px 2px -1px #d1d5db;
}

.el-radio-group {
  width: 100%;
}

::v-deep .el-radio {
  width: 100%;
}

::v-deep .el-radio__label {
  white-space: nowrap;
  /* 不换行 */
  overflow: hidden;
  /* 隐藏溢出部分 */
  text-overflow: ellipsis;
  /* 显示省略号代替被修剪的文本 */
  width: 90%;
}

// .el-radio__input {
// }
</style>
