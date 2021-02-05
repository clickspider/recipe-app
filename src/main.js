import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import * as firebase from 'firebase';
import App from './App.vue';

import firebaseConfig from './firebaseConfig.js';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import { store } from './store/store';
import VueOffline from 'vue-offline';
import MainLoaderCmp from './components/Shared/CardLoader.vue';
import AlertCmp from './components/Shared/Alert.vue';
import DialogCmp from './components/Shared/MainDialog.vue';
import AppListItemCmp from './components/Shared/Lists/AppListItem.vue';

Vue.use(VueOffline);

Vue.config.productionTip = false;
Vue.component('app-alert', AlertCmp);
Vue.component('main-dialog', DialogCmp);
Vue.component('card-loader', MainLoaderCmp);
Vue.component('app-list-item', AppListItemCmp);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
  methods: {
    ...mapActions([
      'retrieveRecipes',
      'autoSignin',
      'clearSuccess',
      'fetchUserData',
    ]),
  },

  computed: {
    ...mapGetters(['success']),
  },
  created() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.autoSignin(user);
        this.fetchUserData();
      }
    });
    this.retrieveRecipes();
  },
}).$mount('#app');
