import request from "@/utils/request";
let baseUrl = process.env.VUE_APP_BASE_API;

export function sms(data) {
  return request({
    url: baseUrl + "/api/auth/sms",
    method: "post",
    data,
  });
}
export function login(data) {
  return request({
    url: baseUrl + "/api/auth/login/phone",
    method: "post",
    data,
  });
}
// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }
export function getInfo(token) {
  return request({
    url: "/vue-admin-template/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}
