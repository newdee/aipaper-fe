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
        console.log("res", res.result);
        if (res.result.status === "生成中") {
          // 如果状态是生成中，则等待一段时间后再次调用自身
          setTimeout(() => {
            resolve(polling(data, delay, maxRetries, currentRetry));
          }, delay);
        } else {
          // 如果不是生成中状态，则解析结果
          resolve(res);
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
          // 如果已经达到最大重试次数，则拒绝Promise
          reject(new Error("Max retries reached"));
        }
      });
  });
}
