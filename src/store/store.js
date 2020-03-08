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
    favRecipes: [
      {
        id: 1,
        label: "Cowboy Rib-Eye Steak",
        date: "06/03/2020 11:10:52",
        image:
          "https://www.edamam.com/web-img/69a/69a67f4147db9f27fd295be0c2ab06f8.jpg",
        ingredients: [
          { value: "1 3-pound bone-in rib-eye steak" },
          { value: "1 tablespoon cumin seed" },
          { value: "1 tablespoon coriander seed" },
          { value: "2 teaspoons black peppercorns" },
          { value: "2 tablespoons coarse salt" },
          { value: "1 tablespoon sweet paprika" },
          { value: "2 tablespoons light brown sugar" },
          { value: "2 tablespoons finely chopped oregano" },
          { value: "5 cloves garlic, minced" }
        ],
        vegetarian: false,
        url: "https://www.marthastewart.com/867361/cowboy-ribeye-steak",
        numOfPeople: "1-2"
      },

      {
        id: 2,
        label: "Individual vegetarian lasagnes",
        date: "06/03/2020 9:10:01",
        image:
          "https://www.edamam.com/web-img/775/7757b08b70371bcb03d3c10199e70e77.jpg",
        ingredients: [
          { value: "1.2 kg cherry tomatoes" },
          { value: "5 sprigs of fresh thyme" },
          { value: "extra virgin olive oil" },
          { value: "2 shallots" },
          { value: "2 cloves of garlic" },
          { value: "500 g baby spinach" },
          { value: "8-12 fresh or dried lasagne sheets" },
          { value: "350 g ricotta cheese" },
          { value: "WHITE SAUCE" },
          { value: "600 ml milk" },
          { value: "25 g unsalted butter" },
          { value: "2 heaped tablespoons flour" },
          { value: "150 g vegetarian sharp, mature cheese" },
          { value: "100 g mozzarella" }
        ],
        vegetarian: true,
        url: "https://www.jamieoliver.com/recipes/vegetables-recipes/",
        numOfPeople: "1-2"
      }
    ],
    token: null,
    userProfile: [],
    dialog: false,
    editRecipe: [] // This is the recipe that will be edited/if no recipe given then it's count as 'create recipe'
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
    },

    pushNewRecipe(state, payload) {
      state.favRecipes.push(payload);
    },

    updateRecipe(state, payload) {
      const index = state.favRecipes.findIndex(
        item => item === state.editRecipe
      );
      if (index !== -1) {
        state.favRecipes.splice(index, 1, payload);
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
      const index = state.favRecipes.findIndex(item => item === payload);
      if (index !== -1) {
        state.favRecipes.splice(index, 1);
      } else {
        console.error("Can't find index to delete.");
      }
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
    },

    pushNewRecipe({ commit }, payload) {
      commit("pushNewRecipe", payload);
    },

    updateRecipe({ commit }, payload) {
      commit("updateRecipe", payload);
    },

    updateEditRecipe({ commit }, payload) {
      commit("updateEditRecipe", payload);
    },

    updateDialog({ commit }, payload) {
      commit("updateDialog", payload);
    },

    deleteRecipe({ commit }, payload) {
      commit("deleteRecipe", payload);
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
    },
    editRecipe: state => {
      return state.editRecipe;
    },
    dialog: state => {
      return state.dialog;
    }
  }
});
