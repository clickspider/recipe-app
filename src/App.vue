<template>
  <v-app>
    <v-app-bar app color="#fff" light class="main-header">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
          alt="Frontmen Logo"
          class="shrink mr-2 d-none d-md-block"
          contain
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/ABN-AMRO_Logo_new_colors.svg/1200px-ABN-AMRO_Logo_new_colors.svg.png"
          transition="scale-transition"
          width="140"
        />
      </div>

      <v-spacer></v-spacer>
      <div class="flex-wrap">
        <v-btn
          :loading="loading"
          :disabled="isOffline || loading"
          color="#ffd200"
          class="mr-5 mr-sm-5"
          @click="loader = 'loading'"
          v-if="loggedIn"
        >
          Reload <v-icon>mdi-reload</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-reload</v-icon>
            </span>
          </template>
        </v-btn>

        <v-btn
          :loading="loading"
          :disabled="loading"
          color="error"
          @click="logOut"
          v-if="loggedIn"
        >
          Logout
        </v-btn>

        <v-btn
          :loading="loading"
          :disabled="isOffline || loading"
          color="#ffd200"
          to="/login"
          v-if="!loggedIn"
        >
          Login
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed left temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="text--accent-4"
          v-if="loggedIn"
        >
          <v-list-item
            v-for="item in itemsUserIn"
            :key="item.title"
            link
            :to="item.url"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group v-model="group" active-class="text--accent-4" v-else>
          <v-list-item
            v-for="item in itemsUserOut"
            :key="item.title"
            link
            :to="item.url"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <div v-if="loading">
        <v-skeleton-loader
          class="mx-auto jokes-card"
          max-width="400"
          style="margin: 64px 0px 0px;"
          type="card"
          :elevation="10"
        >
        </v-skeleton-loader>
      </div>
      <router-view v-if="!loading" :loading="loading"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      loader: null,
      loading: true,
      drawer: false,
      isFetching: false,
      group: null,
      timer: "",
      itemsUserIn: [
        { title: "Dashboard", icon: "mdi-view-dashboard", url: "/" },
        { title: "Liked-Jokes", icon: "mdi-heart", url: "/fav" }
      ],
      itemsUserOut: [{ title: "Login", icon: "mdi-login", url: "/" }]
    };
  },

  created() {
    setTimeout(async () => {
      this.loading = false;
    }, 1000);
  },

  computed: {
    ...mapGetters(["favJokes", "loggedIn"])
  },

  methods: {
    ...mapActions(["logUserOut"]),
    logOut() {
      this.logUserOut();
      this.$router.push({ name: "Login" });
    }
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      this.$router.go();
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
    group() {
      this.drawer = false;
    }
  }
};
</script>

<style>
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
</style>
