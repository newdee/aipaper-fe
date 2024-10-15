import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n
import "element-ui/lib/theme-chalk/display.css";
import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control
import "@/utils/rem";
import "@/assets/js/iconfont";
import * as filters from "./filters"; // global filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale,
});
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

import VueAwesomeSwiper from "vue-awesome-swiper";
// import style
// import 'swiper/swiper.css'
// require('swiper/dist/css/swiper.css')
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import GlobalMethodsPlugin from "@/utils/globalMethods";
Vue.use(GlobalMethodsPlugin);

Vue.config.productionTip = false;

Vue.prototype.$minWidth = 500;

// eventBus.js
import VueScrollTo from "vue-scrollto";

let scrollOptions = {
  container: "body", //滚动的容器
  duration: 500, //滚动时间
  easing: "ease", //缓动类型
  offset: -50, // 滚动时应应用的偏移量。此选项接受回调函数
  force: true, // 是否应执行滚动
  cancelable: true, // 用户是否可以取消滚动
  onStart: false, // 滚动开始时的钩子函数
  onDone: false, // 滚动结束时候的钩子函数
  onCancel: false, // 用户取消滚动的钩子函数
  x: false, // 是否要在x轴上也滚动
  y: true, // 是否要在y轴上滚动
};

Vue.use(VueScrollTo, scrollOptions);

import TextareaAutosize from "vue-textarea-autosize";

Vue.use(TextareaAutosize);
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    this.$setMinWindowWidth(); // 在 Vue 实例创建前设置窗口大小限制
  },
});
