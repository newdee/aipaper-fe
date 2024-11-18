<template>
  <div>
    <div class="problemTitle">
      <p>🔔 本站的评论论文都经过安全、采用国内星云加密技术、确保论文都正版。</p>
      <p>🔔 本站推出的论文查重仪(查重率、AI检测内容)在万象平台立场。</p>
      <p>🔔 服务多的内容均由人工智能编制生成，不代表平台的最新观点。</p>
      <p>
        🔔所有生成的范文模板只可用作格式参考，不允许抄袭、代写、直接挪用等行为。
      </p>
    </div>
    <div class="questionList">
      <p class="questionTitle">常见问答</p>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span class="question-circle">Q</span>
            生成的毕业论文质量怎么样？会不会有胡说八道的情况
            <i class="header-icon el-icon-info"></i>
          </template>
          <div>
            <span class="answer-circle">A</span>
            我们的论文是通过专业的大模型生成，在围绕标题产生的内容具有语句通顺、逻辑连贯、使用学术风格以及专业术语等特点。可以满足初级的专科、本科、硕士的毕业论文的要求。
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span class="question-circle">Q</span> 生成的内容是否为原创？
          </template>
          <div>
            <span class="answer-circle">A</span>
            生成的论文时，我们强调其原创性和引用规范。我们的大模型是基于广泛而多样的训练数据进行训练的，具备了处理各种主题和领域的能力。生成的论文是模型根据输入信息和上下文创造性地构建的，确保为原创。
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <span class="question-circle">Q</span> 付费后怎么接收毕业论文
          </template>
          <div>
            <span class="answer-circle">A</span>
            毕业论文生成成功后会在当前页面为您显示，您可以在当前页面下载文件。
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <span class="question-circle">Q</span> 毕业论文要加载多久可以出来？
          </template>
          <div>
            <span class="answer-circle">A</span>
            付费后预计10-30分钟出结果，如遇到文件长时间没有出来的异常情况，请联系客服，向客服发送您的订单号。
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <span class="question-circle">Q</span> 论文的重复率是多少
          </template>
          <div>
            <span class="answer-circle">A</span>
            生成的论文是模型根据输入信息和上下文创造性地构建的，确保在一定引用规范内使用了相关信息，保证重复率在20%以内。
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <span class="question-circle">Q</span>
            我有自己的目录可以按照我的目录生成吗？
          </template>
          <div>
            <span class="answer-circle">A</span>
            可以的，在生成出大纲后，可以直接在线编辑大纲，直接把大纲内容改成自己的内容。
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
          <template slot="title">
            <span class="question-circle">Q</span> 参考文献是最新的吗？
          </template>
          <div>
            <span class="answer-circle">A</span>
            我们主要参考的是近五年的期刊论文和学位论文，为您提供的参考文献皆为近五年的期刊和学位论文。
          </div>
        </el-collapse-item>
        <el-collapse-item name="8">
          <template slot="title">
            <span class="question-circle">Q</span> 我的隐私会被泄露吗
          </template>
          <div>
            <span class="answer-circle">A</span>
            万象写作论文站点采用的是游客模式，我们并未获取到用户的任何个人信息。
          </div>
        </el-collapse-item>
        <el-collapse-item name="9">
          <template slot="title">
            <span class="question-circle">Q</span> 如何找到自己以前生成的文件？
          </template>
          <div>
            <span class="answer-circle">A</span>
            文件下载流程：打开右上角个人头像，找到我的订单，打开即可下载对应生成的论文全文，为保证您的隐私，系统订单将会保存30天，超过30天则被删除，确保您的文章不会被覆盖和盗窃，完成后请尽快下载！
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "question",
  data() {
    return {
      // 定义变量
      activeNames: ["1"],
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
// @import "@/styles/variables.scss";
// @import "@/styles/mediaMain.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
// @media only screen and (max-width: 768px) {
// }
.problemTitle {
  font-size: 13px;
  text-align: center;
  line-height: 24px;
  background: #fff;
  padding: 10px;
  border-radius: 12px;
}
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
.questionTitle {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
