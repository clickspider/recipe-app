import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import axios from "axios";
import VueOffline from "vue-offline";

Vue.use(VueOffline);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
