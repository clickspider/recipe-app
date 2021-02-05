<template>
  <v-navigation-drawer v-model="getDrawer" fixed left temporary color="#F9F5F3">
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="text--accent-4">
        <app-list-item :items="loggedInListItems" v-if="loggedIn" />
        <app-list-item :items="loggedOutListItems" v-else />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      group: null,
      loggedInListItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard", url: "/dashboard" }
      ],
      loggedOutListItems: [
        { title: "Home", icon: "mdi-home", url: "/home" },
        { title: "Login", icon: "mdi-login", url: "/login" },
        { title: "Signup", icon: "mdi-account-plus-outline", url: "/signup" }
      ]
    };
  },

  computed: {
    ...mapGetters(["loggedIn", "drawer"]),
    getDrawer: {
      get() {
        return this.drawer;
      },
      set(newVal) {
        if (newVal !== this.drawer) {
          this.setDrawer(newVal);
        }
        return newVal;
      }
    }
  },

  methods: {
    ...mapActions(["setDrawer"])
  },

  watch: {
    group() {
      this.setDrawer(false);
    }
  }
};
</script>
