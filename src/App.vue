<template>
  <v-app>
    <succuss-alert />
    <app-alert />
    <main-header />
    <main-nav />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import MainHeader from "@/components/App/MainHeader.vue";
import MainNav from "@/components/App/MainNav.vue";

export default {
  name: "app",
  components: {
    MainHeader,
    MainNav
  },
  watch: {
    loggedIn() {
      this.$router.push("/");
    }
    // error(val) { // only if debugging
    //   console.error("error", val);
    // }
  },
  computed: {
    ...mapGetters(["loading", "loggedIn", "error"])
  }
};
</script>

<style lang="scss">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 425px) {
  .v-btn {
    padding: 0 5px !important;
  }

  .mr-sm-5 {
    margin-right: 2px !important;
  }
}

.btn-primary {
  background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
  border-radius: 10rem;
}

.color-primary {
  background-image: linear-gradient(
    to right bottom,
    #fbdb89,
    #f48982
  ) !important;
}

.theme--light.v-application {

  background-image: linear-gradient(
    to right bottom,
    #fbdb89,
    #f48982
  ) !important;

}
</style>
