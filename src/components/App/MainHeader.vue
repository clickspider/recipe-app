<template>
  <v-app-bar app color="#F9F5F3" light>
    <v-app-bar-nav-icon @click.stop="setDrawer(!drawer)" />

    <div class="d-flex align-center">
      <router-link to="/">
        <v-icon
          alt="LOGO"
          class="logo shrink mr-2 d-none d-md-block"
          contain
          transition="scale-transition"
        >
          $logo
        </v-icon>
      </router-link>
    </div>

    <v-spacer />
    <div class="flex-wrap">
      <div v-if="loggedIn">
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          class="btn-primary mr-5 mr-sm-5"
          @click="loader = 'loading'"
        >
          Reload <v-icon>mdi-reload</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-reload</v-icon>
            </span>
          </template>
        </v-btn>

        <v-btn class="btn-primary" @click="onLogOut"> Logout </v-btn>
      </div>

      <div v-else>
        <v-btn class="btn-primary mr-5 mr-sm-5" to="/login"> Login </v-btn>

        <v-btn class="btn-primary" to="/signup"> signup </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loader: null
    };
  },
  watch: {
    loader() {
      this.$router.go();
    }
  },

  computed: {
    ...mapGetters(["loggedIn", "isLoading", "drawer"])
  },

  methods: {
    ...mapActions(["setDrawer", "logUserOut"]),

    onLogOut() {
      this.logUserOut();
    }
  }
};
</script>

<style lang="scss">
.logo {
  .v-icon__component {
    width: 130px;
    height: 130px;
  }
}
</style>
