// src/plugins/globalMethods.js
import router from "@/router";
import ElementUI from "element-ui";

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

  }
};

export default GlobalMethodsPlugin;