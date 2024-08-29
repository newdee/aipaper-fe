import Vue from 'vue'
import App from './App.vue'
// import * as echarts from 'echarts';
//vue全局注入echarts
// Vue.prototype.$echarts = echarts;
// Vue.config.productionTip = false
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI);

//全局引入
// import VueCron from 'vue-cron'
// Vue.use(VueCron);//使用方式：<vueCron></vueCron>
new Vue({
  render: h => h(App),
}).$mount('#app')
