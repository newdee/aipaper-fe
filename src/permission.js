import Vue from "vue";
import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, setToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import { getDomain } from "@/utils/index.js";
import { login } from "./api/user";

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration

const whiteList = [
  "/login",
  "/toPromotion",
  "/home",
  "/home/home",
  "/paperPreview",
  "/main",
  "/reduceRepetition",
  "/preview",
  "/dashboard",
  "/paper",
  "/paper/preview",
  "/paper/reduceRepetition",
  "/user/userInfo",
  "/main",
  "/explore",
  "/main/explore",
  "/main/writepaper",
  "/main/readpaper",
  "/main/amendpaper",
  "/main/integratedservices",
  "/main/aitools",
  "/main/reduceRepetition",
]; // no redirect whitelist
// setToken("editor-token");
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  if (to.meta.inDevelopment) {
    // 弹出提示并阻止导航
    Vue.prototype.$devf();
    NProgress.done();
    next(false); // 阻止导航
    return;
  }

  // 如果没有 token 且目标路由在白名单中，直接放行
  let hasToken = getToken();
  if (!hasToken && whiteList.indexOf(to.path) !== -1) {
    next();
    NProgress.done();
    return; // 直接返回，不再继续后续逻辑
  }

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  let loginId = localStorage.getItem("loginID");
  const sub_domain = getDomain();
  if (sub_domain && !store.getters.sub_domain) {
    store.dispatch("user/setSubDomain", sub_domain);
  }

  if (!hasToken && loginId) {
    setToken(loginId);
    store.dispatch("user/setStoreToken", loginId);
    hasToken = loginId;
  }

  if (hasToken) {
    try {
      // 在这里调用一个 API 来验证 token 是否有效
      // await store.dispatch("user/getInfo"); // 假设这个 action 会验证 token
      if (to.path === "/login" && hasToken === "editor-token") {
        next();
      } else {
        const hasGetUserInfo = store.getters.name;
        if (hasGetUserInfo) {
          next();
        } else {
          try {
            await store.dispatch("user/getInfo");
            next();
          } catch (error) {
            Message.error(error || "Has Error");
            next(`/login`);
            NProgress.done();
          }
        }
      }
    } catch (error) {
      // token 无效，重定向到登录页
      Message.error("Token 已过期，请重新登录");
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  } else {
    // 如果没有 token 且不在白名单，需要登录
    next(`/login?redirect=${to.path}`);
    NProgress.done();
  }
});


router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
