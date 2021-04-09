/* eslint-disable no-param-reassign */
export default {
  state: {
    // Use this to store your data
    loading: false,
    drawer: false,
    alert: {
      message: "",
      type: ""
    },
    dialog: {
      isActive: false,
      mode: ""
    }
  },

  mutations: {
    // Use this to change the data
    setDialog(state, payload) {
      state.dialog.isActive = payload.isActive;
      state.dialog.mode = payload.mode;
    },

    setLoading(state, payload) {
      state.loading = payload;
    },

    setAlert(state, payload) {
      state.alert.message = payload.message;
      state.alert.type = payload.type;
    },

    setDrawer(state, payload) {
      state.drawer = payload;
    },

    clearAlert(state) {
      state.alert.message = "";
      state.alert.type = "";
    },

    clearDialog(state) {
      state.dialog.isActive = false;
      state.dialog.mode = "";
    }
  },

  actions: {
    // Use this to call the change/mutation^
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    },

    setDrawer({ commit }, payload) {
      commit("setDrawer", payload);
    },

    setDialog({ commit }, payload) {
      commit("setDialog", payload);
    },

    setError({ commit }, payload) {
      commit("setAlert", payload);
    },

    clearAlert({ commit }) {
      commit("clearAlert");
    },

    clearDialog({ commit }) {
      commit("clearDialog");
    }
  },

  getters: {
    // Use this to get stored data and change it
    loading: state => state.loading,

    drawer: state => state.drawer,

    alert: state => state.alert,

    dialog: state => state.dialog
  }
};
