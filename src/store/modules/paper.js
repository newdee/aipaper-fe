import Cookies from "js-cookie";

const state = {
  activeIndex: 0, //
  pollingStatus: false, // paper弹窗 是否继续循环
};

const mutations = {
  TOGGLE_ACTIVE: (state, activeIndex) => {
    state.activeIndex = activeIndex;
  },
  TOGGLE_POLLING: (state, pollingStatus) => {
    state.pollingStatus = pollingStatus;
  },
};

const actions = {
  setActiveIndex({ commit }, activeIndex) {
    commit("TOGGLE_ACTIVE", activeIndex);
  },
  setPollingStatus({ commit }, pollingStatus) {
    commit("TOGGLE_POLLING", pollingStatus);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
