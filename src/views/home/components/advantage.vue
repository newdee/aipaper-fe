<template>
  <div class="adBox">
    <!-- 页面名称 -->
    <div
      class="newLi"
      v-for="(item, index) in advantageList"
      :key="index + 'ad'"
    >
      {{ item.label }}
      <p class="advanP">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "advantage",
  data() {
    return {
      // 定义变量
      advantageList: [
        {
          name: "在线编辑 方便排版 一次定稿 ",
          label: "全网首家免费在线编辑",
        },
        {
          name: "最专业的学术论文生成 蕴含硕士博士做学术的经验",
          label: "全网最专业论文生成平台",
        },
        {
          name: "富含学术创新 一次搞定",
          label: "全网最优质AI生成的论文内容",
        },
        {
          name: "全天候提供专业服务，顾问式支持完成定稿",
          label: "7*24小时在线服务",
        },
        {
          name: "支持学术思考、论文写作、论文编辑、论文搜索",
          label: "一站式服务",
        },
        {
          name: "AIGC率超过25%退费 重复率超过15%退费",
          label: "知网通过无忧",
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
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.adBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: #f5f8ff;
  padding: 30px 0;
}

.newLi {
  width: 172px;
  height: 485px;
  padding: 15px;
  background: rgba(51, 85, 255, 0.1);
  background: url("../../../assets/images/advan1.jpg") no-repeat 0 0 / 100% 100%;
  border-radius: 8px;
  border: 1px solid #3355ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: #3355ff;
  line-height: 24px;
  text-align: left;
  margin-top: 30px;
  font-style: normal;
}
.advanP {
  margin-top: 10px;
}
</style>
