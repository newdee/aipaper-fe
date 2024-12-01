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
export function inviteFetch() {
  return request({
    url: "/api/ai-paper/user/invite/fetch",
    method: "get",
  });
}
export function passOrder(params) {
  return request({
    url: "/api/ai-paper/pass/order/" + params.fileBackKey,
    method: "get",
  });
}
export function report_url(params) {
  return request({
    url: "/api/ai-paper/pass/report_url/" + params.fileBackKey,
    method: "get",
  });
}
export function pay_discount(params) {
  return request({
    url: "/api/ai-paper/pass/pay_discount/" + params.out_trade_no,
    method: "get",
  });
}
export function passReport(params) {
  return request({
    url: "/api/ai-paper/pass/report/" + params.out_trade_no,
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
export function pay_order(data) {
  return request({
    url: "/api/ai-paper/pass/pay_order",
    method: "post",
    data,
  });
}
