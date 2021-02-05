import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import recipes from './recipes';
import shared from './shared';
import user from './user';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'store',
});

export const store = new Vuex.Store({
  strict: true,
  // base: process.ENV
  plugins: [vuexLocalStorage.plugin],
  modules: {
    recipes,
    shared,
    user,
  },
});
