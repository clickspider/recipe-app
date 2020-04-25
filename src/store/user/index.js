import * as firebase from "firebase";

export default {
  state: {
    // Use this to store your data
    user: null
  },

  mutations: {
    // Use this to change the data
    likeRecipe(state, payload) {
      const id = payload.id;
      if (state.user.favRecipes.findIndex(recipe => recipe.id === id) >= 0) {
        return;
      }

      state.user.favRecipes.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },

    dislikeRecipe(state, payload) {
      const favRecipes = state.user.favRecipes;
      favRecipes.splice(
        favRecipes.findIndex(recipe => recipe.id === payload.id),
        1
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },

    setUser(state, payload) {
      state.user = payload;
    }
  },

  actions: {
    // Use this to call the change/mutation^
    autoSignin({ commit }, payload) {
      commit("setUser", { id: payload.uid, favRecipes: [], fbKeys: {} });
    },

    async fetchUserData({ commit, getters }) {
      commit("setLoading", true);

      try {
        const data = await firebase
          .database()
          .ref("/users/" + getters.user.id + "/favRecipes/")
          .once("value");

        const dataParis = data.val();
        let favRecipes = [];
        let fbKeys = [];
        for (let key in dataParis) {
          favRecipes.push({ id: dataParis[key].id });
          fbKeys.push((fbKeys[dataParis[key]] = key));
        }
        const updatedUser = {
          id: getters.user.id,
          favRecipes,
          fbKeys
        };
        commit("setLoading", false);
        commit("setUser", updatedUser);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
      }
    },

    async likeRecipe({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      payload.image = 0; //remove later and fix bug
      try {
        const data = await firebase
          .database()
          .ref("/users/" + user.id)
          .child("/favRecipes/")
          .push(payload);
        commit("setLoading", false);
        commit("likeRecipe", { id: payload, fbKey: data.key });
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
      }
    },

    async dislikeRecipe({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      try {
        await firebase
          .database()
          .ref("/users/" + user.id + "/favRecipes/")
          .child(fbKey)
          .remove();
        commit("setLoading", false);
        commit("dislikeRecipe", payload);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
      }
    },

    async logUserOut({ commit }) {
      try {
        await firebase.auth().signOut();
        commit("setSuccess", "You have logged out successfully!");
        commit("setUser", null);
      } catch (err) {
        commit("setError", err);
      }
    },

    async signUserUp({ commit }, payload) {
      commit("setLoading", true);

      try {
        const newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        commit("setSuccess", "You have registered successfully!");
        commit("setLoading", false);
        commit("setUser", { id: newUser.user.uid, favRecipes: [], fbKeys: {} });
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
      }
    },

    async signUserIn({ commit }, payload) {
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        commit("setLoading", false);
        commit("setSuccess", "You have logged in successfully!");
        commit("setUser", {
          id: user.user.uid,
          favRecipes: [],
          fbKeys: {}
        });
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
      }
    }
  },

  getters: {
    // Use this to get stored data and change it
    user: state => {
      return state.user;
    },

    loggedIn: state => {
      return state.user !== null && state.user !== undefined;
    }
  }
};
