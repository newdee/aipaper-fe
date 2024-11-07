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
    agent_image: {}
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
  SET_AGENT: (state, agent_image) => {
    state.agent_image = agent_image;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { phone, sms_code, subDomain } = userInfo;
    return new Promise((resolve, reject) => {
      //
      login({
        phone: phone.trim(),
        sms_code: sms_code,
        sub_domain: subDomain,
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
          let agent_image = response.result.agent_image;
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
          commit("SET_AGENT", agent_image);
          // commit('SET_AVATAR', avatar)
          commit(
            "SET_AVATAR",
            data.photo
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
