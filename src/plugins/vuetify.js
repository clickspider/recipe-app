import Vue from "vue";
import Vuetify from "vuetify/lib";
import Logo from "@/components/Shared/Logo.vue";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    /**/
  },
  icons: {
    values: {
      logo: {
        component: Logo
      }
    }
  }
});
