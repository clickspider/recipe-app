import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "store"
});

export const store = new Vuex.Store({
  strict: true,
  plugins: [vuexLocalStorage.plugin],
  state: {
    // Use this to store your data
    favRecipes: [],
    token: null,
    userProfile: []
  },

  mutations: {
    // Use this to change the data
    updateProfile(state, args) {
      state.userProfile = args.data.user;
    },

    updateToken(state, args) {
      state.token = args.data.token;
    },

    gotData(state, args) {
      if (args.statusText === "OK") {
        state.favRecipes = args.data;
      } else {
        state.favRecipes = args.status;
      }
    },

    logUserOut(state) {
      (state.userProfile = []), (state.token = null);
    }
  },

  actions: {
    // Use this to call the change/mutation^
    logUserOut({ commit }) {
      commit("logUserOut");
    },

    async retrieveToken({ commit }, credentials) {
      try {
        const api_url = "http://localhost:4000/login";
        const username = credentials.username;
        const password = credentials.password;
        const GET_TOKEN = await axios.post(api_url, {
          username,
          password
        });
        commit("updateToken", GET_TOKEN);
      } catch (err) {
        commit("updateToken", err);
      }
    },

    async retrieveProfile({ commit, state }) {
      try {
        const api_url = "http://localhost:4000/api/v1/users/myprofile";
        const TOKEN = state.token;

        const GET_PROFILE = await axios.get(api_url, {
          headers: { Authorization: `Bearer ${TOKEN}` },
          key: "value"
        });

        commit("updateProfile", GET_PROFILE);
      } catch (err) {
        commit("updateProfile", err);
      }
    },

    async getData({ commit }) {
      try {
        const GET_DATA = await axios.get("http://localhost:3000/");

        commit("gotData", GET_DATA);
      } catch (err) {
        commit("gotData", err);
      }
    }
  },

  getters: {
    // Use this to get stored data and change it
    userProfile: state => {
      return state.userProfile;
    },
    loggedIn: state => {
      return state.token !== null;
    },
    favRecipes: state => {
      return state.favRecipes;
    }
  }
});
