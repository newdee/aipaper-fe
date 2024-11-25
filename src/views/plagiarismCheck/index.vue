<template>
  <div class="mainContentSec">
    <!-- 页面名称 -->
    <div class="plaCheckHeader">
      <div class="plaItem">
        <div class="activeIcon">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAWCAYAAACcy/8iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERERERjIxQUIwNzgxMUVBOEQyRUI5QTM4NDQzRjRBQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERERERjIxQkIwNzgxMUVBOEQyRUI5QTM4NDQzRjRBQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRERERGMjE4QjA3ODExRUE4RDJFQjlBMzg0NDNGNEFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRERERGMjE5QjA3ODExRUE4RDJFQjlBMzg0NDNGNEFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TeyztgAAAMJJREFUeNpiZLOuYsAC2IA4AIotgVgKKjbkAQsWsUAg7gJiFYZhCJiQ2MxA3AnE64arZ9E93AbEZQzDHMA8HDISPAvzMKgw6mcYIQDk4VAglhlJHg5gGEEA5GHTkeZhiZHmYfaR5mGGkebhHyPIv/9BHv43gjz8gmm49IKIBMeYcPSYhivYMJIKradAvHokebgQiH+OFA93g2J3pNTDU4G4ciQ0PO5Ae4I5QPwXJjicSujf0ILpLBCvhybhX+iKAAIMALbmGe1e8B6KAAAAAElFTkSuQmCC"
            alt=""
          />
          <span>已选中</span>
        </div>
        <p class="plaTitle">期刊版</p>
        <p class="plaPrice">2.7元/千字</p>
        <div class="plaBottom">
          <p>期刊论文专用</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "myFooter",
  data() {
    return {
      // 定义变量
      headerList: [
        {
          name: "期刊版",
        },
      ],
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // zhuge.track(`用户查看大纲`, {
    //   大纲标题: row.title,
    //   大纲key: row.key1,
    // });
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
.plaItem {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  display: inline-block;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../../assets/images/bg/system-bg.png");
  width: 180px;
  height: 98px;
  text-align: center;
  position: relative;
  margin: 9px;
}
.plaTitle {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  text-align: center;
  color: #0c368a;
  font-size: 16px;
  font-weight: bold;
  margin: 0px 0px 5px 0px;
}
.plaPrice {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  text-align: center;
  font-size: 14px;
  color: #666;
  margin: 0px 0px 14px 0px;
}
.plaBottom {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  text-align: center;
  height: 32%;
  margin: 1px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 30px;
  background: #0c368a;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.activeIcon {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 60px;
  height: 22px;
  font-style: normal;
  color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: absolute;
    height: 100%;
    width: 100%;
    color: #fff;
    left: 0;
    top: 7px;
  }
}
</style>
