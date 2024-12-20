// plugins/loggerPlugin.js
const isProduction = process.env.NODE_ENV === "production";

const logger = {
  log: (...args) => {
    if (!isProduction) {
      console.log(...args);
    }
  },
  warn: (...args) => {
    if (!isProduction) {
      console.warn(...args);
    }
  },
  error: (...args) => {
    console.error(...args); // 错误信息通常在生产环境也需要输出
  },
};

const LoggerPlugin = {
  install(Vue) {
    Vue.prototype.$log = logger.log;
    Vue.prototype.$warn = logger.warn;
    Vue.prototype.$error = logger.error;

    // 定义全局函数
    window.LLog = logger.log;
    window.LWarn = logger.warn;
    window.LError = logger.error;
  },
};

export default LoggerPlugin;
