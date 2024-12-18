import request from "@/utils/request";
import { getToken } from "@/utils/auth";
let chatBaseUrl = process.env.VUE_APP_CHAT_BASE_API;
export function chatApi(data) {
  return request({
    url: chatBaseUrl + "/chat?token=" + getToken(),
    method: "post",
    data,
  });
}
export function uploadFile(data) {
  return request({
    url: chatBaseUrl + "/uploadFile?token=" + getToken(),
    method: "post",
    data,
  });
}
export function chatAllInfo() {
  return request({
    url: chatBaseUrl + "/chatAllInfo?token=" + getToken(),
    method: "get",
  });
}
export function closeSession() {
  return request({
    url: chatBaseUrl + "/closeSession?token=" + getToken(),
    method: "get",
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
export function down_url(params) {
  return request({
    url: "/api/ai-paper/paper/outline/down_url/" + params.key1,
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
// 百度推广接口
export function bd_convert(params) {
  return request({
    url: "/api/ai-paper/orders/bd_convert",
    method: "get",
    params: params,
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
// 下载大纲接口
export function pay_download(data) {
  return request({
    url: "/api/ai-paper/paper/outline/pay_download",
    method: "post",
    data,
  });
}
