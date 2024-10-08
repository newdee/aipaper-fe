/**
 * @descripting 轮询功能
 * @param {String} type 请求类型
 * @param {String} url 地址
 * @param {Object} data 请求数据
 * @param {Number} delay 轮询间隔时间
 */

import { outlineStatus } from "@/api/user";

export default function polling(data, delay = 2000) {
  return new Promise((resolve, reject) => {
    outlineStatus(data).then((res) => {
      console.log("res", res.result);
      if (res.result.status == "生成中") {
        // 这个继续进行轮询的条件，需要根据自己的需要修改
        setTimeout(() => {
          resolve(polling(data, delay));
        }, delay);
      } else {
        resolve(res);
      }
    });
  });
}
