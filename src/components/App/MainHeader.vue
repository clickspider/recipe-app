<template>
  <v-app-bar app color="#fff" light>
    <v-app-bar-nav-icon @click.stop="setDrawer(!drawer)"></v-app-bar-nav-icon>

    <div class="d-flex align-center">
      <v-img
        alt="ABN-AMRO LOGO"
        class="shrink mr-2 d-none d-md-block"
        contain
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/ABN-AMRO_Logo_new_colors.svg/1200px-ABN-AMRO_Logo_new_colors.svg.png"
        transition="scale-transition"
        width="140"
      />
    </div>

    <v-spacer></v-spacer>
    <div class="flex-wrap">
      <div v-if="loggedIn">
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="#ffd200"
          class="mr-5 mr-sm-5"
          @click="loader = 'loading'"
        >
          Reload <v-icon>mdi-reload</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-reload</v-icon>
            </span>
          </template>
        </v-btn>

        <v-btn color="error" @click="onLogOut">
          Logout
        </v-btn>
      </div>

      <div v-else>
        <v-btn color="#ffd200" to="/login" class="mr-5 mr-sm-5">
          Login
        </v-btn>

        <v-btn color="#ffd200" to="/signup">
          signup
        </v-btn>
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
    ...mapGetters(["loggedIn", "loading", "drawer"])
  },

  methods: {
    ...mapActions(["setDrawer", "logUserOut"]),

    onLogOut() {
      this.logUserOut();
    }
  }
};
</script>

<style></style>
