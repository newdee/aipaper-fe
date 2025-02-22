import request from "@/utils/request";
let baseUrl = process.env.VUE_APP_BASE_API;

export function login(data) {
  return request({
    url: "/vue-admin-template/user/login",
    method: "post",
    data,
  });
}
// 获取积分接口
export function find_user_balance() {
  return request({
    url: baseUrl + "/api/ai-paper/wallet/find_user_balance",
    method: "get",
  });
}
