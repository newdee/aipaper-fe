import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/vue-admin-template/user/login",
    method: "post",
    data,
  });
}
export function getHomeInfo(data) {
  return request({
    url: "/api/ai-paper/home/info",
    method: "get",
    data,
  });
}
export function getUserInfo() {
  return request({
    url: "/api/ai-paper/user/info",
    method: "get",
  });
}
// export function getUserInfo(data) {
//   return request({
//     url: '/api/ai-paper/orders/order',
//     method: 'post',
//     data
//   })
// }
export function getOrder(data) {
  return request({
    url: "/api/ai-paper/orders/order",
    method: "post",
    data,
  });
}
export function outlineCreate(data) {
  return request({
    url: "/api/ai-paper/paper/outline/create",
    method: "post",
    data,
  });
}

export function getInfo(params) {
  return request({
    url: "/api/ai-paper/user/info",
    method: "get",
    params,
  });
}
export function outlineStatus(params) {
  return request({
    url: "/api/ai-paper/paper/outline/status/" + params.key,
    method: "get",
  });
}
export function getOrderList(params) {
  return request({
    url: "/api/ai-paper/orders/order/list",
    method: "get",
    params,
  });
}
export function delOrder(params) {
  return request({
    url: "/api/ai-paper/orders/order/" + params.join(","),
    method: "delete",
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}
