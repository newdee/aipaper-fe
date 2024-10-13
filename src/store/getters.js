const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  userInfo: (state) => state.user.userInfo,
  homeData: (state) => state.app.homeData,
  lineTitle: (state) => state.app.lineTitle,
  requestForm: (state) => state.app.requestForm,
  step3PdfUrl: (state) => state.app.step3PdfUrl,
};
export default getters;
