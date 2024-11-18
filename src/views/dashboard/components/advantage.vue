<template>
  <div>
    <!-- 优势页 -->
    <el-dialog :visible.sync="advantageStatus" class="dialogContainer" top="0">
      <div slot="title" class="dialog-tittle">
        <p>mixpaper 3.0 vs 4.0</p>
      </div>
      <div class="main-txt">
        <div class="title">4.0版优势</div>
        <div class="txt">
          <p class="with2">
            <span>专业性更强：</span
            >模型针对性强化了专业性术语的使用，使写作内容更具备专业性
          </p>
          <p class="with2">
            <span>知识面更广：</span
            >全面丰富地学习了多学科领域知识，具备更多学术场景的知识积累
          </p>
          <p class="with2">
            <span>流畅性更佳：</span
            >通过对大量学术文章的学习优化，写作风格更加灵活流畅
          </p>
        </div>
        <div class="title" style="padding-top: 15px">详细对比</div>
        <table class="distinction">
          <tbody>
            <tr class="hidden">
              <td></td>
              <td></td>
            </tr>
            <tr class="tr-1">
              <td colspan="2">
                <p class="with2">
                  <span><i class="el-icon-trophy"></i>专业性更强</span>
                  对比段落:【概述人工智能的定义】
                </p>
              </td>
            </tr>
            <tr class="tr-2">
              <td>3.0版</td>
              <td>4.0版</td>
            </tr>
            <tr class="tr-3">
              <td>
                人工智能是一门研究如何让计算机拥有人类智能的学科，旨在让机器能够自主学习、推理、感知、解决问题和理解自然语言等。通俗来说，人工智能就是让计算机变得更加聪明，能够像人类一样思考和行动。它涉及到计算机科学、数学、心理学、语言学和神经科学等多个学科，已经广泛应用于语音识别、图像处理、自动驾驶、智能家居、医疗诊断等领域。
              </td>
              <td>
                人工智能（AI）是一门集成学科，涉及算法优化、数据工程和认知计算等领域，致力于开发具备模拟人类认知功能的系统。它利用机器学习（ML）、深度学习（DL）、自然语言处理（NLP）和计算机视觉（CV）等先进技术，通过神经网络、决策树和支持向量机等算法，分析大数据，实现模式识别和智能决策。AI的应用范围广泛，包括预测分析、自动化控制系统和增强现实，对科学研究和产业发展产生深远影响。
              </td>
            </tr>

            <tr class="tr-1">
              <td colspan="2">
                <p class="with2">
                  <span><i class="el-icon-data-analysis"></i>知识面更广</span>
                  对比段落:【分析人工智能在社交化电商中起到的作用】
                </p>
              </td>
            </tr>
            <tr class="tr-2">
              <td>3.0版</td>
              <td>4.0版</td>
            </tr>
            <tr class="tr-3">
              <td>
                人工智能在社交化电商中扮演着重要的角色，它就像是这个购物派对的"智囊团"。首先，它帮助个性化推荐，根据你的购物历史、兴趣爱好等数据，AI能够为你精准地推荐你可能感兴趣的商品，让你更容易找到心仪的东西。其次，AI也能够提供智能客服服务。你在购物时可能遇到问题，AI聊天机器人可以快速回答你的疑问，解决问题，无需等待人工客服的繁琐排队。还有，AI还能分析用户生成的内容，例如评论和图片，帮助商家了解用户的反馈和意见，进一步改进产品和服务，提高购物体验。
              </td>
              <td>
                在社交化电商领域，人工智能（AI）的应用体现了计算机科学、数据分析、心理学和市场营销等多学科知识的综合运用。AI通过分析用户在社交平台上的互动数据，运用机器学习和自然语言处理技术，实现个性化推荐和用户行为预测，极大提升了商品的匹配度和购买转化率。此外，AI技术在客户服务中的应用，如聊天机器人，提高了响应效率和用户满意度。同时，利用情感分析，AI可以从大量的用户反馈中提取情感倾向和消费趋势，为市场营销决策提供支持。AI还推动了创新技术如增强现实在在线试穿等场景的应用，增强了用户的购物体验。综上，AI在社交化电商中不仅优化了运营效率，还深化了对消费者行为的理解，推动了个性化营销和市场趋势分析的发展。
              </td>
            </tr>

            <tr class="tr-1">
              <td colspan="2">
                <p class="with2">
                  <span><i class="el-icon-odometer"></i>流畅性更佳</span>
                  对比段落:【讲解社交化电商的内涵】
                </p>
              </td>
            </tr>
            <tr class="tr-2">
              <td>3.0版</td>
              <td>4.0版</td>
            </tr>
            <tr class="tr-3">
              <td>
                社交化电商是近年来兴起的一种新型商业模式，其具体内涵包括基于社交网络平台的商品推荐和营销，以及用户之间的互动和分享等方面。首先，社交化电商通过社交网络平台实现商品推荐和营销。其次，社交化电商注重用户之间的互动和分享。
                然而，社交化电商也面临着一些问题和挑战，社交化电商平台的数据营销和用户隐私保护之间存在平衡问题。
                综上所述，社交化电商作为一种新兴商业模式，在拼多多平台中具有重要的地位和作用。
              </td>
              <td>
                社交化电商，或称社交电子商务，是一种融合社交媒体功能与电子商务的创新商业模式。它通过社交网络的互动性和社群效应来推动商品和服务的发现、推荐及交易。这种模式强调用户间的互动，如分享、评论和讨论商品，从而增强用户体验和信任。此外，社交化电商简化了购物流程，允许用户在社交互动中轻松完成购物，同时依靠内容驱动的销售策略，如故事讲述、产品评测和直播，以提高购物的娱乐性和吸引力。社交化电商不仅是购物方式的变革，更是通过社交网络的连接和互动性，为用户创造了一种全新的购物体验。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
  name: "advantage",
  data() {
    return {
      // 定义变量
      advantageStatus: false,
    };
  },

  // watch()
  components: {
    // webinfo,
  },
  mounted() {
    // 页面初始化
  },

  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
    showDia() {
      this.advantageStatus = true;
    },
  },
};
</script>
<style lang="scss" scoped>
* p {
  margin: 0px;
}
// 引入scss
// @import './index.scss';
@import "@/styles/variables.scss";

