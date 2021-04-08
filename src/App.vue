<template>
  <v-app>
    <main-dialog v-if="dialog.isActive" />
    <main-header />
    <main-nav />
    <v-content>
      <app-alert @dismissed="onDismissed" />
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import MainHeader from "@/components/App/MainHeader.vue";
import MainNav from "@/components/App/MainNav.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    MainNav
  },
  computed: {
    ...mapGetters(["loading", "dialog", "loggedIn"])
  },
  watch: {
    loggedIn() {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["clearAlert"]),
    onDismissed() {
      this.clearAlert();
    }
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
