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
  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  // const hasToken = getToken() ? getToken() : setToken("editor-token");
  let loginId = localStorage.getItem("loginID");

  let hasToken = getToken();
  const sub_domain = getDomain();
  if (sub_domain && !store.getters.sub_domain) {
    store.dispatch("user/setSubDomain", sub_domain);
  }
  console.log("loginId111", loginId);
  console.log("hasToken222", hasToken);
  if (!hasToken) {
    if (loginId) {
      console.log("loginId", loginId);
      console.log("hasToken", hasToken);
      setToken(loginId);
      store.dispatch("user/setStoreToken", loginId);
      hasToken = loginId;
    }
  }
  if (hasToken) {
    if (to.path === "/login" && hasToken == "editor-token") {
      // if is logged in, redirect to the home page
      next();
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;

      if (hasGetUserInfo) {
        next();
      } else {
        try {
          // get user info
          store.dispatch("user/getInfo");

          next();
        } catch (error) {
          // remove token and go to login page to re-login
          Message.error(error || "Has Error");
          next(`/login`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
