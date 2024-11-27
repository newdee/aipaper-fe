import { outlineStatus } from "@/api/user";
import store from "@/store";

/**
 * 实现轮询功能
 * @param {Object} data 请求数据
 * @param {Number} delay 轮询间隔时间，默认为2000毫秒
 * @param {Number} maxRetries 最大重试次数，默认为5次
 * @param {Number} currentRetry 当前重试次数，默认为0
 * @param {Number} timeout 超时时间，默认为120000毫秒（两分钟）
 */
export default function polling(
  data,
  delay = 2000,
  maxRetries = 5,
  currentRetry = 0,
  timeout = 120000
) {
  let timeoutId;

  const pollingPromise = new Promise((resolve, reject) => {
    const poll = () => {
      outlineStatus(data)
        .then((res) => {
          console.log("res", res.result);
          if (res.result.status === "生成中") {
            store.dispatch("app/setProStatus", true);

            // 如果状态是生成中，则等待一段时间后再次调用自身
            setTimeout(poll, delay);
          } else if (res.result.status == "生成失败") {
            // 重置大纲按钮状态
            store.dispatch("app/setProStatus", false);
            resolve(res.result.status);
          } else {
            // 重置大纲按钮状态
            store.dispatch("app/setProStatus", false);
            // 如果不是生成中状态，则解析结果
            resolve(res.result.outline.outline);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (currentRetry + 1 < maxRetries) {
            store.dispatch("app/setProStatus", true);

            // 如果当前重试次数小于最大重试次数，则等待一段时间后再次尝试
            setTimeout(() => poll(++currentRetry), delay);
          } else {
            // 如果已经达到最大重试次数，则拒绝Promise
            // 重置大纲按钮状态
            store.dispatch("app/setProStatus", false);
            reject(new Error("Max retries reached"));
          }
        });
    };

    poll();
  });

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      store.dispatch("app/setProStatus", false);
      reject(new Error("已超时两分钟"));
    }, timeout);
  });

  return Promise.race([pollingPromise, timeoutPromise]).finally(() =>
    clearTimeout(timeoutId)
  );
}
