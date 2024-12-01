<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span class="question-circle">Q</span>
            字符统计：
            <i class="header-icon el-icon-info"></i>
          </template>
          <div>
            <span class="answer-circle">A</span>
            如果粘贴论文后，系统无统计或不显示字符或者单词数，在论文内容中随意输入一个空格即可。
          </div>
        </el-collapse-item>

        <el-collapse-item name="2">
          <template slot="title">
            <span class="question-circle">Q</span>
            比对库范围：
          </template>
          <div>
            <span class="answer-circle">A</span>
            中国学术期刊数据库、中国学位论文全文数据库、中国学术会议论文数据库、中国学术网页数据库、中国专利文献数据库、中国优秀报纸数据库
          </div>
        </el-collapse-item>

        <el-collapse-item name="3">
          <template slot="title">
            <span class="question-circle">Q</span>
            系统简介：
          </template>
          <div>
            <span class="answer-circle">A</span>
            基于数据海量学术文献资源，对学术成果相似性检测，提供客观详实的报告，为学术出版、科研管理、学位论文管理提供支持。
          </div>
        </el-collapse-item>

        <el-collapse-item name="4">
          <template slot="title">
            <span class="question-circle">Q</span>
            中文检测：
          </template>
          <div>
            <span class="answer-circle">A</span>
            系统仅支持中文论文(包括简体、繁体)的检测，暂不支持英语等非中文论文的检测，请勿提交非中文论文！<br />
            使用WPS软件的同学建议将文档转换成Word2003格式后再复制，以免复制不完整。
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
    };
  },
};
</script>
<style lang="scss" scoped>
.questionList {
  background: #fff;
  padding: 10px;
  margin-top: 20px;
  padding: 20px 20px;
}
.question-circle {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e6f0ff; /* Light blue */
  color: #1a73e8; /* Dark blue */
  text-align: center;
  line-height: 24px;
  font-weight: bold;
  margin-right: 5px;
}
.answer-circle {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff8e1; /* Light yellow */
  color: #ffb300; /* Dark yellow */
  text-align: center;
  margin-right: 5px;
  line-height: 24px;
  font-weight: bold;
}
</style>
