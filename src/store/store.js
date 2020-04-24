import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import * as firebase from "firebase";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "store"
});

export const store = new Vuex.Store({
  strict: true,
  // base: process.ENV
  plugins: [vuexLocalStorage.plugin],
  state: {
    // Use this to store your data
    recipes: [
      // {
      //   id: 1,
      //   label: "Cowboy Rib-Eye Steak",
      //   date: "06/03/2020 11:10:52",
      //   image:
      //     "https://www.edamam.com/web-img/69a/69a67f4147db9f27fd295be0c2ab06f8.jpg",
      //   ingredients: [
      //     { value: "1 3-pound bone-in rib-eye steak" },
      //     { value: "1 tablespoon cumin seed" },
      //     { value: "1 tablespoon coriander seed" },
      //     { value: "2 teaspoons black peppercorns" },
      //     { value: "2 tablespoons coarse salt" },
      //     { value: "1 tablespoon sweet paprika" },
      //     { value: "2 tablespoons light brown sugar" },
      //     { value: "2 tablespoons finely chopped oregano" },
      //     { value: "5 cloves garlic, minced" }
      //   ],
      //   vegetarian: false,
      //   url: "https://www.marthastewart.com/867361/cowboy-ribeye-steak",
      //   numOfPeople: "1-2"
      // },
      // {
      //   id: 2,
      //   label: "Individual vegetarian lasagnes",
      //   date: "06/03/2020 9:10:01",
      //   image:
      //     "https://www.edamam.com/web-img/775/7757b08b70371bcb03d3c10199e70e77.jpg",
      //   ingredients: [
      //     { value: "1.2 kg cherry tomatoes" },
      //     { value: "5 sprigs of fresh thyme" },
      //     { value: "extra virgin olive oil" },
      //     { value: "2 shallots" },
      //     { value: "2 cloves of garlic" },
      //     { value: "500 g baby spinach" },
      //     { value: "8-12 fresh or dried lasagne sheets" },
      //     { value: "350 g ricotta cheese" },
      //     { value: "WHITE SAUCE" },
      //     { value: "600 ml milk" },
      //     { value: "25 g unsalted butter" },
      //     { value: "2 heaped tablespoons flour" },
      //     { value: "150 g vegetarian sharp, mature cheese" },
      //     { value: "100 g mozzarella" }
      //   ],
      //   vegetarian: true,
      //   url: "https://www.jamieoliver.com/recipes/vegetables-recipes/",
      //   numOfPeople: "1-2"
      // }
    ],
    user: null,
    loading: false,
    drawer: false,
    error: null,
    success: "",
    userProfile: [],
    dialog: false,
    editRecipe: [] // This is the recipe that will be edited/if no recipe given then it's count as 'create recipe'
  },

  mutations: {
    // Use this to change the data
    updateProfile(state, args) {
      state.userProfile = args.data.user;
    },

    pushNewRecipe(state, payload) {
      state.recipes.push(payload);
    },

    updateRecipe(state, payload) {
      const index = state.recipes.findIndex(item => item.id === payload.id);
      if (index !== -1) {
        state.recipes.splice(index, 1, payload);
      } else {
        console.error("UpdateRecipe - Can't find index.");
      }
    },

    updateEditRecipe(state, payload) {
      state.editRecipe = payload;
    },

    updateDialog(state, payload) {
      state.dialog = payload;
    },

    deleteRecipe(state, payload) {
      const index = state.recipes.findIndex(item => item === payload);
      if (index !== -1) {
        state.recipes.splice(index, 1);
      } else {
        console.error("Can't find index to delete.");
      }
    },

    setUser(state, payload) {
      state.user = payload;
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
    },

    loadedRecipes(state, payload) {
      state.recipes = payload;
    }
  },

  actions: {
    // Use this to call the change/mutation^
    async logUserOut({ commit }) {
      try {
        await firebase.auth().signOut();
        commit("setSuccess", "You have logged out successfully!");
        commit("setUser", null);
      } catch (err) {
        commit("setError", err);
      }
    },
    autoSignin({ commit }, payload) {
      commit("setUser", { id: payload.uid, recipes: [] });
    },
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
    async signUserUp({ commit }, payload) {
      commit("setLoading", true);

      try {
        const newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        commit("setSuccess", "You have registered successfully!");
        commit("setLoading", false);
        commit("setUser", { id: newUser.user.uid, recipes: [] });
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
        commit("setUser", { id: user.user.uid, recipes: [] });
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
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

    async retrieveRecipes({ commit }) {
      commit("setLoading", true);

      try {
        const DATA = await firebase
          .database()
          .ref("recipes")
          .once("value");
        const recipes = [];
        const obj = DATA.val();

        for (let key in obj) {
          recipes.push({
            id: key,
            label: obj[key].label,
            date: obj[key].date,
            image: obj[key].image,
            imageUrl: obj[key].imageUrl,
            ingredients: obj[key].ingredients,
            url: obj[key].url,
            numOfPeople: obj[key].numOfPeople,
            vegetarian: obj[key].vegetarian,
            creatorId: obj[key].creatorId
          });
        }
        commit("setLoading", false);
        commit("loadedRecipes", recipes);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
      }
    },

    async pushNewRecipe({ commit }, payload) {
      commit("setLoading", true);

      let imageUrl, key;
      try {
        const recipe = await firebase
          .database()
          .ref("recipes")
          .push(payload);
        key = recipe.key;

        const filename = payload.image.name;
        const ext = filename.slice(filename.lastIndexOf("."));
        const ref = `recipes/${recipe.key}.${ext}`;
        await firebase
          .storage()
          .ref(ref)
          .put(payload.image);
        imageUrl = await firebase
          .storage()
          .ref(ref)
          .getDownloadURL();
        payload.id = key;
        payload.image = null;
        payload.imageUrl = imageUrl;
        await firebase
          .database()
          .ref("recipes")
          .child(key)
          .update(payload);
        commit("setSuccess", "You have added a new recipe successfully!");
        commit("setLoading", false);
        commit("pushNewRecipe", payload);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
      }
    },

    async updateRecipe({ commit }, payload) {
      commit("setLoading", true);
      let imageUrl;
      try {
        if (payload.image) {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          const ref = `recipes/${payload.id}.${ext}`;
          // Upload image
          await firebase
            .storage()
            .ref(ref)
            .put(payload.image);

          // Get DownloadURL
          imageUrl = await firebase
            .storage()
            .ref(ref)
            .getDownloadURL();

          payload.image = null;
          payload.imageUrl = imageUrl;
        }
        // Update props on the DB
        await firebase
          .database()
          .ref("recipes")
          .child(payload.id)
          .update(payload);

        commit("updateRecipe", payload);
        commit("setSuccess", "You have updated your recipe successfully!");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
      }
    },

    updateEditRecipe({ commit }, payload) {
      commit("updateEditRecipe", payload);
    },

    updateDialog({ commit }, payload) {
      commit("updateDialog", payload);
    },

    async deleteRecipe({ commit }, payload) {
      commit("setLoading", true);
      try {
        // Update props on the DB
        await firebase
          .database()
          .ref("recipes")
          .child(payload.id)
          .remove();
        commit("setSuccess", "You have deleted your recipe successfully!");
        commit("setLoading", false);
        commit("deleteRecipe", payload);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err);
      }
    }
  },

  getters: {
    // Use this to get stored data and change it
    userProfile: state => {
      return state.userProfile;
    },
    loggedIn: state => {
      return state.user !== null && state.user !== undefined;
    },
    user: state => {
      return state.user;
    },
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
    recipes: state => {
      return state.recipes;
    },
    editRecipe: state => {
      return state.editRecipe;
    },
    dialog: state => {
      return state.dialog;
    }
  }
});
