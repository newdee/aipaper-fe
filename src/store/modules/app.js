import Cookies from "js-cookie";

const state = {
  sidebar: {
    opened: Cookies.get("sidebarStatus")
      ? !!+Cookies.get("sidebarStatus")
      : true,
    withoutAnimation: false,
    activeIndex: 1,
  },
  device: "desktop",
  homeData: {},
  lineTitle: "论文标题", //
  requestForm: {}, // step1 用户输入内容
  step3PdfUrl: "", // 正文链接
  produceLineStatus: false, // 生成大纲状态, true:生成中 false: 未生成
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set("sidebarStatus", 1);
    } else {
      Cookies.set("sidebarStatus", 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set("sidebarStatus", 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  TOGGLE_PDF: (state, step3PdfUrl) => {
    console.log("ddd", state, step3PdfUrl);
    state.step3PdfUrl = step3PdfUrl;
  },
  TOGGLE_PROSTATE: (state, produceLineStatus) => {
    console.log("ddd", state, produceLineStatus);
    state.produceLineStatus = produceLineStatus;
  },
  TOGGLE_FORM: (state, requestForm) => {
    state.requestForm = requestForm;
  },
  SET_HOME_DATA: (state, homeData) => {
    state.homeData = JSON.parse(JSON.stringify(homeData));
  },
  CHANGE_ACTIVE_SIDEBAR_ITEM: (state, activeIndex) => {
    state.sidebar.activeIndex = activeIndex;
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit("CLOSE_SIDEBAR", withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  togglePDFUrl({ commit }, str) {
    commit("TOGGLE_PDF", str);
  },
  setHomeData({ commit }, data) {
    commit("SET_HOME_DATA", data);
  },
  setRequestForm({ commit }, data) {
    commit("TOGGLE_FORM", data);
  },
  setActiveSidebar({ commit }, index) {
    commit("CHANGE_ACTIVE_SIDEBAR_ITEM", index);
  },
  setProStatus({ commit }, status) {
    commit("TOGGLE_PROSTATE", status);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
