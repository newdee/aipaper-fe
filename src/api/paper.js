import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/vue-admin-template/user/login",
    method: "post",
    data,
  });
}
export function product() {
  return request({
    url: "/api/ai-paper/pass/product",
    method: "get",
  });
}
export function passOrder(params) {
  return request({
    url: "/api/ai-paper/pass/order/" + params.fileBackKey,
    method: "get",
  });
}
export function pre_create(data) {
  return request({
    url: "/api/ai-paper/pass/pre_create",
    method: "post",
    data,
  });
}
