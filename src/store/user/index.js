/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  state: {
    // Use this to store your data
    user: null
  },

  mutations: {
    // Use this to change the data
    likeRecipe(state, payload) {
      const { id } = payload;
      const { favRecipes } = state.user;
      if (state.user.favRecipes.findIndex(recipe => recipe.id === id) >= 0) {
        return;
      }
      favRecipes.push(payload);
    },
    dislikeRecipe(state, payload) {
      const { favRecipes } = state.user;
      favRecipes.splice(
        favRecipes.findIndex(recipe => recipe.id === payload.id),
        1
      );
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
      commit("setIsLoading", true);

      try {
        const data = await firebase
          .database()
          .ref(`/users/${getters.user.id}/favRecipes/`)
          .once("value");

        const dataParis = data.val();
        const favRecipes = [];
        for (const key in dataParis) {
          favRecipes.push({
            id: dataParis[key].id,
            fbKey: dataParis[key].fbKey
          });
        }
        const updatedUser = {
          id: getters.user.id,
          favRecipes
        };
        commit("setIsLoading", false);
        commit("setUser", updatedUser);
      } catch (err) {
        commit("setIsLoading", false);
        commit("setAlert", { message: err.message, type: "error" });
      }
    },

    async likeRecipe({ commit, getters }, payload) {
      const { user } = getters;
      const recipe = { id: payload.id, fbKey: null };
      const ref = `/users/${user.id}/favRecipes/`;
      try {
        // Like Recipe
        const data = await firebase
          .database()
          .ref(ref)
          .push(recipe);

        recipe.fbKey = data.key;

        // Update Key on DB
        await firebase
          .database()
          .ref(ref)
          .child(data.key)
          .update(recipe);
        commit("likeRecipe", recipe);
      } catch (err) {
        commit("setAlert", { message: err.message, type: "error" });
      }
    },

    async dislikeRecipe({ commit, getters }, payload) {
      const { user } = getters;
      const recipe = user.favRecipes.find(item => item.id === payload.id);
      if (!recipe.fbKey) {
        const err = "Can't like a recipe without a FbKey";
        commit("setAlert", { message: err });
        return;
      }
      const { fbKey } = recipe;
      try {
        await firebase
          .database()
          .ref(`/users/${user.id}/favRecipes/`)
          .child(fbKey)
          .remove();
        commit("dislikeRecipe", recipe);
      } catch (err) {
        commit("setAlert", { message: err.message, type: "error" });
      }
    },

    async logUserOut({ commit }) {
      try {
        await firebase.auth().signOut();
        commit("setAlert", {
          message: "You have logged out successfully!",
          type: "success"
        });
        commit("setUser", null);
      } catch (err) {
        commit("setAlert", { message: err.message, type: "error" });
      }
    },

    async signUserUp({ commit }, payload) {
      commit("setIsLoading", true);

      try {
        const newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        commit("setAlert", {
          message: "You have registered successfully!",
          type: "success"
        });
        commit("setIsLoading", false);
        commit("setUser", { id: newUser.user.uid, favRecipes: [], fbKeys: {} });
      } catch ({ message }) {
        commit("setIsLoading", false);
        commit("setAlert", { message, type: "error" });
      }
    },

    async signUserIn({ commit }, payload) {
      commit("setIsLoading", true);

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        commit("setIsLoading", false);
        commit("setAlert", {
          message: "You have logged in successfully!",
          type: "success"
        });
        commit("setUser", {
          id: user.user.uid,
          favRecipes: [],
          fbKeys: {}
        });
      } catch ({ message }) {
        commit("setIsLoading", false);
        commit("setAlert", { message, type: "error" });
      }
    },

    async googleSignUserIn({ commit }) {
      commit("setIsLoading", true);

      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const user = await firebase.auth().signInWithPopup(provider);
        commit("setIsLoading", false);
        commit("setAlert", {
          message: "You have logged in successfully!",
          type: "success"
        });
        commit("setUser", {
          id: user.user.uid,
          favRecipes: [],
          fbKeys: {}
        });
      } catch ({ message }) {
        commit("setIsLoading", false);
        commit("setAlert", { message, type: "error" });
      }
    }
  },

  getters: {
    // Use this to get stored data and change it
    user: state => state.user,
    loggedIn: state => state.user !== null && state.user !== undefined
  }
};
