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
    jokes: [],
    favJokes: [],
    token: null,
    maxItemsInList: 10,
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
        const jokes = [...args.data.value];
        jokes.forEach(joke => (joke.isLiked = false));
        state.jokes = jokes;
      } else {
        state.jokes = args.status;
      }
    },

    gotJoke(state, args) {
      let joke = args.data.value[0];
      let MAX = state.maxItemsInList - 1;
      if (state.favJokes.length === 0) {
        state.favJokes.push(joke);
      } else if (state.favJokes.length <= MAX) {
        const index = state.favJokes.findIndex(item => item === joke);
        if (index === -1) {
          state.favJokes.push(joke);
        }
      }
    },

    likeJoke(state, payload) {
      const index = state.jokes.findIndex(item => item === payload);
      state.jokes[index].isLiked = true;
      state.favJokes.push(payload);
    },

    unLikeJoke(state, payload) {
      // Romve item from favJokes
      const indexFavJoke = state.favJokes.findIndex(item => item === payload);
      if (indexFavJoke !== -1) {
        state.favJokes.splice(indexFavJoke, 1);
      }
      // Update jokes
      const indexJoke = state.jokes.findIndex(item => item === payload);
      if (indexJoke !== -1) {
        state.jokes[indexJoke].isLiked = false;
      }
    },

    removeAllFav(state) {
      state.jokes.forEach(joke => (joke.isLiked = false));
      state.favJokes = [];
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
        const GET_DATA = await axios.get("http://localhost:3000/jokes");

        commit("gotData", GET_DATA);
      } catch (err) {
        commit("gotData", err);
      }
    },

    async getJoke({ commit }) {
      try {
        const GET_DATA = await axios.get("http://localhost:3000/joke");

        commit("gotJoke", GET_DATA);
      } catch (err) {
        commit("gotJoke", err);
      }
    },

    likeJoke({ commit }, payload) {
      commit("likeJoke", payload);
    },

    unLikeJoke({ commit }, payload) {
      commit("unLikeJoke", payload);
    },

    removeAllFav({ commit }, payload) {
      commit("removeAllFav", payload);
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
    jokes: state => {
      return state.jokes;
    },

    favJokes: state => {
      return state.favJokes;
    },
    maxItemsInList: state => {
      return state.maxItemsInList;
    }
  }
});
