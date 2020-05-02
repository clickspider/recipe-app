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

    clearAlert(state) {
      state.alert.message = "";
      state.alert.type = "";
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

    clearAlert({ commit }) {
      commit("clearAlert");
    },

    setDrawer({ commit }, payload) {
      commit("setDrawer", payload);
    },

    setDialog({ commit }, payload) {
      commit("setDialog", payload);
    },

    error({ commit }, payload) {
      commit("setAlert", payload);
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

    alert: state => {
      return state.alert;
    },

    dialog: state => {
      return state.dialog;
    }
  }
};
