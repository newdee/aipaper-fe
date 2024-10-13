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
  lineTitle: "论文标题",
  requestForm: {},
  step3PdfUrl: "",
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
    state.step3PdfUrl = step3PdfUrl;
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
  togglePDFUrl({ commit }, device) {
    commit("TOGGLE_PDF", device);
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
