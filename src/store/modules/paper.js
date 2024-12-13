import Cookies from "js-cookie";

const state = {
  activeIndex: 0, //
  pollingStatus: false, // paper弹窗 是否继续循环
  additionalList: [], // paper弹窗 是否继续循环
  preViewId: "", // 报告查询ID
  bdVid: "",
};

const mutations = {
  TOGGLE_ACTIVE: (state, activeIndex) => {
    state.activeIndex = activeIndex;
  },
  TOGGLE_PREVIEW: (state, preViewId) => {
    state.preViewId = preViewId;
  },
  SAVE_VID: (state, bdVid) => {
    state.bdVid = bdVid;
  },
  TOGGLE_POLLING: (state, pollingStatus) => {
    state.pollingStatus = pollingStatus;
  },
  TOGGLE_ADDITION: (state, additionalList) => {
    state.additionalList = additionalList;
  },
};

const actions = {
  setActiveIndex({ commit }, activeIndex) {
    commit("TOGGLE_ACTIVE", activeIndex);
  },
  setPreviewId({ commit }, preViewId) {
    commit("TOGGLE_PREVIEW", preViewId);
  },
  setBdVid({ commit }, bdVid) {
    commit("SAVE_VID", bdVid);
  },
  setPollingStatus({ commit }, pollingStatus) {
    commit("TOGGLE_POLLING", pollingStatus);
  },
  setAdditionList({ commit }, additionalList) {
    commit("TOGGLE_ADDITION", additionalList);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
