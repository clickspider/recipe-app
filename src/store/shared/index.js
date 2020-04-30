export default {
  state: {
    // Use this to store your data
    loading: false,
    drawer: false,
    error: null,
    success: "",
    dialogConfirm: false,
    dialog: false
  },

  mutations: {
    // Use this to change the data
    setDialog(state, payload) {
      state.dialog = payload;
    },

    setDialogConfirm(state, payload) {
      state.dialogConfirm = payload;
    },

    setLoading(state, payload) {
      state.loading = payload;
    },

    setError(state, payload) {
      state.error = payload;
    },

    setSuccess(state, payload) {
      state.success = payload;
    },

    clearError(state) {
      state.error = null;
    },

    clearSuccess(state) {
      state.success = "";
    },

    setDrawer(state, payload) {
      state.drawer = payload;
    }
  },

  actions: {
    // Use this to call the change/mutation^
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    },

    clearSuccess({ commit }) {
      commit("clearSuccess");
    },

    clearError({ commit }) {
      commit("clearError");
    },

    setDrawer({ commit }, payload) {
      commit("setDrawer", payload);
    },

    setDialog({ commit }, payload) {
      commit("setDialog", payload);
    },

    setDialogConfirm({ commit }, payload) {
      commit("setDialogConfirm", payload);
    },

    setSuccess({ commit }, payload) {
      commit("setSuccess", payload);
    },

    setError({ commit }, payload) {
      commit("setError", payload);
    }
  },

  getters: {
    // Use this to get stored data and change it
    loading: state => {
      return state.loading;
    },

    drawer: state => {
      return state.drawer;
    },

    error: state => {
      return state.error;
    },

    success: state => {
      return state.success;
    },

    dialog: state => {
      return state.dialog;
    },

    dialogConfirm: state => {
      return state.dialogConfirm;
    }
  }
};
