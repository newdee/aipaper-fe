<template>
  <div class="adBox">
    <!-- 页面名称 -->
    <div class="newLi" v-for="(item, index) in advantageList" :key="index + 'ad'">
      {{ item.name }}
      {{ item.label }}
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
          name: "每个小节支持上传AI学习资料、链接",
          label: "全网首家",
        },
        {
          name: "每个小节支持上传AI学习资料、链接3",
          label: "全网首家",
        },
        {
          name: "每个小节支持上传AI学习资料、链接5",
          label: "全网首家",
        },
        {
          name: "每个小节支持上传AI学习资料、链接6",
          label: "全网首家",
        },
        {
          name: "每个小节支持上传AI学习资料、链接7",
          label: "全网首家",
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
  border-radius: 8px;
  border: 1px solid #3355ff;
  display: flex;
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
</style>