// 媒体查询
@media only screen and (max-width: 640px) {
  .dialogContainer ::v-deep .el-dialog {
    width: 370px;
  }
}
@media only screen and (min-width: 640px) {
  .dialogContainer ::v-deep .el-dialog {
    width: 640px;
  }
}
.dialog-tittle {
  font-size: 1.1em;
}
.main-txt {
  margin-top: -20px;
}
.title {
  font-size: 1.2em;
  color: rgb(51, 54, 57);
  font-weight: 800;
  line-height: 2em;
  padding-bottom: 5px;
}
.txt {
  background: #f2f2f2;
  border-radius: 10px;
  padding: 12px 15px;
  line-height: 2em;
}
.with2 span {
  color: $textColor4;
  font-weight: 600;
}
.with2 i {
  // margin-right: 5px;
  // color: #fff;
  // background: $textColor4;
  // padding: 2px 0 0 2px;
  // border-radius: 3px;
  color: $textColor4;
  margin-right: 3px;
}
table.distinction {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}
tr.hidden {
  display: none;
}
tr.hidden td:first-child {
  width: 50%;
}
tr.hidden td:last-child {
  width: 50%;
}
tr.tr-1 {
  line-height: 2em;
}
.tr-2 {
  border-bottom: 0.0625rem solid rgb(229, 231, 235);
  background: #fafafc;
  line-height: 2.5em;
}
tr.tr-3 {
  line-height: 1.5em;
}
tr.tr-2 td {
  padding: 0 1em;
}
tr.tr-1 td {
  color: #333639;
}
tr.tr-2 td:first-child {
  color: #1f2225;
}
tr.tr-2 td:last-child {
  color: $textColor4;
}
tr.tr-3 td:first-child {
  color: #999;
}
tr.tr-3 td:last-child {
  color: #666;
}
tr.tr-3 td {
  padding: 1em;
}
</style>
