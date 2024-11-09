import { outlineStatus } from "@/api/user";

/**
 * 实现轮询功能
 * @param {Object} data 请求数据
 * @param {Number} delay 轮询间隔时间，默认为2000毫秒
 * @param {Number} maxRetries 最大重试次数，默认为5次
 * @param {Number} currentRetry 当前重试次数，默认为0
 */
export default function polling(
  data,
  delay = 2000,
  maxRetries = 5,
  currentRetry = 0
) {
  return new Promise((resolve, reject) => {
    outlineStatus(data)
      .then((res) => {
        let givenTimeString = res.result.aitype_time;
        // 将给定的时间字符串转换为时间戳
        const givenTimestamp = Date.parse(givenTimeString.replace(/-/g, "/")); // 替换日期中的 "-" 为 "/" 以兼容所有浏览器
        const givenTimeEnd =
          Date.parse(givenTimeString.replace(/-/g, "/")) + 180000; // 替换日期中的 "-" 为 "/" 以兼容所有浏览器

        // 获取当前时间的时间戳
        const currentTimestamp = Date.now();
        // 判断循环开始时间，如果任务没开始 继续循环
        if (currentTimestamp < givenTimestamp) {
          resolve(polling(data, delay, maxRetries, currentRetry));
        } else {
          if (res.result.status === "AI帮写中") {
            // 比较两个时间戳，判断是否超时
            if (givenTimeEnd > currentTimestamp) {
              // 如果状态是"AI帮写中，则等待一段时间后再次调用自身
              setTimeout(() => {
                resolve(polling(data, delay, maxRetries, currentRetry));
              }, delay);
            } else {
              reject(new Error("已超时"));
              return false;
            }
          } else if (res.result.status == "生成失败") {
            resolve(res.result.status);
          } else {
            // 如果不是"AI帮写中状态，则解析结果
            resolve(res.result.outline.outline);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (currentRetry + 1 < maxRetries) {
          // 如果当前重试次数小于最大重试次数，则等待一段时间后再次尝试
          setTimeout(() => {
            resolve(polling(data, delay, maxRetries, currentRetry + 1));
          }, delay);
        } else {
          // 重置大纲按钮状态
          reject(new Error("Max retries reached"));
        }
      });
  });
}
