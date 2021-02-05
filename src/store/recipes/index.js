/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import * as firebase from 'firebase';

export default {
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
    editRecipe: [],
    recipeToDelete: [],
  },

  mutations: {
    // Use this to change the data
    pushNewRecipe(state, payload) {
      state.recipes.push(payload);
    },

    setDeleteRecipe(state, payload) {
      state.recipeToDelete = payload;
    },

    updateRecipe(state, payload) {
      const index = state.recipes.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.recipes.splice(index, 1, payload);
      } else {
        console.error("UpdateRecipe - Can't find index.");
      }
    },

    updateEditRecipe(state, payload) {
      state.editRecipe = payload;
    },

    deleteRecipe(state, payload) {
      const index = state.recipes.findIndex((item) => item === payload);
      if (index !== -1) {
        state.recipes.splice(index, 1);
      } else {
        console.error("Can't find index to delete.");
      }
    },

    loadedRecipes(state, payload) {
      state.recipes = payload;
    },

    addLikeCount(state, payload) {
      const findIndex = state.recipes.findIndex((el) => el.id === payload.id);
      if (findIndex !== -1) {
        state.recipes[findIndex].likes += 1;
      } else {
        console.error("Couldn't find Recipe to Like");
      }
    },

    dislikeCount(state, payload) {
      const findIndex = state.recipes.findIndex((el) => el.id === payload.id);
      if (findIndex !== -1) {
        state.recipes[findIndex].likes -= 1;
      } else {
        console.error("Couldn't find Recipe to Like");
      }
    },
  },

  actions: {
    // Use this to call the change/mutation^
    updateEditRecipe({ commit }, payload) {
      commit('updateEditRecipe', payload);
    },

    setDeleteRecipe({ commit }, payload) {
      commit('setDeleteRecipe', payload);
    },

    async retrieveRecipes({ commit }) {
      commit('setLoading', true);

      try {
        const DATA = await firebase
          .database()
          .ref('recipes')
          .once('value');
        const recipes = [];
        const obj = DATA.val();

        for (const key in obj) {
          recipes.push({
            id: key,
            likes: obj[key].likes,
            label: obj[key].label,
            date: obj[key].date,
            image: obj[key].image,
            imageUrl: obj[key].imageUrl,
            ingredients: obj[key].ingredients,
            url: obj[key].url,
            numOfPeople: obj[key].numOfPeople,
            vegetarian: obj[key].vegetarian,
            creatorId: obj[key].creatorId,
          });
        }
        commit('setLoading', false);
        commit('loadedRecipes', recipes);
      } catch (err) {
        commit('setLoading', false);
        commit('setAlert', { message: err.message, type: 'error' });
      }
    },

    async pushNewRecipe({ commit }, payload) {
      commit('setLoading', true);
      let imageUrl; let
        key;
      try {
        const recipe = await firebase
          .database()
          .ref('recipes')
          .push(payload);
        key = recipe.key;

        const filename = payload.image.name;
        const ext = filename.slice(filename.lastIndexOf('.'));
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
        payload.image = 0;
        payload.imageUrl = imageUrl;
        await firebase
          .database()
          .ref('recipes')
          .child(key)
          .update(payload);
        commit('setAlert', {
          message: 'You have added a new recipe successfully!',
          type: 'success',
        });
        commit('setLoading', false);
        commit('pushNewRecipe', payload);
      } catch (err) {
        commit('setLoading', false);
        commit('setAlert', { message: err.message, type: 'error' });
      }
    },

    async updateRecipe({ commit }, payload) {
      commit('setLoading', true);
      let imageUrl;
      try {
        if (payload.image) {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
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

          payload.imageUrl = imageUrl;
        }
        // Update props on the DB
        await firebase
          .database()
          .ref('recipes')
          .child(payload.id)
          .update(payload);

        commit('updateRecipe', payload);
        commit('setAlert', {
          message: 'You have updated your recipe successfully!',
          type: 'success',
        });
        commit('setLoading', false);
      } catch (err) {
        commit('setLoading', false);
        commit('setAlert', { message: err.message, type: 'error' });
      }
    },

    async deleteRecipe({ commit }, payload) {
      commit('setLoading', true);
      try {
        // Update props on the DB
        await firebase
          .database()
          .ref('recipes')
          .child(payload.id)
          .remove();
        commit('setAlert', {
          message: 'You have deleted your recipe successfully!',
          type: 'success',
        });
        commit('setLoading', false);
        commit('deleteRecipe', payload);
      } catch (err) {
        commit('setLoading', false);
        commit('setAlert', { message: err.message, type: 'error' });
      }
    },

    async addLikeCount({ commit }, payload) {
      commit('setLoading', true);
      const recipe = { ...payload };
      try {
        recipe.likes += 1;
        recipe.image = 0;

        // Update props on the DB
        await firebase
          .database()
          .ref('recipes')
          .child(payload.id)
          .update(recipe);

        commit('setLoading', false);
        commit('addLikeCount', payload);
      } catch (err) {
        commit('setLoading', false);
        commit('setAlert', { message: err.message, type: 'error' });
      }
    },

    async dislikeCount({ commit }, payload) {
      commit('setLoading', true);
      const recipe = { ...payload };
      try {
        recipe.likes -= 1;
        recipe.image = 0;

        // Update props on the DB
        await firebase
          .database()
          .ref('recipes')
          .child(payload.id)
          .update(recipe);
        commit('setLoading', false);
        commit('dislikeCount', payload);
      } catch (err) {
        commit('setLoading', false);
        commit('setAlert', { message: err.message, type: 'error' });
      }
    },
  },

  getters: {
    // Use this to get stored data and change it
    recipes: (state) => state.recipes,
    editRecipe: (state) => state.editRecipe,
    recipeToDelete: (state) => state.recipeToDelete,
  },
};
