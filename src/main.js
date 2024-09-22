import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import 'element-ui/lib/theme-chalk/display.css';
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import '@/utils/rem'
import "@/assets/js/iconfont"
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const {
    mockXHR
  } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 定义全局的方法
Vue.prototype.$devf = function () {
  // console.log('Global method called!');
  const ele = `
<div style="display: flex;flex-direction: column;align-items: center;">
  <p style="font-weight:600;font-size:large;color:#202020;margin:12px 0;">开发中, 请联系我们的官方客服，获取上线时间。</p>
  // <p style="font-weight:500;font-size:small;color:#ff5353;margin:5px 0;display:none;">开发中, 请联系我们的官方客服，获取上线时间。</p>
</div>
  `;
  ElementUI['MessageBox']({
    title:'',
    message: ele,
    dangerouslyUseHTMLString: true,
    showClose:true,
  })
  // this.$msgbox(options)
  // 执行你需要的操作
};

Vue.config.productionTip = false



Vue.prototype.$minWidth = 500;

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
// eventBus.js


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$setMinWindowWidth(); // 在 Vue 实例创建前设置窗口大小限制
  }
})
