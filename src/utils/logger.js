// logger.js
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

export default logger;
