<template>
  <div>
    <!-- 优势页 -->
    <el-dialog :visible.sync="advantageStatus" class="dialogContainer" top="0">
      <!-- <div slot="title" class="dialog-tittle">
        <p>普通AI vs <span class="txt_red">万象写作</span></p>
      </div> -->
      <div class="main-txt">
        <div class="title">
          <p>普通AI<span class="txt_red"> vs </span>万象写作</p>
        </div>
        <div class="txt">
          <p class="with2">
            <span>专业性更强：</span
            >不同的调教方式会导致AI模型呈现不同的效果，哪怕目前公认最强AI chat
            gpt也有短板，而万象写作针对学术论文进行专项优化，使生成论文内容更加专业。
          </p>
          <p class="with2">
            <span>学术性更优：</span
            >普通AI生成伪学术论文，不具备参考价值，万象AI则会对参考文献深度思考，模拟人类做学术的方式，生成生成可用、能用、好用的学术理论并对其进行验证。
          </p>
          <p class="with2">
            <span>易用性更好：</span
            >傻瓜式操作，仅需输入标题、选择专业、论文层次和字数，即可一键生成论文。
          </p>
        </div>
        <div class="title" style="padding-top: 15px">
          同一题目【工业机器人双目视觉系统的特征识别与运动学逆解研究】对比
        </div>
        <table class="distinction">
          <tbody>
            <tr class="hidden">
              <td></td>
              <td></td>
            </tr>
            <tr class="tr-1">
              <td colspan="2">
                <p class="with2">研究深度</p>
              </td>
            </tr>
            <tr class="tr-2">
              <td>普通AI</td>
              <td>万象写作</td>
            </tr>
            <tr class="tr-3">
              <td>
                <p>4.1.2 优势与应用实例</p>
                <p>
                  GRNN网络在求解速度和鲁棒性方面具有显著优势。其没有模型参数需要训练，只调节平滑因子即可，收敛速度快；以径向基网络为基础，具有良好的非线性逼近性能。例如，在工业机器人运动学逆解问题中，采用基于GRNN神经网络的方法可以迅速得到运动学的逆解，对给定的轨迹进行高精度跟踪，而且鲁棒性很好。在实际应用中，使用此算法可以处理不稳定的数据，即使样本数量较少，它也可以收敛于最优解。据相关研究表明，在一些复杂的工业机器人运动控制任务中，GRNN网络的求解速度比传统方法提高数倍甚至数十倍，并且能够在数据缺乏时取得良好的预测效果。例如，在某工业机器人的运动学逆解求解中，采用GRNN
                  网络后，运动精度提高了20%以上，同时求解时间大大缩短。通过实例验证可以看出，GRNN
                  网络在工业机器人运动学逆解求解中具有广阔的应用前景。
                </p>
                <p class="txt_red">研究粗浅，没有具体策略</p>
              </td>
              <td>
                <p>4.2 优化的运动学逆解算法</p>
                <p>
                  算法的核心创新在于引入了自适应的多目标优化框架。该框架不仅考虑末端位置误差，还综合考虑了关节速度约束、运动平滑性和能量消耗等多个目标。优化目标函数可表示为：
                </p>
                <p>
                  beginverbatimdef OptimizedInverseKinematics(target_pose,
                  initial_joints): theta = initial_joints lambda_0, alpha,
                  lambda_min = 0.1, 0.5, 0.01 max_iter, tolerance = 100, 1e-6
                  for k in range(max_iter): current_pose =
                  ForwardKinematics(theta) error = target_pose - current_pose if
                  norm(error) < tolerance: break J = ComputeJacobian(theta)
                  sigma_min = MinSingularValue(J) lambda_k = lambda_0 *
                  exp(-alpha * sigma_min) + lambda_min J_dag = J.T @ inv(J @ J.T
                  + lambda_k * eye(6)) delta_theta = J_dag @ error theta = theta
                  + delta_theta theta = ClampJointLimits(theta) return
                  thetaendverbatim
                </p>
              </td>
            </tr>

            <tr class="tr-1">
              <td colspan="2">
                <p class="with2">内容相关性</p>
              </td>
            </tr>
            <tr class="tr-2">
              <td>普通AI</td>
              <td>万象写作</td>
            </tr>
            <tr class="tr-3">
              <td>
                <img src="@/assets/images/advantage/img1.png" alt="" />
                <p class="txt_red">
                  要求生成一万五千字论文，结果生成字数严重不足，只有八千多字且仅结论概述部分便有一千字，将近整篇文章的八分之一，严重灌水。
                </p>
              </td>
              <td>
                <img src="@/assets/images/advantage/img2.png" alt="" />
                <p class="txt_red">
                  结论简明扼要，论文整体重点放在内容研究即解决策略中，这是优质论文的共性。
                </p>
              </td>
            </tr>

            <tr class="tr-1">
              <td colspan="2">
                <p class="with2">图文、数据展现</p>
              </td>
            </tr>
            <tr class="tr-2">
              <td>普通AI</td>
              <td>万象写作</td>
            </tr>
            <tr class="tr-3">
              <td>
                <img src="@/assets/images/advantage/img3.png" alt="" />
                <p class="txt_red">
                  工科论文，通篇文字表达，典型伪学术论文特征
                </p>
              </td>
              <td>
                <img src="@/assets/images/advantage/img4.png" alt="" />
                <p class="txt_red">图文结合、数据清楚 、逻辑清晰，表现优秀</p>
              </td>
            </tr>

            <tr class="tr-1">
              <td colspan="2">
                <p class="with2">结论合理性</p>
              </td>
            </tr>
            <tr class="tr-2">
              <td>普通AI</td>
              <td>万象写作</td>
            </tr>
            <tr class="tr-3">
              <td>
                <p>
                  在双目视觉系统特征识别方面，深入探讨了双目视觉系统的原理，包括视差计算与深度信息获取，以及与单目视觉相比的优势。通过图像获取与预处理，如灰度化与滤波处理、去畸变处理，提高了图像质量。在特征提取与匹配环节，介绍了常用的特征点提取算法如
                  SIFT、SURF 等，以及特征点匹配算法如
                  RANSAC，提高了目标识别的准确性和可靠性。
                </p>
                <p>
                  在运动学逆解研究方面，分析了基于神经网络的逆解求解，特别是
                  GRNN
                  神经网络的原理、优势与应用实例。同时，研究了基于几何法的逆解分析，包括形位划分与逆解编码，以及通过实例验证了其有效性。
                </p>
                <p>
                  总的来说，本文的研究为提高工业机器人的性能提供了重要的理论支持和实践指导。通过双目视觉系统的特征识别，工业机器人能够更准确地感知环境，实现目标的精确定位。运动学逆解的研究则为机器人的精确运动控制提供了保障。
                </p>
                <p class="txt_red">
                  多次使用提升提高准确性、可靠性、有效性等模糊性较强的词语，导致论文结论空泛虚无、含糊其辞，无参考价值。
                </p>
              </td>
              <td>
                <p>
                  本研究在工业机器人双目视觉系统和运动学逆解技术方面取得了显著成果,主要贡献体现在以下几个方面：
                </p>
                <p>
                  首先,提出了基于自适应双阈值的特征识别算法,通过动态调整阈值策略,显著提高了复杂工业场景中的特征识别准确率。在低对比度和复杂背景环境中,识别准确率提升高达<span
                    class="txt_red"
                    >27.6%</span
                  >,为工业机器人感知能力的提升提供了重要支持。
                </p>
                <p>
                  其次,改进的半全局块匹配算法引入多尺度特征融合和自适应代价聚合策略,有效提升了三维点云重建的精度和连续性。该算法在多种工业场景中均展现出优异性能,为机器人精确感知外部环境奠定了基础。
                </p>
                <p>
                  再者,创新性引入自适应阻尼因子和奇异值分解策略的运动学逆解算法,在奇异构型附近的位置误差减小率高达<span
                    class="txt_red"
                    >67.6%</span
                  >,显著提高了复杂运动状态下的控制精度。
                </p>
                <p>提供明确数据参考，使结论有理有据，具有充分的参考价值。</p>
              </td>
            </tr>

            <!-- <tr class="tr-1">
              <td colspan="2">
                <p class="with2">Aicg、查重率对比</p>
              </td>
            </tr>
            <tr class="tr-2">
              <td>普通AI</td>
              <td>万象写作</td>
            </tr>
            <tr class="tr-3">
              <td></td>
              <td></td>
            </tr> -->
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
@media only screen and (min-width: 800px) {
  .dialogContainer ::v-deep .el-dialog {
    width: 800px;
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
.txt_red {
  color: red !important;
}
.with2 span {
  color: #3355ff;
}
td .with2 {
  text-align: center;
  font-weight: bold;
}
table.distinction {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}
table,
th,
td {
  border: 1px solid #e5e7eb; /* 单一边框样式 */
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
  border-bottom: 0.0625rem solid #e5e7eb;
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
  // color: #1f2225;
}
tr.tr-2 td:last-child {
  // color: $textColor4;
}
tr.tr-3 td:first-child {
  // color: #999;
}
tr.tr-3 td:last-child {
  // color: #666;
}
tr.tr-3 td {
  padding: 1em;
}
td img {
  width: 100%;
  height: auto;
}
</style>
