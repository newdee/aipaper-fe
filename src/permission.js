import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, setToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration

const whiteList = [
  "/login",
  "/home",
  "/paperPreview",
  "/main",
  "/reduceRepetition",
  "/preview",
  "/dashboard",
  "/paper",
  "/paper/preview",
  "/paper/reduceRepetition",
  "/userInfo",
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

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  // const hasToken = getToken() ? getToken() : setToken("editor-token");
  const hasToken = getToken();
  console.log("ddddd", hasToken);
  if (hasToken) {
    if (to.path === "/login" && hasToken == "editor-token") {
      // if is logged in, redirect to the home page
      next();
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      console.log("hasGetUserInfo", hasGetUserInfo);

      if (hasGetUserInfo) {
        next();
      } else {
        try {
          // get user info
          store.dispatch("user/getInfo");
          console.log("11");

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
    console.log("to", to, to.path);

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
