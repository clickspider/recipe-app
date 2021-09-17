import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import VueOffline from "vue-offline";
import VueVirtualScroller from "vue-virtual-scroller";

import router from "./router";
import App from "./App.vue";

import firebaseConfig from "./firebaseConfig";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import { store } from "@/store/store";
import AlertCmp from "@/components/Shared/Alert.vue";
import DialogCmp from "@/components/Shared/MainDialog.vue";
import AppListItemCmp from "@/components/Shared/Lists/AppListItem.vue";

Vue.use(VueOffline);
Vue.use(VueVirtualScroller);

Vue.config.productionTip = false;
Vue.component("RecycleScroller", VueVirtualScroller.RecycleScroller);
Vue.component("app-alert", AlertCmp);
Vue.component("main-dialog", DialogCmp);
Vue.component("app-list-item", AppListItemCmp);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  methods: {
    ...mapActions([
      "retrieveRecipes",
      "autoSignin",
      "clearSuccess",
      "fetchUserData"
    ])
  },

  computed: {
    ...mapGetters(["success"])
  },
  created() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.autoSignin(user);
        this.fetchUserData();
      }
    });
    this.retrieveRecipes();
  }
}).$mount("#app");
