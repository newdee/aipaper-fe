// src/plugins/globalMethods.js
import router from "@/router";
import ElementUI from "element-ui";
import store from "@/store";

import { bd_convert } from "@/api/paper";
const GlobalMethodsPlugin = {
  install(Vue) {
    Vue.prototype.$sayHello = function (name) {
      return `Hello, ${name}!`;
    };
    Vue.prototype.$devf = function (name) {
      // console.log('Global method called!');
      const ele = `
        <div style="display: flex;flex-direction: column;align-items: center;">
          <p style="font-weight:600;font-size:large;color:#202020;margin:12px 0;">开发中, 请联系我们的官方客服，获取上线时间。</p>
          <p style="font-weight:500;font-size:small;color:#ff5353;margin:5px 0;display:none;">开发中, 请联系我们的官方客服，获取上线时间。</p>
        </div>
          `;
      ElementUI["MessageBox"]({
        title: "",
        message: ele,
        dangerouslyUseHTMLString: true,
        showClose: true,
      });
      // this.$msgbox(options)
      // 执行你需要的操作
    };

    // 定义全局跳转方法
    Vue.prototype.$jumpUrl = function (url) {
      const staticRoutes = {
        "/login": "登录页",
        "/404": "",
        "*": "",
        "/dashboard": "",
        "/toPromotion": "",
        "/": "",
        "/main": "main",
        "/main/writepaper": "写论文",
        "/main/reduceRepetition": "降重/降AIGC",
        "/main/chat": "ChatGPT",
        "/main/explore": "AI在线搜索",
        "/main/readpaper": "读论文",
        "/main/amendpaper": "amendpaper",
        "/main/integratedservices": "integratedservices",
        "/main/eliteCourses": "eliteCourses",
        "/main/aitools": "AI工具",
        "/user": "",
        "/user/promotion": "我的推广",
        "/user/userInfo": "我的详情",
        "/paper": "",
        "/paper/preview": "preview",
        "/paper/reduceRepetiton": "reduceRepetiton",
        "/home": "",
        "/home/home": "首页",
      };
      window.zhuge.track("用户访问页面", {
        页面名称: staticRoutes[url],
      });
      router.push(url);
    };

    Vue.prototype.$setMinWindowWidth = function () {
      // let resizing = false;
      // function preventResize(e) {
      //   if (resizing && window.innerWidth < Vue.prototype.$minWidth) {
      //     e.preventDefault();
      //     window.resizeTo(Vue.prototype.$minWidth, window.innerHeight);
      //   }
      // }
      // window.addEventListener('resize', function () {
      //   console.log('ddd', window.innerWidth)
      //   if (window.innerWidth < Vue.prototype.$minWidth) {
      //     // window.resizeTo(Vue.prototype.$minWidth, window.innerHeight);
      //     // window.innerWidth = 500
      //   }
      //   resizing = true;
      //   setTimeout(() => {
      //     resizing = false;
      //   }, 2000); // 假设 resize 事件触发的频率
      // });
      // window.addEventListener('beforeunload', preventResize);
      // 提示用户最小窗口大小要求
    };
    Vue.prototype.$bdSave = function (name) {
      // console.log('Global method called!');
      // let data = {
      //   out_trade_no: store.getters.currentOrder.out_trade_no,
      //   bd_vid: store.getters.bdVid,
      // };
      // console.log("currentOrder", store.getters.currentOrder);
      // console.log("currentObd_vidrder", store.getters.bdVid);
      // console.log("data", data);
      // bd_convert(data).then((res) => {
      //   console.log("--------", res);
      // });
      // this.$msgbox(options)
      // 执行你需要的操作
    };
  },
};

export default GlobalMethodsPlugin;
