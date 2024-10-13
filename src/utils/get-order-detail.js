/**
 * @descripting 轮询功能
 * @param {String} type 请求类型
 * @param {String} url 地址
 * @param {Object} data 请求数据
 * @param {Number} delay 轮询间隔时间
 */
import { getOrder, orderDetailById } from "@/api/user";

export default function polling(data, delay = 2000) {
  return new Promise((resolve, reject) => {
    console.log("d11112222", data);

    orderDetailById(data).then((res) => {
      console.log("res", res.result);
      if (res.result.order_item_response.length <= 1) {
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
