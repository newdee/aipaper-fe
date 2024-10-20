<template>
  <div class="swiperWrapper">
    <!-- 中间行的轮播图 -->
    <div class="swiperNews">
      <swiper class="swiper" ref="mySwiper2" :options="swiperOptionNew">
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian1.png" alt="" />
            <div class="txt">
              <p class="title">后生产主义乡村:乡村振兴的一个理论视角</p>
              <p class="text">
                在后现代主义的语境下,对乡村生产主义的反思产生了“后生产主义乡村”这一概念。西方后生产主义模式的驱动因素是多样的,在发达国家甚至在一些发展中国家,都出现了一些后生产主义乡村的经验证据。在中国城市化的发展进程中,传统乡村的结构发生了变化,随之而来的就是乡村的功能也发生了变化,主要表现为乡村生产性功能的 消解及其向非生产性功能的转化。中国后生产主义乡村功能可能有三种表现形式,即重新发现“农耕文化”的价值,重构“生活、生态与生产”兼具的乡村功能,以及发掘“乡村性”对于城市工业文明的意义。
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">刘祖云、刘传俊</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian2.png" alt="" />
            <div class="txt">
              <p class="title">边缘损失约束下的多尺度动态图卷积点云分割网络</p>
              <p class="text">
                图卷积网络广泛应用于三维点云分割.然而最具代表性的图卷积网络（DGCNN）只考虑语义标签损失，而没有考虑分割边界损失，从而影响了分割精度.论文提出了一种用于点云分割的增强型动态图卷积网络MSES-DGCNN，联合边缘监督来提高点云分割准确率.联合损失函数在已有语义标签交叉熵损失基础上，采用标签变化提 取边界区域.然后，论文在已有动态图卷积网络中增加一个边界损失模块，从而使反向传播中边界附近的困难点云样本梯度接近这些边界，并使最终分割结果接近真实边缘.同时，论文针对动态图卷积构建多尺度特征融合模块，以增强不规则形状和不均匀分布点云的语义可分性.实验表明，边缘损失模块可以使分割边界更为准确，在包括ShapeNet和S3DIS在内的基准数据集上改进了分割精度.
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">卢超杰、潘翔</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian3.jpg" />
            <div class="txt">
              <p class="title">一种自监督的消息传递图表示学习方法</p>
              <p class="text">
                图表示学习旨在通过监督或无监督方法学习图结构数据中节点的嵌入表示.对于无标签或缺乏可靠标签的图数据集，监督方法无法正常工作，现有的无监督方法也难以学得足够准确的节点嵌入.本文提出一种自监督的消息传递图表示学习方法（SMP-GL），使用多自动编码器生成并筛选基底嵌入，基于消息传递的思想通过自监督更新节
                点信息来学习图节点的嵌入表示，并通过对嵌入层的覆盖更新实现多级消息传递，在不使用标签信息的情况下大幅提高了节点嵌入的准确性.论文选用四个真实世界数据集和八个先进的基线方法进行对比实验，结果表明，本文模型不仅超过了以往先进的无监督方法，而且还匹配甚至在多数任务中超过了以往先进的监督方法，能够有效应用于无标签图数据集的表示学习任务.
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">许珂、汤颖</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian4.jpg" alt="" />
            <div class="txt">
              <p class="title">
                贝叶斯框架下利用GPS数据反演震源参数的一种改进MCMC算法
              </p>
              <p class="text">
                随着机器软硬件设施的飞速发展,
                贝叶斯算法在各个领域得到了广泛应用.在贝叶斯的框架下,
                以采样方式的MCMC方法去求解震源参数问题时,
                马尔科夫链的收敛对于得到合理正确的震源参数至关重要.基于此,
                本文在已有研究的基础上, 改进了MCMC方法的随机步长生成方式,
                使其随机步长整体符合正态分布; 并考
                虑到初值对马尔科夫链的收敛至关重要,
                提出以非线性启发式搜索算法结合贝叶斯框架下的MCMC算法共同反演地震震源参数.论文以MPSO算法提供初值,
                以一组随机生成的值作为对照, 针对美浓地震,
                以GPS位移数据验证了改进MCMC算法在收敛速度上优于原始算法,
                置信区间更为合理; 同时验证了以MPSO为贝叶斯算法提供初值的情况下,
                不仅克服了启发式搜索算法的不稳定性,
                且改进算法收敛速度更快.为了验证改进算法能大大缩减采样所需要的次数,
                拓展本文改进算法在不同类型地震中的应用,
                本文将改进算法以10万次采样反演了博德鲁姆-科斯MW6.6倾滑型地震震源参数.反演结果支持博德鲁姆-科斯地震断层为北向倾斜断层,
                形变场拟合东西方向(EW)均方根误差为1.43 mm,
                南北方向(SN)均方根误差为3.23 mm, 垂直方向均方根误差为9.69 mm,
                优于大部分同类型已有文献.
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">王乐洋、席灿</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian1.png" alt="" />
            <div class="txt">
              <p class="title">
                多层级公共服务供给对大城市租房群体居住分异的影响——基于北京市的实证研究
              </p>
              <p class="text">
                居住空间分异是城市内部公共资源非均衡配置的市场化表现。但长期以来，学界对租房群体租住空间居住分异关注不够。事实上，租住作为大城市外来人口与青年群体的重要居住方式，其在空间上的分异所反映出的空间剥夺、空间排斥以及不同社会经济阶层间的隔阂等问题可能会阻碍大城市公共服务均等化的推进。论文以北京市10个核心
                行政区作为实证案例，将各类公共服务设施按服务范围分为本地层级和区域层级，利用空间滞后模型分别分析了两个层级的公共服务供给对租房群体居住分异的影响。研究发现：①
                研究范围内相当一部分街道/乡镇存在严重的居住分异。②
                租金水平和租房群体居住分异在空间分布特征上显著不同。租金水平呈现由中心向外逐渐递减的圈层状分布，租房群体居住分异指数则呈“内高—中低—外高”的夹心状分布。③
                不同层级公共服务设施对于租房群体居住分异的影响存在较大差异。本地层级公共服务中，幼儿园密度、轨道站点可达性与租房群体居住分异存在负相关性，而中学密度与租房群体居住分异具有正相关性。相比之下，区域层级的体育休闲、公园广场、医疗卫生和示范性高中等4类公共服务设施密度与租房群体居住分异的关系均不显著。基于研究结论，论文针对租房群体提出了优化居住选择和公共服务供需的政策建议，为城市公共服务设施和租赁住房的空间规划合理布局提供了科学依据。
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">申犁帆、龙雨、夏菁、张纯</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian2.png" alt="" />
            <div class="txt">
              <p class="title">生物医学领域突破性论文识别</p>
              <p class="text">
                目的/意义科学的重大进步在很大程度上取决于突破性发现，突破性论文作为突破性发现的重要载体，其识别与发现对科技政策制定与基础研究培育具有重要作用。方法/过程针对目前定量识别方法使用特征维度单一且与科学突破概念性质缺乏紧密联系等问题，结合生物医学领域突破性研究特征，提出一种能够更全面、准确地反映突破性创
                新规律与特点的突破性论文识别方法。从知识创新、扩散、传播路径、融合性、不确定性与争议性等维度构建指标，测度突破性论文的新颖性、影响力、科学破坏性、学科交叉性、争议性特征，应用随机森林模型并将特征指标作为输入变量构建生物医学领域突破性识别模型，最后对模型进行性能评估与参数调优。结果/结论生物医学领域突破性论文识别模型的F1值为0.834
                1，影响力、争议性和科学破坏性特征指标对该模型的识别结果影响较大。在拉斯克奖获得者的精选论文、肿瘤领域的里程碑文献组成的新样本中，该模型保持较稳定的识别效果和较好的泛化性能。
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">杨雪梅、汪雪锋、唐小利、陈虹枢</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian1.png" alt="" />
            <div class="txt">
              <p class="title">后生产主义乡村:乡村振兴的一个理论视角</p>
              <p class="text">
                在后现代主义的语境下,对乡村生产主义的反思产生了“后生产主义乡村”这一概念。西方后生产主义模式的驱动因素是多样的,在发达国家甚至在一些发展中国家,都出现了一些后生产主义乡村的经验证据。在中国城市化的发展进程中,传统乡村的结构发生了变化,随之而来的就是乡村的功能也发生了变化,主要表现为乡村生产性功能的 消解及其向非生产性功能的转化。中国后生产主义乡村功能可能有三种表现形式,即重新发现“农耕文化”的价值,重构“生活、生态与生产”兼具的乡村功能,以及发掘“乡村性”对于城市工业文明的意义。
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">刘祖云、刘传俊</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian2.png" alt="" />
            <div class="txt">
              <p class="title">边缘损失约束下的多尺度动态图卷积点云分割网络</p>
              <p class="text">
                图卷积网络广泛应用于三维点云分割.然而最具代表性的图卷积网络（DGCNN）只考虑语义标签损失，而没有考虑分割边界损失，从而影响了分割精度.论文提出了一种用于点云分割的增强型动态图卷积网络MSES-DGCNN，联合边缘监督来提高点云分割准确率.联合损失函数在已有语义标签交叉熵损失基础上，采用标签变化提 取边界区域.然后，论文在已有动态图卷积网络中增加一个边界损失模块，从而使反向传播中边界附近的困难点云样本梯度接近这些边界，并使最终分割结果接近真实边缘.同时，论文针对动态图卷积构建多尺度特征融合模块，以增强不规则形状和不均匀分布点云的语义可分性.实验表明，边缘损失模块可以使分割边界更为准确，在包括ShapeNet和S3DIS在内的基准数据集上改进了分割精度.
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">卢超杰、潘翔</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian3.jpg" alt="" />
            <div class="txt">
              <p class="title">一种自监督的消息传递图表示学习方法</p>
              <p class="text">
                图表示学习旨在通过监督或无监督方法学习图结构数据中节点的嵌入表示.对于无标签或缺乏可靠标签的图数据集，监督方法无法正常工作，现有的无监督方法也难以学得足够准确的节点嵌入.本文提出一种自监督的消息传递图表示学习方法（SMP-GL），使用多自动编码器生成并筛选基底嵌入，基于消息传递的思想通过自监督更新节
                点信息来学习图节点的嵌入表示，并通过对嵌入层的覆盖更新实现多级消息传递，在不使用标签信息的情况下大幅提高了节点嵌入的准确性.论文选用四个真实世界数据集和八个先进的基线方法进行对比实验，结果表明，本文模型不仅超过了以往先进的无监督方法，而且还匹配甚至在多数任务中超过了以往先进的监督方法，能够有效应用于无标签图数据集的表示学习任务.
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">许珂、汤颖</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian4.jpg" alt="" />
            <div class="txt">
              <p class="title">
                贝叶斯框架下利用GPS数据反演震源参数的一种改进MCMC算法
              </p>
              <p class="text">
                随着机器软硬件设施的飞速发展,
                贝叶斯算法在各个领域得到了广泛应用.在贝叶斯的框架下,
                以采样方式的MCMC方法去求解震源参数问题时,
                马尔科夫链的收敛对于得到合理正确的震源参数至关重要.基于此,
                本文在已有研究的基础上, 改进了MCMC方法的随机步长生成方式,
                使其随机步长整体符合正态分布; 并考
                虑到初值对马尔科夫链的收敛至关重要,
                提出以非线性启发式搜索算法结合贝叶斯框架下的MCMC算法共同反演地震震源参数.论文以MPSO算法提供初值,
                以一组随机生成的值作为对照, 针对美浓地震,
                以GPS位移数据验证了改进MCMC算法在收敛速度上优于原始算法,
                置信区间更为合理; 同时验证了以MPSO为贝叶斯算法提供初值的情况下,
                不仅克服了启发式搜索算法的不稳定性,
                且改进算法收敛速度更快.为了验证改进算法能大大缩减采样所需要的次数,
                拓展本文改进算法在不同类型地震中的应用,
                本文将改进算法以10万次采样反演了博德鲁姆-科斯MW6.6倾滑型地震震源参数.反演结果支持博德鲁姆-科斯地震断层为北向倾斜断层,
                形变场拟合东西方向(EW)均方根误差为1.43 mm,
                南北方向(SN)均方根误差为3.23 mm, 垂直方向均方根误差为9.69 mm,
                优于大部分同类型已有文献.
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">王乐洋、席灿</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian4.jpg" alt="" />
            <div class="txt">
              <p class="title">
                多层级公共服务供给对大城市租房群体居住分异的影响——基于北京市的实证研究
              </p>
              <p class="text">
                居住空间分异是城市内部公共资源非均衡配置的市场化表现。但长期以来，学界对租房群体租住空间居住分异关注不够。事实上，租住作为大城市外来人口与青年群体的重要居住方式，其在空间上的分异所反映出的空间剥夺、空间排斥以及不同社会经济阶层间的隔阂等问题可能会阻碍大城市公共服务均等化的推进。论文以北京市10个核心
                行政区作为实证案例，将各类公共服务设施按服务范围分为本地层级和区域层级，利用空间滞后模型分别分析了两个层级的公共服务供给对租房群体居住分异的影响。研究发现：①
                研究范围内相当一部分街道/乡镇存在严重的居住分异。②
                租金水平和租房群体居住分异在空间分布特征上显著不同。租金水平呈现由中心向外逐渐递减的圈层状分布，租房群体居住分异指数则呈“内高—中低—外高”的夹心状分布。③
                不同层级公共服务设施对于租房群体居住分异的影响存在较大差异。本地层级公共服务中，幼儿园密度、轨道站点可达性与租房群体居住分异存在负相关性，而中学密度与租房群体居住分异具有正相关性。相比之下，区域层级的体育休闲、公园广场、医疗卫生和示范性高中等4类公共服务设施密度与租房群体居住分异的关系均不显著。基于研究结论，论文针对租房群体提出了优化居住选择和公共服务供需的政策建议，为城市公共服务设施和租赁住房的空间规划合理布局提供了科学依据。
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">申犁帆、龙雨、夏菁、张纯</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="newSlider">
            <img class="illustration" src="@/assets/images/wenjian4.jpg" alt="" />
            <div class="txt">
              <p class="title">生物医学领域突破性论文识别</p>
              <p class="text">
                目的/意义科学的重大进步在很大程度上取决于突破性发现，突破性论文作为突破性发现的重要载体，其识别与发现对科技政策制定与基础研究培育具有重要作用。方法/过程针对目前定量识别方法使用特征维度单一且与科学突破概念性质缺乏紧密联系等问题，结合生物医学领域突破性研究特征，提出一种能够更全面、准确地反映突破性创
                新规律与特点的突破性论文识别方法。从知识创新、扩散、传播路径、融合性、不确定性与争议性等维度构建指标，测度突破性论文的新颖性、影响力、科学破坏性、学科交叉性、争议性特征，应用随机森林模型并将特征指标作为输入变量构建生物医学领域突破性识别模型，最后对模型进行性能评估与参数调优。结果/结论生物医学领域突破性论文识别模型的F1值为0.834
                1，影响力、争议性和科学破坏性特征指标对该模型的识别结果影响较大。在拉斯克奖获得者的精选论文、肿瘤领域的里程碑文献组成的新样本中，该模型保持较稳定的识别效果和较好的泛化性能。
              </p>
            </div>
            <div class="authorInfo">
              <p class="author">杨雪梅、汪雪锋、唐小利、陈虹枢</p>
              <p class="info">Aritical | 18 Sept 2024</p>
            </div>
          </div>
        </swiper-slide>

        <!-- <div class="swiper-pagination2" slot="pagination"></div> -->
        <!-- <div class="prev-btn swiper-button-prev" slot="button-prev" @click="onPrevClick"><i class="el-icon-caret-left"></i></div>
        <div class="next-btn swiper-button-next" slot="button-next" @click="onNextClick"><i class="el-icon-caret-right"></i></div> -->
        <!-- <div class="swiper-button-prev" slot="button-prev" @click="onPrevClick"></div>
        <div class="swiper-button-next" slot="button-next" @click="onNextClick"></div> -->
      </swiper>
    </div>
    <div class="external-controls">
      <button class="prev-btn prev-button" @click="onPrevClick">
        <i class="el-icon-caret-left"></i>
      </button>
      <button class="next-btn next-button" @click="onNextClick">
        <i class="el-icon-caret-right"></i>
      </button>
    </div>
  </div>
