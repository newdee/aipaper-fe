import { logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import { login } from "@/api/login";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    userInfo: {},
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USER: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { phone, sms_code } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        phone: phone.trim(),
        sms_code: sms_code,
      })
        .then((response) => {
          const result = response.result;
          console.log("ddd", result);

          commit("SET_TOKEN", result.token);
          setToken(result.token);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const data = response.result.user;
          console.log(response);
          // if (!data) {
          //   return reject('Verification failed, please Login again.')
          // }

          // const {
          //   name,
          //   avatar
          // } = data
          commit("SET_NAME", data.name ? data.name : "用户名");
          commit("SET_USER", data);
          // commit('SET_AVATAR', avatar)
          commit(
            "SET_AVATAR",
            "https://gw.alicdn.com/imgextra/i1/O1CN01vmyavS1TH64dFg6YZ_!!6000000002356-0-tps-1024-1024.jpg"
          );

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