</template>
<script>
// require styles
import { Pagination } from "element-ui";

// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "swiperThree",
  data() {
    return {
      // 定义变量

      swiperOptionNew: {
        slidesPerView: 4,
        spaceBetween: 30,
        mousewheel: true,
        loop: true, // loop:true时前进后退按钮失效
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        // pagination: ".swiper-pagination2",
        // paginationClickable: true,
        speed: 1500,
        // pagination: {
        //   el: ".swiper-pagination2",
        //   clickable: true,
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },

  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件

    // 页面初始化
    // this.swiper.slideTo(3, 1000, false);

    this.$nextTick(() => {
      this.$refs.mySwiper2.swiper.update();
    });
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
    var width =
      document.documentElement.clientWidth || document.body.clientWidth;
    console.log(width);
    if (width > 770) {
      this.swiperOptionNew.slidesPerView = 4;
    } else {
      this.swiperOptionNew.slidesPerView = 2;
    }
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper2.swiper;
    },
  },
  methods: {
    // 定义方法
    onPrevClick() {
      console.log("321---", this.$refs.mySwiper2.swiper);
      // this.swiperOptionNew.loop = false;
      this.$refs.mySwiper2.swiper.slidePrev();
      this.restartAutoplay();
    },
    onNextClick() {
      console.log("322---", this.$refs.mySwiper2.swiper.slideNext);
      this.$refs.mySwiper2.swiper.slideNext();
      this.restartAutoplay();
    },
    restartAutoplay() {
      if (this.$refs.mySwiper2 && this.$refs.mySwiper2.swiper) {
        this.$refs.mySwiper2.swiper.autoplaying = true; // 重置自动播放要用autoplaying属性
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import './index.scss';
@import "@/styles/mediaMain.scss";

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.sliderImgBox {
  height: 195px;
  background: skyblue;
}

.swiperBox {
  margin-top: 23px;
}

.swiperNews {
  margin-top: 60px;
}

.swiperWrapper {
  position: relative;
}

.external-controls {
  // position: absolute;
  // width: 100%;
  // height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}

.prev-btn i,
.next-btn i {
  font-size: 50px;
}

.prev-btn::after,
.next-btn::after {
  content: none;
}

.external-controls .prev-btn {
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(-100%, -50%);
  border: none;
  background: transparent;
  color: #3355ff;
  z-index: 100;
}

.external-controls .next-btn {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(100%, -50%);
  border: none;
  background: transparent;
  z-index: 100;
  color: #3355ff;
}

.newSlider {
  height: 510px;
  border-radius: 8px;
  background: sandybrown;
}

.newSlider {
  height: 510px;
  background: #ffffff;
  position: relative;
  user-select: none;
  cursor: default;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  .upToDate {
    position: absolute;
    top: 0;
    left: 0;
    width: 76px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    background: #ff4d4d;
    border-radius: 8px 0px 8px 0px;
    opacity: 0.9;
    color: #fff;
  }

  .illustration {
    margin-top: 10px;
    width: 100%;
    max-width: 220px;
    // border: 1px solid #CCCCCC;
    outline: 1px solid #ffffff;
    border-radius: 8px;
  }

  .txt {
    font-size: 14px;
    color: #999;
    padding: 20px 5px;

    .title {
      color: #000000;
      font-size: 18px;
      text-decoration: underline;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      overflow: hidden;
      // height: 60px;
      margin-bottom: 1em;
    }

    .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      word-break: break-all;
      overflow: hidden;
      line-height: 22px;
    }
  }

  .authorInfo {
    position: absolute;
    width: 100%;
    bottom: 10px;
    left: 0;
    padding: 0 5px;

    .author {
      color: #000000;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      word-break: break-all;
      overflow: hidden;
    }

    .info {
      color: #999;
      margin-top: 10px;
    }
  }
}
</style>
